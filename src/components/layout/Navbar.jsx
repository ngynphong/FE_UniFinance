"use client"

import { Menu, Button, Avatar } from "antd"
import { DollarSign } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/useAuth" // Assuming you have a useAuth hook to check authentication status
import { UserOutlined } from "@ant-design/icons";
const Header = () => {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth();// Assuming you have a useAuth hook to check authentication status

  const menuItems = [
    { key: "home", label: "Trang chủ", path: "/" },
    { key: "services", label: "Dịch vụ", path: "/services" },
    { key: "premium", label: "Gói Premium", path: "/premium" },
    { key: "about", label: "Về chúng tôi", path: "/about-us" },
    { key: "resources", label: "Nguồn lực", path: "/resources" },
    { key: "contact", label: "Liên hệ", path: "/contact-with-us" },
  ]

  const handleMenuClick = ({ key }) => {
    const item = menuItems.find(item => item.key === key)
    if (item?.path) {
      navigate(item.path)
    }
  }

  return (
    <header className="fixed w-full z-50 bg-white shadow-lg">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
            <DollarSign className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">UniFinance</span>
          </div>

          {/* Navigation Menu */}
          <Menu
            mode="horizontal"
            items={menuItems}
            onClick={handleMenuClick}
            className="border-none bg-transparent hidden md:flex"
          />

          {/* CTA Button */}
          {!isAuthenticated ? (
            <Button
              type="primary"
              size="large"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/dashboard")}>
                <Avatar src={user.avatar} icon={<UserOutlined />} className="w-10 h-10 rounded-full" />
                <span className="text-gray-800 text-sm font-semibold text">{user.name}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
