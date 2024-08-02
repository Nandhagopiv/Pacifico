import React from 'react'
import { useLocation } from 'react-router-dom'

const SuccessPage = () => {
    const amount = useLocation()
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-5 md:mb-7 md:text-3xl">Order Placed Sucessfully</h1>
        <p className="text-gray-600 mb-4 text-base md:text-lg">Thank you for your purchase. Your payment of <b>₹{(amount.state.amount / 100).toFixed(2)}</b> has been processed successfully.</p>
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
