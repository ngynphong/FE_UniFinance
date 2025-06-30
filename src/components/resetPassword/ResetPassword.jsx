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

            if (token && email) {
                setResetToken(token);
                setResetEmail(email);
            } else {
                setError("Liên kết đặt lại mật khẩu không hợp lệ");
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
        if (password.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự";
        if (!/(?=.*[a-z])/.test(password)) return "Mật khẩu phải chứa chữ thường";
        if (!/(?=.*[A-Z])/.test(password)) return "Mật khẩu phải chứa chữ hoa";
        if (!/(?=.*\d)/.test(password)) return "Mật khẩu phải chứa số";
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validate inputs
        if (!newPassword || !confirmPassword) {
            setError("Vui lòng điền đầy đủ thông tin");
            return;
        }

        const passwordError = validatePassword(newPassword);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Mật khẩu không khớp");
            return;
        }

        try {
            setLoading(true);
            const response = await resetPassword(resetEmail, resetToken, newPassword);
            console.log(response);
            toast.success("Đặt lại mật khẩu thành công!");
            navigate("/login");
        } catch (err) {
            console.error("Reset password error:", err);
            setError(err.response?.data?.message || "Đặt lại mật khẩu thất bại. Vui lòng thử lại.");
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
                        Đặt lại mật khẩu của bạn<br />
                        Hãy chọn một mật khẩu mạnh cho tài khoản của bạn
                    </div>
                </div>

                <div className="flex flex-col justify-center w-full md:w-1/2 p-8 md:p-14">
                    <h2 className="text-3xl font-extrabold mb-2 text-gray-900">Đặt lại mật khẩu</h2>
                    <p className="text-gray-600 mb-8">Nhập mật khẩu mới bên dưới</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <input
                                type="password"
                                placeholder="Mật khẩu mới"
                                className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Xác nhận mật khẩu mới"
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
                            {loading ? "Đang đặt lại..." : "Đặt lại mật khẩu"}
                        </button>
                    </form>

                    <button
                        type="button"
                        className="mt-8 flex items-center text-sm text-black hover:underline font-medium"
                        onClick={() => navigate("/login")}
                    >
                        <FaArrowLeft className="mr-2" /> Quay lại đăng nhập
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;