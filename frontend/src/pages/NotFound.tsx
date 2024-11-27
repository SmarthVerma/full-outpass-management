// NotFound.tsx or NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

interface NotFoundProps {
  userType?: string; // Optional user prop to trigger dynamic change
}

export const NotFound: React.FC<NotFoundProps> = ({ userType }) => {
  return (
    <div className="min-h-screen relka flex items-center justify-center bg-transparent">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg max-w-lg w-full">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="mt-4 text-xl text-gray-600">
          {userType ? `${userType} Not Found` : "Oops! The page you're looking for doesn't exist."}
        </p>
        <p className="mt-4 text-sm text-gray-500">
          {userType
            ? 'We could not find the user you are looking for.'
            : 'The page might have been removed or you might have mistyped the address.'}
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};
