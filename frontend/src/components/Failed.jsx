import React from 'react'
import { Link } from 'react-router-dom'

const FailedPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Something Went Wrong!</h1>
        <p className="text-gray-700 mb-6">We couldn't process your request. Please try again later or contact support if the problem persists.</p>
        <div className="flex justify-center gap-4">
          <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Go to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default FailedPage;
