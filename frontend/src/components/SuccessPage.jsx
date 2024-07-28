import React from 'react';

const SuccessPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 md:text-3xl">Payment Successful!</h1>
        <p className="text-gray-600 mb-4 text-base md:text-lg">Thank you for your purchase. Your payment has been processed successfully.</p>
        <a
          href="/"
          className="inline-block px-6 py-3 text-lg font-medium text-white bg-green-500 rounded-md hover:bg-green-600 transition"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default SuccessPage;
