import twilio from 'twilio';

export const sendOtpVerification = async (number: string, code: string): Promise<void> => {
  try {
    // Load and validate environment variables
    const accountSid = process.env.TWILLO_ACCOUNT_SID;
    const authToken = process.env.TWILLO_AUTH_TOKEN;
    const fromNumber = process.env.TWILLO_PHONE_NUMBER; // Twilio phone number

    if (!accountSid || !authToken || !fromNumber) {
      throw new Error(
        "Missing Twilio configuration. Ensure TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILLO_PHONE_NUMBER are set."
      );
    }

    // Initialize Twilio client
    const client = twilio(accountSid, authToken);

    // Ensure the number is in the correct format (international format)
    const formattedNumber = `+91${number.trim()}`;

    // Send a custom OTP code via SMS
    const message = await client.messages.create({
      to: formattedNumber,
      from: fromNumber,
      body: `Your OTP code is: ${code}`,
    });

    console.log(`Custom OTP sent to ${formattedNumber}: Message SID - ${message.sid}`);
  } catch (error: any) {
    console.error("Error in OTP sending:", error.message || error);
  }
};