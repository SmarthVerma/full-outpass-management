import bcrypt from "bcryptjs"; // For password hashing
import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";
import { EmailResponse, LoginInput, SendEmailInput, SignUpInput, VerifyTokenInput } from "@/types/Inputs";
import { dbConnect } from "../db/dbConnect.js";
import { Context } from "@/types/PassportContext";
import { APOLLO_USER_NOT_FOUND_EMAIL, FACULTY_NOT_VERIFIED, STUDENT_NOT_VERIFIED, USER_FACULTY, USER_NOT_FOUND, USER_STUDENT } from "../constants.js";
import { createVerificationToken } from "../helpers/createVerificationToken.js";
import { sendVerificationEmail } from "../helpers/sendVerificationEmail.js";
import crypto from "crypto";
import { sendEmailTo } from "../helpers/sendEmailTo.js";


const userResolver = {
  Query: {
    authUser: async (parent: any, __: any, context: Context) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (error) {
        console.error("Error in authUser", error);
        throw new GraphQLError("Internal server error");
      }
    },

    user: async (_: any, { userId }: { userId: string }) => {
      try {
        const prisma: PrismaClient = await dbConnect();

        const user = await prisma.user.findUnique({
          where: { id: userId },
        });
        if (!user) {
          throw new GraphQLError("User not found");
        }
        return user;
      } catch (error: any) {
        console.error(`Error in getting user(via id) ${error}`)
        throw new GraphQLError("Internal server error");
      }
    },
  },

  Mutation: {
    // Signup mutation: Create a new user
    signup: async (
      _: any,
      { input }: { input: SignUpInput },
      context: Context
    ) => {
      try {
        const prisma: PrismaClient = await dbConnect();
        const { email, password, gender, userType } = input;


        // Check if the email already exists
        const existingUser = await prisma.user.findUnique({
          where: { email },
        });
        if (existingUser) {
          throw new GraphQLError("Email already registered");
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const name = email.split('@')[0]
        const id = name
        const isStudent = userType === USER_STUDENT
        const { hashedToken, verificationCodeExpiry, verificationToken } = createVerificationToken()
        // Create and save the new user using Prisma
        const newUser = await prisma.user.create({
          data: {
            id,
            name,
            email,
            password: hashedPassword,
            gender: gender ? gender : "MALE",
            validEmail: false, // Assuming email validation happens elsewhere
            isStudent,
            createdAt: new Date(),
            verifyCode: hashedToken,
            verifyCodeExpiry: verificationCodeExpiry
          },
        });

        await sendVerificationEmail(email, verificationToken, id, isStudent)

        if (!(newUser?.isStudent) && !(newUser?.validEmail)) throw new GraphQLError(FACULTY_NOT_VERIFIED)
        if (!newUser.validEmail) throw new GraphQLError(STUDENT_NOT_VERIFIED)
        await context.login(newUser); // direct login
        return newUser;
      } catch (error) {
        if(error = STUDENT_NOT_VERIFIED) throw new GraphQLError(STUDENT_NOT_VERIFIED)
        throw new GraphQLError(`Internal server error: ${error}`);
      }
    },

    // Login mutation: Authenticate a user and return a token
login: async (
  _: any,
  { input }: { input: LoginInput },
  context: Context
) => {
  try {
    const { email, password, userType } = input;

    // Authenticate user using "graphql-local"
    const { user } = await context.authenticate("graphql-local", {
      email,
      password,
    });

    if (!user) {
      throw new GraphQLError("Incorrect email or password");
    }

    console.log("User in login resolver:", user);

    // Validate user properties
    if (!user.validEmail) {
      throw new GraphQLError(`Verify your account first. Check your email: ${user.email}`);
    }

    if (userType === USER_FACULTY && user.isStudent) {
      throw new GraphQLError("You are not authorized as a Faculty member");
    }

    if (!user.isStudent && !user.validEmail) {
      throw new GraphQLError("Faculty not verified");
    }

    // Log the user in
    await context.login(user);

    return user;
  } catch (error: any) {
    console.error("Error in login resolver:", error);

    if (error.message === APOLLO_USER_NOT_FOUND_EMAIL) {
      throw new GraphQLError(USER_NOT_FOUND);
    }

    throw new GraphQLError(error.message || "Internal server error");
  }
},

    logout: async (_: any, __: any, context: Context) => {
      try {
        await context.logout();
        context.res?.clearCookie("connect.sid");
        return { message: "Logged out successfully" };
      } catch (error: any) {
        console.error("Error in logout", error);
        throw new Error(error.message || "Internal server error");
      }
    },


    verifyUser: async (_: any, { verifyToken }: VerifyTokenInput, context: Context) => {
      try {
        console.log('in here verifyUser',)
        const prisma = await dbConnect()

        const hashedToken = crypto
          .createHash("sha256")
          .update(verifyToken) // got token from /:token
          .digest("hex");

        console.log('this is hashedToken', hashedToken)
        const user = await prisma.user.findFirst({
          where: {
            AND: [{ validEmail: false }, { verifyCode: hashedToken }],
          },
        });
        console.log('this is user', user)
        if (!user) throw new GraphQLError("Wrong Token")
        console.log(Number(user.verifyCodeExpiry), Date.now())
        if (Number(user.verifyCodeExpiry) && Number(user.verifyCodeExpiry) < Date.now()) {
          throw new GraphQLError("Verification token expired");
        }

        const updatedUser = await prisma.user.update({
          where: { id: user.id }, // Assuming `id` is the unique identifier for the user
          data: { validEmail: true, verifyCode: null, verifyCodeExpiry: null },
        });

        return updatedUser;
      } catch (error: any) {
        console.error("Error in logout", error);
        throw new Error(error.message || "Internal server error");
      }


    },
    resendVerificationCode: async (_: any, { email }: { email: string }): Promise<EmailResponse> => { /// Yeah aise bhi hota ha, FUCK!!
      try {
        const prisma: PrismaClient = await dbConnect();

        // Check if the user exists
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new GraphQLError("User not found");
        }

        if (user.validEmail) {
          throw new GraphQLError("Email is already verified");
        }

        // Generate a new verification token
        const { hashedToken, verificationCodeExpiry, verificationToken } = createVerificationToken();

        // Update the user's verification code and expiry
        await prisma.user.update({
          where: { email },
          data: {
            verifyCode: hashedToken,
            verifyCodeExpiry: verificationCodeExpiry,
          },
        });

        // Send the verification email
        await sendVerificationEmail(email, verificationToken, user.id, user.isStudent as boolean);

        return { success: true, message: "Verification code resent successfully" };
      } catch (error: any) {
        console.error("Error in resendVerificationCode", error);
        throw new GraphQLError(`Internal server error: ${error.message}`);
      }
    },

    sendEmailTo: async(_:any, {input}:{ input :SendEmailInput}, context: Context) => {
    try {
        const {sendTo, sendFrom, message} = input
        console.log({sendTo, sendFrom, message})
        const prisma = await dbConnect()
          const user = await prisma.user.findUnique({
            where: { email: sendTo },
          });
          if (!user) {
            throw new GraphQLError("User not found you sending message to");
          }
        const response = await sendEmailTo(sendTo, sendFrom, message)
        console.log('response ',response)
        return response
    } catch (error: any) {
          console.error("Error in sendEmailTo", error);
        throw new GraphQLError(`Internal server error: ${error.message}`);
    }

    },
  },
};

export default userResolver;
