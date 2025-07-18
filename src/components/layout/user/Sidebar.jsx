import { UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Space, Spin } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdLogout, MdOutlineDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useEffect } from "react";
import { useAuth } from "../../../contexts/useAuth";
import { IoIosArrowBack } from "react-icons/io";
import { menu } from "../../../data/userMenu";
import { authService } from "../../../services/authService";

export default function Sidebar() {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(() => {
        // Lấy trạng thái từ localStorage khi khởi tạo
        const saved = localStorage.getItem("sidebar-collapsed");
        return saved === "true";
    });
    const navigate = useNavigate();

    const { user, logout } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await authService.getUserProfile(user.userID);
                setUserData(response);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.userID) {
            fetchUserData();
        }

    }, [user])


    useEffect(() => {
        localStorage.setItem("sidebar-collapsed", collapsed);
    }, [collapsed]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <Spin size="large" />
            </div>
        );
    }

    const items = [
        {
            key: '1',
            label: 'Tài khoản',
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: 'Thông tin',
            icon: <FaUser />,
            onClick: () => {
                navigate(`/dashboard/profile/${user.userID}`);
            }

        },

        {
            key: '3',
            label: 'Thoát',
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
                {!collapsed && <div className="text-xs uppercase font-bold text-gray-500 mt-2 mb-2 px-4">Thống kê người dùng</div>}
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
                            <Avatar size={collapsed ? 32 : 40} src={userData.avatar} icon={<UserOutlined />} />
                            {!collapsed && (
                                <div>
                                    <div className="text-sm font-semibold">{userData.name}</div>
                                    <div className="text-[10px] text-gray-400">{userData.userName}</div>
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