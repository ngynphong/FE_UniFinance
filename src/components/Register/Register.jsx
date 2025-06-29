import React, { useState } from "react";
import { useAuth } from "../auth/useAuthHook";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState({ name: "", email: "", password: "", confirmPassword: "" });

    const validate = () => {
        let valid = true;
        let newError = { name: "", email: "", password: "", confirmPassword: "" };
        if (!name) {
            newError.name = "Họ tên là bắt buộc";
            valid = false;
        } else if (name.length < 3) {
            newError.name = "Họ tên phải có ít nhất 3 ký tự";
            valid = false;
        }
        if (!email) {
            newError.email = "Email là bắt buộc";
            valid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newError.email = "Địa chỉ email không hợp lệ";
            valid = false;
        }

        if (!password) {
            newError.password = "Mật khẩu là bắt buộc";
            valid = false;
        } else if (password.length < 6) {
            newError.password = "Mật khẩu phải có ít nhất 6 ký tự";
            valid = false;
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            newError.password = "Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường và một số";
            valid = false;
        }

        if (!confirmPassword) {
            newError.confirmPassword = "Xác nhận mật khẩu là bắt buộc";
            valid = false;
        } else if (confirmPassword !== password) {
            newError.confirmPassword = "Mật khẩu không khớp";
            valid = false;
        }

        setError(newError);
        return valid;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        const res = await register(name, email, password, confirmPassword);
        if (res.success) {
            setError({ name: "", email: "", password: "", confirmPassword: "" });
            toast.success('Đăng ký thành công! Vui lòng đăng nhập', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } else {
            if (res.message && res.message.toLowerCase().includes("name")) {
                setError({ name: res.message, email: "", password: "", confirmPassword: "" });
            } else if (res.message && res.message.toLowerCase().includes("email")) {
                setError({ name: "", email: res.message, password: "", confirmPassword: "" });
            } else {
                setError({ name: "", email: "", password: "", confirmPassword: res.message || "Đăng ký thất bại" });
            }
        }
    };

    return (
        <div className="flex min-h-screen items-center relative overflow-hidden justify-center">
            {/* Blurred background image */}
            <img className="absolute max-h-screen w-full h-full object-cover mx-auto block top-0 left-0 z-0 scale-105" src="/background.jpg" alt="" />
            {/* Glassmorphism register form */}
            <div className="relative z-10 w-full max-w-md mx-2 p-10 rounded-2xl shadow-2xl bg-white/30 backdrop-blur-lg border border-white/40">
                {/* Accent bar */}
                <div className="w-16 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mb-2 mx-auto" />
                <h2 className="text-3xl font-extrabold mb-2 text-gray-900 text-center drop-shadow">Tạo tài khoản của bạn</h2>
                <p className="text-base text-gray-700 mb-8 text-center">Đăng ký để bắt đầu sử dụng tài khoản của bạn</p>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-800" htmlFor="name">Họ và tên</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Nhập họ và tên của bạn"
                            className="w-full px-2 py-2 border border-gray-200 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        {error.name && <div className="text-red-600 text-xs mt-1">{error.name}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-800" htmlFor="email">Địa chỉ email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Nhập email của bạn"
                            className="w-full px-2 py-2 border border-gray-200 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        {error.email && <div className="text-red-600 text-xs mt-1">{error.email}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-800" htmlFor="password">Mật khẩu</label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Tạo mật khẩu"
                                className="w-full px-2 py-2 border border-gray-200 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm pr-10"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-xs"
                                onClick={() => setShowPassword((prev) => !prev)}
                                tabIndex={-1}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {error.password && <div className="text-red-600 text-xs mt-1">{error.password}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-800" htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Xác nhận mật khẩu của bạn"
                                className="w-full px-2 py-2 border border-gray-200 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm pr-10"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-xs"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                tabIndex={-1}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {error.confirmPassword && <div className="text-red-600 text-xs mt-1">{error.confirmPassword}</div>}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-blue-600 to-cyan-400 shadow-lg hover:from-blue-700 hover:to-cyan-500 transition hover:scale-[1.02] active:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:cursor-pointer"
                    >
                        Đăng ký
                    </button>
                </form>
                <div className="flex items-center my-6">
                    <div className="flex-grow h-px bg-gray-200" />
                    <span className="mx-3 text-gray-900 text-sm">hoặc</span>
                    <div className="flex-grow h-px bg-gray-200" />
                </div>
                <div className="flex space-x-3 mb-6">
                    <button className="flex-1 flex items-center justify-center border border-gray-200 rounded-xl py-2.5 bg-white/80 hover:bg-gray-50 hover:cursor-pointer shadow-sm transition">
                        <img src="google-color-svgrepo-com.svg" alt="Google" className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium text-gray-700">Đăng ký với Google</span>
                    </button>
                </div>
                <p className="text-center text-sm text-gray-700">
                    Đã có tài khoản?{' '}
                    <Link to={"/login"} className="text-black hover:underline font-semibold">Đăng nhập</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;