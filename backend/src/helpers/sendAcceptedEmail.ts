import { resend } from "./resendConfig.js";
import VerificationEmail from "../emails/VerificationEmail.js";
import { EmailResponse } from "@/types/Inputs.js";
import SendEmailTo from "../emails/SendEmailTo.js";
import AcceptedOutpassMail from "@/emails/AccptedOutpassMail.js";

export const sendAccpetedEmail = async (
    sendTo: string,
): Promise<EmailResponse> => {
    try {

        // Send the email using the resend service
        const response = await resend.emails.send({
            from: "faculty-message@juitsolan.xyz",
            to: sendTo,
            subject: `OUTPASSED HAS BEEN ACCEPTED`,
            react: AcceptedOutpassMail(), // Use the generated HTML content
        });

        console.log("Verification email response:", response);

        return { success: true, message: "Verification email sent successfully" };
    } catch (error: any) {
        console.error("Failed to send verification email:", error.message || error);

        return { success: false, message: `Failed to send verification email: ${error.message || "Unknown error"}` };
    }
};