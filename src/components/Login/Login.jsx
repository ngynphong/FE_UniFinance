import React, { useState } from "react";
import { useAuth } from "../auth/useAuthHook";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
const Login = () => {
    const { login, handleGoogleLogin } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
        let valid = true;
        let newError = { email: "", password: "" };
        if (!email) {
            newError.email = "Email không được để trống";
            valid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newError.email = "Sai định dạng email";
            valid = false;
        }
        if (!password) {
            newError.password = "Mật khẩu không được để trống";
            valid = false;
        }
        // else if (password.length < 6) {
        //     newError.password = "Password must be at least 6 characters";
        //     valid = false;
        // }
        setError(newError);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setIsLoading(true);
        const res = await login(email, password);
        if (res.success) {
            setError({ email: "", password: "" });
            if (res.response.role === "Administrator") {
                navigate("/admin/dashboard");
            } else if (res.response.role === "Consultant") {
                navigate("/staff/dashboard/overview");
            } else {
                navigate("/");
            }

        } else {
            setError({ email: "", password: res.message || "Sai email hoặc mật khẩu" });
        }
        setIsLoading(false);
    };

    const onGoogleSuccess = async (credentialResponse) => {
        setIsLoading(true);
        try {
            if (!credentialResponse?.credential) {
                throw new Error('No credentials received from Google');
            }
            console.log('google',credentialResponse.credential)
            const decoded = jwtDecode(credentialResponse.credential);

            const googleUserInfo = {
                IdToken: credentialResponse.credential,
                Name: decoded.name || '',
                Email: decoded.email || '',
                PhoneNumber: '',
                Picture: decoded.picture || ''
            };

            const res = await handleGoogleLogin(googleUserInfo);
            if (res.success) {
                navigate("/");
            } else {
                setError({ email: "", password: res.message || "Đăng nhập thất bại" });
            }
        } catch (error) {
            setError({
                email: "",
                password: error.message || "Failed to process Google login"
            });
        } finally {
            setIsLoading(false);
        }
    };
    const onGoogleError = () => {
        setError({ email: "", password: "Đăng nhập Google thất bại" });
    };

    return (
        <div className="flex min-h-screen items-center relative overflow-hidden justify-center">
            <img className="absolute max-h-screen w-full h-full object-cover mx-auto block top-0 left-0 z-0 scale-105" src="/background.jpg" alt="" />
            <div className="relative z-10 w-full max-w-md mx-6 p-10 rounded-2xl shadow-2xl bg-white/30 backdrop-blur-lg border border-white/40">
                <div className="w-16 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mb-6 mx-auto" />
                <h2 className="text-3xl font-extrabold mb-2 text-gray-900 text-center drop-shadow">Chào mừng đến với UniFinance</h2>
                <p className="text-base text-gray-700 mb-2 text-center">Vui lòng đăng nhập để truy cập</p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-800" htmlFor="email">Email</label>
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
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-sm font-semibold text-gray-800" htmlFor="password">Mật khẩu</label>
                        </div>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Mật khẩu"
                                className="w-full px-2 py-2 border border-gray-200 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm pr-10"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-xs"
                                onClick={() => setShowPassword((prev) => !prev)}
                                tabIndex={-1}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {error.password && <div className="text-red-600 text-xs mt-1">{error.password}</div>}
                    </div>
                    <div className="flex items-center justify-end">
                        <Link to="/forgot-password" className="text-xs text-blue-600 hover:underline font-medium">Quên mật khẩu</Link>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-blue-600 to-cyan-400 shadow-lg hover:from-blue-700 hover:to-cyan-500 transition hover:scale-[1.02] active:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:cursor-pointer"
                    >
                        {isLoading ? <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        </div> : "Đăng nhập"}
                    </button>
                </form>

                <div className="flex items-center my-6">
                    <div className="flex-grow h-px bg-gray-200" />
                    <span className="mx-3 text-gray-900 text-sm">hoặc</span>
                    <div className="flex-grow h-px bg-gray-200" />
                </div>

                <div className="flex justify-center mb-6">
                    <GoogleLogin
                        onSuccess={onGoogleSuccess}
                        onError={onGoogleError}
                        useOneTap
                        theme="filled_blue"
                        shape="pill"
                        text="continue_with"
                        className="rounded-lg shadow-lg hover:scale-[1.02] transition-transform active:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <p className="text-center text-sm text-gray-700">
                    Không có tài khoản?{' '}
                    <Link to="/register" className="text-black hover:underline font-semibold">Đăng ký</Link>
                    <br />
                    <Link to="/" className="text-black hover:underline font-semibold">Trang chủ</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
