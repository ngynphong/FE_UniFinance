import React, { createContext, useContext, useState, useEffect } from "react";
import { userData } from "../../data/userData";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    // Load user from sessionStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("authUser");
        if (stored) setUser(JSON.parse(stored));
        setIsLoading(false);
    }, []);

    // Save user to sessionStorage
    useEffect(() => {
        if (user) localStorage.setItem("authUser", JSON.stringify(user));
        else localStorage.removeItem("authUser");
    }, [user]);

    // Login with fake data
    const login = (email, password) => {
        console.log(userData.name)
        if (
            (email === userData.email && password === userData.password) ||
            (user && email === user.email && password === user.password)
        ) {
            setUser({ name: userData.name, email, role: userData.role });
            return { success: true };
        }
        else if (email !== userData.email || password !== userData.password) {
            return { success: false, message: "Wrong email or password" }
        }

    };

    // Register (save to session, not persistent)
    const register = (name, email, password) => {
        setUser({ name, email, password, role: "user" });
        return { success: true };
    };

    const logout = () => setUser(null);

    const isAuthenticated = !!user;

    if (isLoading) return null;

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
} 