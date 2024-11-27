import { GraphQLLocalStrategy } from "graphql-passport";
import { dbConnect } from "../db/dbConnect.js";
import passport from "passport";
import bcrypt from "bcryptjs";
import { PrismaClient, User } from "@prisma/client";
import { FACULTY_NOT_VERIFIED, STUDENT_NOT_VERIFIED } from "../constants.js";
import { sendVerificationEmail } from "../helpers/sendVerificationEmail.js";
import { createVerificationToken } from "@/helpers/createVerificationToken.js";

export const configurePassport = async () => {
    const prisma: PrismaClient = await dbConnect();

    passport.use(
        new GraphQLLocalStrategy(
            async (
                username, // 'username' is of type 'unknown'
                password,
                done
            ) => {
                // Cast 'username' as a string since it's expected to be an email
                const email = username as string;
                try {
                    // Query the user from the database by email
                    const user: User | null = await prisma.user.findUnique({
                        where: { email },
                    })
                    // If user not found, return null
                    if (!user) {
                        return done(null, false, { info: false, message: "User not found" });
                    }
                    if (!(user?.isStudent) && !(user?.validEmail)) {
                        return done(null, false, { info: false, message: FACULTY_NOT_VERIFIED })
                    }


                    if (!user.validEmail) {
                        // Generate a new verification token
                        const { hashedToken, verificationCodeExpiry, verificationToken } = createVerificationToken();
                        // Update the user's verification details in the database
                        await prisma.user.update({
                            where: { id: user.id }, // Update based on user's unique ID
                            data: {
                                verifyCode: hashedToken,
                                verifyCodeExpiry: verificationCodeExpiry,
                            },
                        });
                        // Send the verification email
                        await sendVerificationEmail(user.email, verificationToken, user.id, user.isStudent as boolean);

                        return done(null, false, { info: false, message: STUDENT_NOT_VERIFIED })
                    }

                    // Check if the password is correct
                    const isMatch = await bcrypt.compare(password as string, user.password);
                    if (!isMatch) {
                        return done(null, false, { info: false, message: "Incorrect password or email" });
                    }
                    return done(null, user);
                } catch (error) {
                    return done(error, false);
                }
            }
        )
    );

    // Serialize and deserialize user to maintain sessions
    passport.serializeUser((user: User, done: (error: any, id?: string) => void) => {
        done(null, user.id); // assuming `id` is a string
    });

    passport.deserializeUser(async (id: string, done: (error: any, user?: User | null) => void) => {
        try {
            const user = await prisma.user.findUnique({ where: { id } });
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });
};