import { DashboardOutlined } from "@ant-design/icons";
import { AiFillBank } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";
import { GoGoal } from "react-icons/go";
import { MdOutlineDashboard } from "react-icons/md";

export const menu = [
    { label: "Tổng quan", icon: <DashboardOutlined />, path: "/dashboard" },
    { label: "Quản lý ngân sách", icon: <AiFillBank />, path: "/dashboard/budget-management" },
    { label: "Giao dịch", icon: <GrTransaction />, path: "/dashboard/transactions" },
    { label: "Mục tiêu", icon: <GoGoal />, path: "/dashboard/goals" },
    { label: "Quản lý nợ", icon: <MdOutlineDashboard />, path: "/dashboard/debt-management" },
    { label: "Tư vấn trực tuyến", icon: <MdOutlineDashboard />, path: "/dashboard/chat" }
];