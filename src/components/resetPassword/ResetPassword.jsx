import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaLock, FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../auth/useAuthHook";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { resetPassword } = useAuth();

    // Thêm state để lưu token và email
    const [resetToken, setResetToken] = useState(null);
    const [resetEmail, setResetEmail] = useState(null);

    useEffect(() => {
        const getResetParams = () => {
            const queryParams = new URLSearchParams(location.search);
            // Decode token đúng cách và thay thế khoảng trắng bằng dấu +
            const token = decodeURIComponent(queryParams.get("token")).replace(/ /g, '+');
            const email = queryParams.get("email");

            console.log("Original token from URL:", queryParams.get("token"));
            console.log("Processed token:", token);
            console.log("Email received:", email);

            if (token && email) {
                setResetToken(token);
                setResetEmail(email);
            } else {
                setError("Invalid reset password link");
                setTimeout(() => navigate('/login'), 3000);
            }
        };

        getResetParams();
    }, [navigate]);

    // Thêm useEffect để theo dõi token và email
    useEffect(() => {
        console.log("Current token:", resetToken);
        console.log("Current email:", resetEmail);
    }, [resetToken, resetEmail]);

    const validatePassword = (password) => {
        if (password.length < 6) return "Password must be at least 6 characters";
        if (!/(?=.*[a-z])/.test(password)) return "Password must include lowercase letters";
        if (!/(?=.*[A-Z])/.test(password)) return "Password must include uppercase letters";
        if (!/(?=.*\d)/.test(password)) return "Password must include numbers";
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validate inputs
        if (!newPassword || !confirmPassword) {
            setError("Please fill in all fields");
            return;
        }

        const passwordError = validatePassword(newPassword);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            const response = await resetPassword(resetEmail, resetToken, newPassword);
            console.log(response);
            toast.success("Password has been reset successfully!");
            navigate("/login");
        } catch (err) {
            console.error("Reset password error:", err);
            setError(err.response?.data?.message || "Failed to reset password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
            <img className="absolute max-h-screen w-full h-full object-cover mx-auto block top-0 left-0 z-0 scale-105" src="/background.jpg" alt="" />
            <div className="relative z-10 flex w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden bg-white/30 backdrop-blur-lg border border-white/40">
                <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-gradient-to-br from-blue-100 to-cyan-100 p-10">
                    <div className="mb-6">
                        <FaLock className="text-blue-500 text-7xl mx-auto mb-4" />
                    </div>
                    <div className="text-lg text-blue-700 font-semibold text-center">
                        Reset Your Password<br />
                        Choose a strong password for your account
                    </div>
                </div>

                <div className="flex flex-col justify-center w-full md:w-1/2 p-8 md:p-14">
                    <h2 className="text-3xl font-extrabold mb-2 text-gray-900">Reset Password</h2>
                    <p className="text-gray-600 mb-8">Enter your new password below</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <input
                                type="password"
                                placeholder="New Password"
                                className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm">{error}</div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500 transition disabled:opacity-50"
                        >
                            {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;