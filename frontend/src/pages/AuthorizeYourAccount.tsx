

export const AuthorizeYourAccount = () => {


    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-center">
            <div className="bg-white shadow-lg rounded-lg p-10 max-w-lg w-full border border-gray-200">
                <h1 className="text-3xl font-bold text-yellow-600 mb-4">Account Pending Approval</h1>
                <p className="text-gray-600 text-base mb-6">
                    Your account is pending admin approval. Please wait for admin to authorize your account.
                </p>
                <p className="text-gray-600 text-base mb-6">
                    If you haven’t received the verification email, you can request a new one.
                </p>
            </div>
        </div>
    );
};