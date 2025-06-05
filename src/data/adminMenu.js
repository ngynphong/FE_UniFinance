import { DashboardOutlined } from "@ant-design/icons";
import { FaUser } from "react-icons/fa";

export const menu = [
    { label: "Overview", icon: <DashboardOutlined />, path: "/admin/dashboard" },
    { label: "User Management", icon: <FaUser />, path: "/admin/dashboard/user-management" },
    // { label: "Transactions", icon: <GrTransaction />, path: "/dashboard/transactions" },
    // { label: "Goal Target", icon: <GoGoal />, path: "/dashboard/goals" },
];