import { UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Space } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdLogout } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../../contexts/useAuth";
import { IoIosArrowBack } from "react-icons/io";
import { menu } from "../../../data/adminMenu";

export default function AdminSidebar() {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(() => {
        // Lấy trạng thái từ localStorage khi khởi tạo
        const saved = localStorage.getItem("sidebar-collapsed");
        return saved === "true";
    });
    const navigate = useNavigate();

    const { user, logout } = useAuth();

    useEffect(() => {
        localStorage.setItem("sidebar-collapsed", collapsed);
    }, [collapsed]); const items = [
        {
            key: '1',
            label: 'Admin Account',
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: 'Profile',
            icon: <FaUser />,
            onClick: () => {
                navigate("/admin/profile");
            }
        },
        {
            key: '3',
            label: 'Logout',
            icon: <MdLogout />,
            onClick: () => {
                logout();
            }

        },
    ];

    return (
        <div className={`h-screen sticky top-0 ${collapsed ? "w-20" : "w-64"} bg-white flex flex-col shadow-lg transition-all duration-300`}>
            {/* Collapse button */}

            <div className={`${!collapsed ? "flex justify-between items-center border-b" : "flex items-center"} `}>
                <div>
                    <Button type='text' icon={<IoIosArrowBack />} onClick={() => { navigate('/') }}></Button>
                </div>
                {!collapsed && <div className="text-xs uppercase font-bold text-gray-500 mt-2 mb-2 px-4">Admin Dashboard</div>}
                <div className="flex items-center justify-end p-2">
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        className="text-black"
                    />
                </div>

            </div>

            {/* Profile */}
            <div className={`${!collapsed ? "px-4 py-3 border-b  flex items-center gap-3 hover:bg-gray-200 hover:cursor-pointer transition-colors duration-200" : "px-4 py-3 border-b  flex items-center gap-3 hover:bg-gray-200 hover:cursor-pointer transition-colors duration-200 flex-col justify-center"}`}>
                <Dropdown menu={{ items }}>
                    <a onClick={e => e.preventDefault()}>
                        <Space>
                            <Avatar size={collapsed ? 32 : 40} src={user.avatar} icon={<UserOutlined />} />
                            {!collapsed && (
                                <div>
                                    <div className="text-sm font-semibold">{user.name}</div>
                                    <div className="text-xs text-gray-400">{user.email}</div>
                                </div>
                            )}
                        </Space>
                    </a>
                </Dropdown>

            </div>
            {/* Menu */}
            <nav className="flex-1 mt-4 flex flex-col items-center">
                {menu.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`
                                        flex items-center transition-all duration-200 active-menu mt-1
                                        ${collapsed ? "justify-center w-12 h-12" : "px-6 py-2 w-11/12"}
                                        ${isActive
                                    ? `bg-blue-500 text-white rounded-2xl`
                                    : "text-black hover:bg-blue-500  hover:text-white rounded-2xl"
                                }
                                    `}
                            style={{
                                minHeight: collapsed ? 48 : undefined,
                            }}
                        >
                            <span className={`text-lg ${isActive ? "text-white" : ""}`}>{item.icon}</span>
                            {!collapsed && <span className="font-medium ml-3">{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}