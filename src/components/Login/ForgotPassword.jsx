import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../auth/useAuthHook";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const { forgotPassword } = useAuth();
    const [resetEmailSent, setResetEmailSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset states
        setError("");
        setSuccess(false);
        setResetEmailSent(false);

        // Validate email
        if (!email) {
            setError("Email is required");
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError("Invalid email address");
            return;
        }

        try {
            const response = await forgotPassword(email);
            if (response.success) {
                setResetEmailSent(true);
                setSuccess(true);
                setError("");
            } else {
                setError(response.message || "Failed to send reset email");
                setResetEmailSent(false);
            }
        } catch (err) {
            console.error('Forgot password error:', err);
            setError(
                err.response?.data?.message ||
                "Unable to send reset email. Please try again later."
            );
            setResetEmailSent(false);
            setSuccess(false);
        }
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
                    {resetEmailSent && (
                        <div className="mb-4 p-3 text-center bg-green-100 text-green-700 rounded-lg text-sm">
                            Reset password email has been sent!
                        </div>
                    )}

                    {error && (
                        <div className="mb-4 p-3 text-center bg-red-100 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <h2 className="text-3xl font-extrabold mb-2 text-gray-900 text-left drop-shadow">
                        Forgot<br />Your Password?
                    </h2>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <input
                                id="email"
                                type="email"
                                placeholder="Email Address"
                                className={`w-full px-3 py-2 border rounded-xl bg-white/70 
                                focus:outline-none focus:ring-2 focus:ring-blue-400 
                                transition shadow-sm ${error ? 'border-red-500' : 'border-gray-200'}`}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                disabled={success}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 rounded-xl font-semibold text-lg text-white 
                            bg-gradient-to-r from-blue-600 to-cyan-400 shadow-lg 
                            hover:from-blue-700 hover:to-cyan-500 transition 
                            hover:scale-[1.02] active:scale-100 
                            focus:outline-none focus:ring-2 focus:ring-blue-400 
                            hover:cursor-pointer disabled:opacity-60"
                            disabled={success}
                        >
                            {success ? 'Email Sent' : 'Reset Password'}
                        </button>
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