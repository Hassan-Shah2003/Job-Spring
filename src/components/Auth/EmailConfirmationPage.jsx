import React, { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';
import { ArrowLeftCircle } from 'lucide-react';

const EmailConfirmationPage = () => {
  const navigate = useNavigate(); // ⚡ useNavigate hook
  const location = useLocation()
  const locationState = location?.state
  console.log("locationState-----------", locationState);

  const { resendEmailVerification } = useAuth();
  const savedData = localStorage.getItem("signup_formData");
  const parsedData = JSON.parse(savedData) || {}; // Convert string back to object
  // const [emailEditLoading,setEmailEditLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  console.log(parsedData);

  const handleResendEmail = async () => {
    setResendLoading(true);
    try {
      await resendEmailVerification(locationState?.email);
      toast.success("Verification email resent!");
    } catch (error) {
      toast.error("Failed to resend email!");
    } finally {
      setResendLoading(false);
    }
  };
  // const emailEditHandler = () => {
  //   setEmailEditLoading(true);
  //     navigate("/signup")
  //   // setEmailEditLoading(false);

  // }

  const handleBack = () => {
    localStorage.removeItem("signup_formData"); // old email remove
    navigate("/signup", { replace: true }); // replace = no history glitch
  };


  return (
    <>
      <div
        className="absolute top-4 left-4 cursor-pointer text-[#244034] hover:scale-110 transition"
        onClick={handleBack}
      >
        <ArrowLeftCircle size={32} />
      </div>
      <div className="min-h-screen bg-gradient-to-br from-[#244034]/10 to-[#244034]/5 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-[#244034] p-6 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">Confirm Your Email</h1>
            <p className="text-white/80 mt-2">We've sent a confirmation link to your email</p>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-[#244034]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-[#244034]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Check Your Inbox</h2>
              <p className="text-gray-600 mt-2">
                We've sent a confirmation email to your <span className='font-black'>{locationState?.email || "your email"}</span>
              </p>
            </div>

            <div className="bg-[#244034]/5 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700 text-center">
                Click the confirmation link in the email to verify your account and complete your registration.
              </p>
            </div>

            <div className="space-y-4">
              <button className={`w-full items-center flex justify-center gap-2  bg-[#244034] hover:bg-[#1a3328] text-white font-medium py-3 px-4 rounded-lg transition duration-200 cursor-pointer ${resendLoading ? "opacity-60 cursor-not-allowed pointer-events-none" : ""}`} disabled={resendLoading}
                onClick={handleResendEmail}>
                {/* Resend Confirmation Email */}

                {/* {loading ? "Signing Up..." : "Sign Up"} */}
                {resendLoading ? "resending..." : "Resend Confirmation Email"}
                {resendLoading && (
                  <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"></div>
                )}
              </button>

              {/* <Link to="/signup"> */}
              {/* <button className={`w-full flex justify-center items-center gap-2 border border-[#244034] text-[#244034] hover:bg-[#244034]/5 font-medium py-3 px-4 rounded-lg transition duration-200 cursor-pointer ${emailEditLoading? "opacity-60 cursor-not-allowed pointer-events-none": ""}`} onClick={emailEditHandler}>
              {emailEditLoading ? "redirecting..." : "Change Email Address"}
              {emailEditLoading && (
                <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"></div>
              )}
              </button> */}
              {/* </Link> */}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-500">
                Didn't receive the email? Check your spam folder or
                <a href="#" className="text-[#244034] font-medium ml-1 hover:underline">contact support</a>.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 py-4 px-6 text-center">
            <p className="text-xs text-gray-500">
              © 2023 Your Company. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailConfirmationPage;