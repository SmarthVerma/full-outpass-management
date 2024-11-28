import { RESEND_VERIFICATION } from "@/graphql/mutations/user.mutation";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const NotVerifiedAccount = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [inputVisible, setInputVisible] = useState(false); // State to manage visibility
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
            if (error.message === "Internal server error: Email is already verified") {
                navigate("/login");
            }
            alert("Verification email has been sent. Please check your inbox!");
            console.error("Error resending verification email:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-gray-100 text-center">
            <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full border border-gray-200">
                <h1 className="text-4xl font-extrabold text-red-500 mb-4">
                    Account Not Verified
                </h1>
                <p className="text-gray-600 text-lg mb-8">
                    Your account is not verified yet. Please check your email for the verification link to activate your account.
                </p>
                {inputVisible ? (
                    <>
                        <input
                            type="email"
                            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            onClick={handleResend}
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Resend Verification Email"}
                        </button>
                    </>
                ) : (
                    <button
                        className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        onClick={() => setInputVisible(true)}
                        disabled={loading}
                    >
                        Resend email verification
                    </button>
                )}
                {inputVisible && (
                    <p className="mt-4 text-sm text-gray-500">
                        Haven't received the email? Double-check your email or try re-entering it.
                    </p>
                )}
                <button
                    className="mt-4 w-full text-sm text-blue-500 hover:text-blue-700 font-medium hover:underline focus:outline-none transition duration-200"
                    onClick={() => navigate("/resend-verification")}
                >
                    Use a different method to verify
                </button>
            </div>
        </div>
    );
};