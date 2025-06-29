import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";

export default function ProtectedRoute({ children, roles }) {
    const { user, isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to="/" />;
    if (roles && !roles.includes(user.role)) {
        if (user.role === "Admin") return <Navigate to="/admin/dashboard" />
        else if (user.role === "Consultant") return <Navigate to="/staff/dashboard" />
        return <Navigate to="/" />;
    }
    return children;
} 