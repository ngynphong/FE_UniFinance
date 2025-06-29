import React, { useState, useEffect, useContext } from "react";
// import { userData, adminData } from "../data/userData";
import { AuthContext } from "../components/auth/AuthContext";
import { authService } from "../services/authService";
import { HubConnectionBuilder } from "@microsoft/signalr";

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
  const [connection, setConnection] = useState(null);
  const [isSignalRConnected, setIsSignalRConnected] = useState(false);


  useEffect(() => {
    // Setup SignalR connection
    const token = localStorage.getItem("token");
    if (token) {
      const newConnection = new HubConnectionBuilder()
        .withUrl("YOUR_SIGNALR_HUB_URL", {
          accessTokenFactory: () => token,
        })
        .withAutomaticReconnect()
        .build();

      newConnection
        .start()
        .then(() => {
          console.log("SignalR Connected");
          setIsSignalRConnected(true);
        })
        .catch((err) => {
          console.error("SignalR Connection Error:", err);
          setIsSignalRConnected(false);
        });

      setConnection(newConnection);

      // Cleanup connection when component unmounts
      return () => {
        if (newConnection.state === "Connected") {
          newConnection.stop().catch(console.error);
        }
      };
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("token");
    // Không nên parse token như JSON
    if (stored) {
      try {
        // Lấy user từ localStorage
        const userData = localStorage.getItem("authUser");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("authUser");
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("token", JSON.stringify(user));
    else localStorage.removeItem("token");
  }, [user]);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      setUser(response);
      const token = `Bearer ${response.accessToken}`;
      // Lưu token
      localStorage.setItem("token", token);
      // Lưu user info riêng
      localStorage.setItem("authUser", JSON.stringify(response));
      return { success: true, response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const handleGoogleLogin = async (googleUserInfo) => {
    try {
      if (!googleUserInfo || !googleUserInfo.IdToken) {
        throw new Error("No credentials received");
      }
      const response = await authService.googleLogin(googleUserInfo);
      setUser(response);
      const token = `Bearer ${response.accessToken}`;
      localStorage.setItem("token", token);
      localStorage.setItem("authUser", JSON.stringify(response));
      return { success: true };
    } catch (error) {
      console.error("Google login error:", error);
      return {
        success: false,
        message: error.message || "Failed to login with Google",
      };
    }
  };

  const register = async (name, email, password, confirmPassword) => {
    try {
      const response = await authService.register({
        name,
        email,
        password,
        confirmPassword,
      });
      setUser(response);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await authService.forgotPassword(email);
      console.log(response);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

const updateOnlineStatus = (userId, isOnline) => {
  const storedStatuses = JSON.parse(localStorage.getItem("onlineStatuses") || "{}");
  storedStatuses[userId] = isOnline;
  localStorage.setItem("onlineStatuses", JSON.stringify(storedStatuses));
};

  const logout = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentUserId =
      payload[
        "http://schemas.xmlsoap.org/2005/05/identity/claims/nameidentifier"
      ];

    updateOnlineStatus(currentUserId, false); 

    if (connection && isSignalRConnected) {
      try {
        await connection.invoke("UserOffline", currentUserId);
      } catch (error) {
        console.error(
          "Failed to notify other clients about user offline:",
          error
        );
      }
    }

    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("authUser");
    localStorage.removeItem("accessToken");
  };
  const updateUserProfile = (values) => {
    setUser((prevUser) => {
      const updatedUser = { ...(prevUser || {}), ...values };
      localStorage.setItem("authUser", JSON.stringify(updatedUser));
      setUser(updatedUser);
      return updatedUser;
    });
  };
  const checkTokenValidity = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }
    // Thêm logic kiểm tra token expiry nếu cần
    return true;
  };

  const resetPassword = async (email, token, newPassword) => {
    try {
      const response = await authService.resetPassword(
        email,
        token,
        newPassword
      );
      console.log(response);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  return {
    user,
    isLoading,
    login,
    register,
    logout,
    handleGoogleLogin,
    updateUserProfile,
    forgotPassword,
    resetPassword,
    isAuthenticated: !!user,
    checkTokenValidity,
  };
};

export function AuthProvider({ children }) {
  const auth = useAuthState();

  if (auth.isLoading) return null;

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
