import React, { useState, useEffect, useContext } from "react";
import { userData, adminData } from "../data/userData";
import { AuthContext } from "../components/auth/AuthContext";

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

const useAuthState = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem("authUser");
        if (stored) setUser(JSON.parse(stored));
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (user) localStorage.setItem("authUser", JSON.stringify(user));
        else localStorage.removeItem("authUser");
    }, [user]);

    const login = (email, password) => {
        // Check admin credentials
        if (email === adminData.email && password === adminData.password) {
            setUser({
                name: adminData.name,
                email: adminData.email,
                role: adminData.role,
                avatar: adminData.avatar
            });
            return { success: true };
        }
        // Check user credentials
        if (email === userData.email && password === userData.password) {
            setUser({
                name: userData.name,
                email: userData.email,
                role: userData.role,
                avatar: userData.avatar
            });
            return { success: true };
        }
        return { success: false, message: "Wrong email or password" };
    };

    const handleGoogleLogin = async (credentialResponse) => {
        if (credentialResponse.credential) {
            const idToken = credentialResponse.credential;
            try {
                // For now, we'll simulate a successful login
                const googleUser = {
                    name: "Google User",
                    email: "google@example.com",
                    role: "user",
                    idToken
                };
                setUser(googleUser);
                return { success: true };
            } catch (error) {
                console.error("Google login error:", error);
                return { success: false, message: "Failed to login with Google" };
            }
        }
        return { success: false, message: "No credentials received" };
    };

    const register = (name, email, password) => {
        setUser({ name, email, password, role: "user" });
        return { success: true };
    };

    const logout = () => setUser(null);

    return {
        user,
        isLoading,
        login,
        register,
        logout,
        handleGoogleLogin,
        isAuthenticated: !!user
    };
};

export function AuthProvider({ children }) {
    const auth = useAuthState();

    if (auth.isLoading) return null;

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}