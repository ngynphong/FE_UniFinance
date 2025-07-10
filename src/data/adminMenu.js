import { DashboardOutlined } from "@ant-design/icons";
import { FaUser, FaMoneyBillWave, FaRegCalendarAlt } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { GoGoal } from "react-icons/go";
import { RiFileList3Line } from "react-icons/ri";
import { BsBoxSeam } from "react-icons/bs";

export const menu = [
  {
    label: "Tổng quan",
    icon: <DashboardOutlined />,
    path: "/admin/dashboard",
  },
  {
    label: "Quản lý người dùng",
    icon: <FaUser />,
    path: "/admin/dashboard/user-management",
  },
  {
    label: "Thống kê tài chính",
    icon: <FaMoneyBillWave />,
    path: "/admin/dashboard/financial-stats",
  },
  {
    label: "Quản lý gói dịch vụ",
    icon: <BsBoxSeam />,
    path: "/admin/dashboard/packages",
  },
  {
    label: "Quản lý blog",
    icon: <RiFileList3Line />,
    path: "/admin/dashboard/blogs",
  },
  {
    label: "Lịch tư vấn",
    icon: <FaRegCalendarAlt />,
    path: "/admin/dashboard/consultation-schedule",
  },
  // {
  //   label: "Mục tiêu",
  //   icon: <GoGoal />,
  //   path: "/admin/dashboard/goals",
  // },
  // {
  //   label: "Giao dịch",
  //   icon: <GrTransaction />,
  //   path: "/admin/dashboard/transactions",
  // },
];
