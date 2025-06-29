import { DashboardOutlined } from "@ant-design/icons";
import { AiFillBank } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";
import { GoGoal } from "react-icons/go";
import { MdOutlineDashboard } from "react-icons/md";
import { ImBlog } from "react-icons/im";

export const menu = [
    { label: "Overview", icon: <DashboardOutlined />, path: "/dashboard" },
    { label: "Budget Management", icon: <AiFillBank />, path: "/dashboard/budget-management" },
    { label: "Transactions", icon: <GrTransaction />, path: "/dashboard/transactions" },
    { label: "Goal Target", icon: <GoGoal />, path: "/dashboard/goals" },
    { label: "Debt Management", icon: <MdOutlineDashboard />, path: "/dashboard/debt-management" },
    { label: "Bài viết" , icon: <ImBlog />, path: "/dashboard/blog" },
];