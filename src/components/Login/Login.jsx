import React, { useState } from "react";
import { useAuth } from "../auth/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { IoMdHome } from "react-icons/io";
const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const validate = () => {
        let valid = true;
        let newError = { email: "", password: "" };
        if (!email) {
            newError.email = "Email is required";
            valid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newError.email = "Invalid email address";
            valid = false;
        }
        if (!password) {
            newError.password = "Password is required";
            valid = false;
        }
        else if (password.length < 6) {
            newError.password = "Password must be at least 6 characters";
            valid = false;
        }
        setError(newError);
        return valid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        const res = login(email, password);
        if (res.success) {
            setError({ email: "", password: "" });
            navigate("/");
        } else {
            if (res.message && res.message.toLowerCase().includes("email")) {
                setError({ email: res.message, password: "" })
            } else if (res.message && res.message.toLowerCase.includes("password")) {
                setError({ email: "", password: res.message })
            } else {
                setError({ email: "", password: res.message || "Login Failed" })
            }

        }
    };

    return (
        <div className="flex min-h-screen items-center relative overflow-hidden justify-center">
            {/* Blurred background image */}
            <img className="absolute max-h-screen w-full h-full object-cover mx-auto block top-0 left-0 z-0 scale-105" src="/background.jpg" alt="" />
            {/* Glassmorphism login form */}
            <div className="relative z-10 w-full max-w-md mx-6 p-10 rounded-2xl shadow-2xl bg-white/30 backdrop-blur-lg border border-white/40">
                {/* <p className="text-lg text-gray-700"><IoMdHome /></p> */}
                {/* Accent bar */}
                <div className="w-16 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mb-6 mx-auto" />
                <h2 className="text-3xl font-extrabold mb-2 text-gray-900 text-center drop-shadow">Welcome To UniFinance</h2>
                <p className="text-base text-gray-700 mb-2 text-center">Enter your Email and Password</p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-800" htmlFor="email">Email address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-2 py-2 border border-gray-200 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        {error.email && <div className="text-red-600 text-xs mt-1">{error.email}</div>}
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-sm font-semibold text-gray-800" htmlFor="password">Password</label>

                        </div>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
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

                        <Link to={"/forgot-password"} className="text-xs text-blue-600 hover:underline font-medium">Forgot password</Link>

                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-blue-600 to-cyan-400 shadow-lg hover:from-blue-700 hover:to-cyan-500 transition hover:scale-[1.02] active:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:cursor-pointer"
                    >
                        Login
                    </button>
                </form>
                <div className="flex items-center my-6">
                    <div className="flex-grow h-px bg-gray-200" />
                    <span className="mx-3 text-gray-900 text-sm">or</span>
                    <div className="flex-grow h-px bg-gray-200" />
                </div>
                <div className="flex space-x-3 mb-6">
                    <button className="flex-1 flex items-center justify-center border border-gray-200 rounded-xl py-2.5 bg-white/80 hover:bg-gray-50 hover:cursor-pointer shadow-sm transition">
                        <img src="google-color-svgrepo-com.svg" alt="Google" className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium text-gray-700">Sign in with Google</span>
                    </button>

                </div>

                <p className="text-center text-sm text-gray-700">
                    Don&apos;t have an account?{' '}
                    <Link to={"/register"} className="text-black hover:underline font-semibold">Register </Link>   <br />

                    <Link to={"/"} className="text-black hover:underline font-semibold">Back Home</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
