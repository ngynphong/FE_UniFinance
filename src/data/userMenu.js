import { DashboardOutlined } from "@ant-design/icons";
import { AiFillBank } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";
import { GoGoal } from "react-icons/go";

export const menu = [
    { label: "Overview", icon: <DashboardOutlined />, path: "/dashboard" },
    { label: "Budget Management", icon: <AiFillBank />, path: "/dashboard/budget-management" },
    { label: "Transactions", icon: <GrTransaction />, path: "/dashboard/transactions" },
    { label: "Goal Target", icon: <GoGoal />, path: "/dashboard/goals" },
];