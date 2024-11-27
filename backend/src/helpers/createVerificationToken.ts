import { User } from "@prisma/client";
import crypto from "crypto";

export const createVerificationToken = () => {
    const verificationToken = crypto.randomBytes(20).toString("hex");

    const hashedToken = crypto
        .createHash("sha256")
        .update(verificationToken)
        .digest("hex");
    const verificationCodeExpiry = new Date(Date.now() + 15 * 60 * 1000);
    return {
        verificationToken, // Send this to the user
        hashedToken: hashedToken, // Store this in the database
        verificationCodeExpiry
    };
};