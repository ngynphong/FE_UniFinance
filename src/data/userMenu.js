import { DashboardOutlined } from "@ant-design/icons";
import { AiFillBank } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";
import { GoGoal } from "react-icons/go";
import { MdOutlineDashboard, MdEvent, MdEventAvailable, MdChat} from "react-icons/md";
import { ImBlog } from "react-icons/im";
export const menu = [
    { label: "Tổng quan", icon: <DashboardOutlined />, path: "/dashboard" },
    { label: "Quản lý ngân sách", icon: <AiFillBank />, path: "/dashboard/budget-management" },
    { label: "Giao dịch", icon: <GrTransaction />, path: "/dashboard/transactions" },
    { label: "Mục tiêu", icon: <GoGoal />, path: "/dashboard/goals" },
    { label: "Quản lý nợ", icon: <MdOutlineDashboard />, path: "/dashboard/debt-management" },
    { label: "Đặt lịch tư vấn", icon: <MdEvent />, path: "/dashboard/booking" },
    { label: "Bài viết", icon: <ImBlog />, path: "/dashboard/blog" },
    { label: "Lịch hẹn của tôi", icon: <MdEventAvailable  />, path: "/dashboard/booking-history" },
    { label: "Tư vấn trực tuyến", icon: <MdChat />, path: "/dashboard/chat" }
];

