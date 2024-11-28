/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loading } from "@/components";
import { VERIFY_USER } from "@/graphql/mutations/user.mutation";
import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const VerificationPage = () => {
  const { token } = useParams();
  console.log('this is token', token)
  const navigate = useNavigate()
  const [verify, { loading }] = useMutation(VERIFY_USER);
  const [data, setData] = useState();

  const handleVerification = async () => {
    try {
      const data:any  = await verify({ variables: { verifyToken: token } });
      setData(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    handleVerification();
  }, []);

  console.log("this is the useState data", data);

  if (loading) return <Loading />;

  return (
<div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-center">
  <div className="bg-white shadow-lg rounded-lg p-10 max-w-lg w-full border border-gray-200">
    <h1 className="text-3xl font-bold text-blue-600 mb-4">Account Verified</h1>
    <p className="text-gray-600 text-base">
      Your account verification was successful. You can now enjoy all the features of our platform. 
    </p>
    <button
      className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
      onClick={() => navigate('/login')}
    >
      Login
    </button>
  </div>
</div>
  );
}

