import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center max-w-md w-full">
        <div className="flex justify-center">
          <div className="bg-green-100 p-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-16 h-16 text-green-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-semibold mt-4 text-gray-800">
          Payment Completed
        </h2>
        <p className="text-gray-600 mt-2">
          Thank you for purchasing via Khalti Payment Gateway! Your payment has
          been confirmed successfully.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Return To Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
