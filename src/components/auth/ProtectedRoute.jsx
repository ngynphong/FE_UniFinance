import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";

export default function ProtectedRoute({ children, roles }) {
    const { user, isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to="/" />;
    if (roles && !roles.includes(user.role)) {
        if (user.role === "admin") return <Navigate to="/admin/dashboard" />
        return <Navigate to="/" />;
    }
    return children;
} 