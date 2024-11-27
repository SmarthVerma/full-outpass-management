import { sendOtpVerification } from "../helpers/sendOtpVerification.js";
import { dbConnect } from "../db/dbConnect.js";
import { HostelInput, OutpassInput, UpdateOutpassInput, VerifyOtpInput, } from "@/types/Inputs";
import { Context } from "@/types/PassportContext";
import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";

const outpassResolvers = {
  Query: {
    getAllOutpasses: async (parent: any, input: HostelInput, context: Context) => {
      try {
        const { hostelName } = input
        const prisma: PrismaClient = await dbConnect();
        const user = await context.getUser();
        if (user?.isStudent) throw new GraphQLError("Student do not have access to this request");
const allOutpasses = await prisma.outpass.findMany({
  where: {
    hostelName,
    isCompleted: false,  // Only fetch outpasses where isCompleted is false
  },
  include: {
    User: true, // Correct case-sensitive field name
  },
});
        console.log('all outpasses', allOutpasses)
        return allOutpasses;
      } catch (error: any) {
        console.error(error);
        throw new GraphQLError(`Internal error: ${error}`);
      }
    },
    getOutpass: async (
      parent: any,
      { id }: { id: string },
      context: Context
    ) => {
      try {
        const prisma: PrismaClient = await dbConnect();
        if (!context.isAuthenticated()) throw new GraphQLError("Unauthorized access");
        const outpass = await prisma.outpass.findUnique({
          where: { id },
          include: { User: true }
        });
        console.log('this is outpass', outpass)
        return outpass
      } catch (error) {
        console.error(error);
        throw new GraphQLError(`Internal error: ${error}`);
      }
    },
  },
  Mutation: {
    createOutpass: async (
      parent: any,
      { input }: { input: OutpassInput },
      context: Context
    ) => {
      try {
        const prisma: PrismaClient = await dbConnect();
        console.log('this is input', input)
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const {
          block_or_building,
          contactNumber,
          dateFrom,
          dateTo,
          roomNo,
          name,
          reason,
          userId,
          hostelName
        } = input;

        if (!context.isAuthenticated()) throw new GraphQLError("Unauthorized access");

        const newOutpass = await prisma.outpass.create({
          data: {
            name,
            dateFrom,
            dateTo,
            roomNo: Number(roomNo),
            contactNumber,
            reason,
            block_or_building,
            otp,
            hostelName,
            isCompleted: false,
            User: {
              connect: { id: userId }, // Connects the `outpass` to an existing user
            },
          },
        });

        const parents_phoneNo = context.getUser()?.guardianContactNo

        if (!parents_phoneNo) throw new GraphQLError("No Guardian phone number stored in databse")

        await sendOtpVerification(parents_phoneNo, otp)
        return newOutpass;
      } catch (error) {
        console.error(error);
        throw new GraphQLError(`Internal error: ${error}`);
      }
    },
    deleteOutpass: async (
      parent: any,
      { id }: { id: string },
      context: Context
    ) => {
      try {
        const prisma: PrismaClient = await dbConnect();

        if (!context.isAuthenticated()) throw new GraphQLError("Unauthorized access");

        const deletedOutpass = await prisma.outpass.delete({
          where: { id },
        });

        return deletedOutpass;
      } catch (error) {
        console.error(error);
        throw new GraphQLError(`Internal error: ${error}`);
      }
    },
    updateOutpass: async (
      parent: any,
      { id, input }: { id: string; input: UpdateOutpassInput | null },
      context: Context
    ) => {
      try {
        const prisma: PrismaClient = await dbConnect();

        if (!context.isAuthenticated()) throw new GraphQLError("Unauthorized access");

        const updatedOutpass = await prisma.outpass.update({
          where: { id },
          data: {
            ...input, // Spread the input to update the fields
          },
        });

        return updatedOutpass;
      } catch (error) {
        console.error(error);
        throw new GraphQLError(`Internal error: ${error}`);
      }
    },
    verifyOtp: async (parent: any, { input }: { input: VerifyOtpInput }, context: Context) => {
      const { code, id } = input;
      const prisma = await dbConnect();

      // Find the outpass by id
      const outpass = await prisma.outpass.findUnique({
        where: { id }
      });

      // If outpass is not found, throw an error
      if (!outpass) {
        throw new GraphQLError("Outpass not found");
      }

      // If OTP doesn't match, throw an error
      if (outpass.otp !== code) {
        throw new GraphQLError("OTP NOT MATCHED");
      }

      // Update the outpass object with otpVerified = true
      const updatedOutpass = await prisma.outpass.update({
        where: { id },
        data: { otpVerified: true }
      });
      return updatedOutpass

    },

    verifyOutpass: async (
      parent: any,
      { id }: { id: string },
      context: Context
    ) => {
      try {
        const prisma: PrismaClient = await dbConnect();
        // Ensure the user is authenticated
        if (!context.isAuthenticated()) throw new GraphQLError("Unauthorized access");

        // Find the outpass by its ID
        const outpass = await prisma.outpass.findUnique({
          where: { id },
        });

        // If the outpass is not found, throw an error
        if (!outpass) {
          throw new GraphQLError("Outpass not found");
        }

        // Update the outpass with `isCompleted = true`
        const updatedOutpass = await prisma.outpass.update({
          where: { id },
          data: { isCompleted: true },
        });

        return updatedOutpass;
      } catch (error: any) {
        console.error(error);
        throw new GraphQLError(`Internal error: ${error.message}`);
      }
    },
  },
};

export default outpassResolvers;
