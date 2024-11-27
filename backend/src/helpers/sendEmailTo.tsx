import { resend } from "./resendConfig.js";
import VerificationEmail from "../emails/VerificationEmail.js";
import { EmailResponse } from "@/types/Inputs.js";
import SendEmailTo from "../emails/SendEmailTo.js";

export const  sendEmailTo = async (
    sendTo: string,
    sendFrom: string,
    message: string
): Promise<EmailResponse> => {
    try {
        if (!sendTo || !sendFrom || !message) {
            throw new Error("Missing required parameters: sendTo, sendFrom, or message.");
        }

        const sendersName = sendFrom.split('@')[0] || "Unknown Sender";

        const response = await resend.emails.send({
            from: "faculty-message@juitsolan.xyz",
            to: sendTo,
            replyTo: sendFrom,
            subject: `Message from ${sendersName}`,
            react: SendEmailTo({ message, sendFrom }), // Assumes VerificationEmail returns email HTML
        });

        console.log("Verification email response:", response);

        return { success: true, message: "Verification email sent successfully" };
    } catch (error: any) {
        console.error("Failed to send verification email:", error.message || error);

        return { success: false, message: `Failed to send verification email: ${error.message || "Unknown error"}` };
    }
};