import { RESEND_VERIFICATION } from "@/graphql/mutations/user.mutation";
import { useMutation } from "@apollo/client";
import  { useState } from "react";
import { useNavigate } from "react-router-dom";

export const NotVerifiedAccount = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [resendVerification, { loading }] = useMutation(RESEND_VERIFICATION);

    const handleResend = async () => {
        if (!email) {
            alert("Please enter your email address.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        try {
            await resendVerification({ variables: { email } });
            alert("Verification email has been sent. Please check your inbox.");
        } catch (error: any) {
            if (error.message =="Internal server error: Email is already verified") {
                navigate("/login")
            }
            alert("Verification email has been sent. Please check your inbox!");
            console.error("Error resending verification email:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-center">
            <div className="bg-white shadow-lg rounded-lg p-10 max-w-lg w-full border border-gray-200">
                <h1 className="text-3xl font-bold text-red-600 mb-4">Account Not Verified</h1>
                <p className="text-gray-600 text-base mb-6">
                    Your account is not verified yet. Please check your email for the verification link to activate your account.
                </p>
                <input
                    type="email"
                    className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    className={`bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    onClick={handleResend}
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Resend Verification Email"}
                </button>
                <button
                    className="mt-4 text-sm text-blue-600 hover:underline focus:outline-none"
                    onClick={() => navigate("/resend-verification")}
                >
                    Use a different method to verify
                </button>
            </div>
        </div>
    );
};