// dbConnect.js
import { PrismaClient } from '@prisma/client';

let prisma:PrismaClient | null = null;

export const dbConnect = async () => {
    console.log('inside dbConnect')
    if (!prisma) {
        try {
            prisma = new PrismaClient();
            await prisma.$connect();
            console.log("Prisma connected to PostgreSQL successfully.");
        } catch (error) {
            console.error("Failed to connect to the database:", error);
            process.exit(1); // Exit process with failure
        }
    }

    return prisma;
};

// Close the Prisma connection on process exit for graceful shutdown
process.on("SIGINT", async () => { // signal interept
    if (prisma) {
        await prisma.$disconnect();
        console.log("Prisma disconnected.");
        process.exit(0);
    }
});