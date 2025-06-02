import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaArrowLeft } from "react-icons/fa";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setError("Email is required");
            setSuccess(false);
            return;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError("Invalid email address");
            setSuccess(false);
            return;
        }
        setError("");
        setSuccess(true);
        // Here you would trigger your password reset logic (API call, etc)
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
            {/* Blurred background image */}
            <img className="absolute max-h-screen w-full h-full object-cover mx-auto block top-0 left-0 z-0 scale-105" src="/background.jpg" alt="" />
            <div className="relative z-10 flex w-full max-w-4xl  rounded-3xl shadow-2xl overflow-hidden bg-white/30 backdrop-blur-lg border border-white/40">
                {/* Left illustration */}
                <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-gradient-to-br from-blue-100 to-cyan-100 p-10 relative">
                    <div className="mb-6">
                        {/* You can replace this with an SVG or image */}
                        <FaLock className="text-blue-500 text-7xl mx-auto mb-4" />                  
                    </div>
                    <div className="text-lg text-blue-700 font-semibold text-center">
                        Forgot your password?<br />
                        No worries, we'll help you reset it!
                    </div>
                </div>
                {/* Right form */}
                <div className="flex flex-col justify-center w-full md:w-1/2 p-8 md:p-14 ">
                    <h2 className="text-3xl font-extrabold mb-2 text-gray-900 text-left drop-shadow">Forgot<br />Your Password?</h2>
                    <p className="text-base text-gray-700 mb-8">Enter your email address and we'll send you a link to reset your password.</p>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <input
                                id="email"
                                type="email"
                                placeholder="Email Address"
                                className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                disabled={success}
                            />
                            {error && <div className="text-red-600 text-xs mt-1">{error}</div>}
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-blue-600 to-cyan-400 shadow-lg hover:from-blue-700 hover:to-cyan-500 transition hover:scale-[1.02] active:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:cursor-pointer disabled:opacity-60"
                            disabled={success}
                        >
                            Reset Password
                        </button>
                        {success && (
                            <div className="text-green-600 text-sm text-center mt-2">
                                If this email is registered, a reset link has been sent!
                            </div>
                        )}
                    </form>
                    <button
                        type="button"
                        className="mt-8 flex items-center text-sm text-black hover:underline font-medium"
                        onClick={() => navigate("/login")}
                    >
                        <FaArrowLeft className="mr-2" /> Back to sign in
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword; 