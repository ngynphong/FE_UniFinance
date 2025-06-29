"use client"

import { Row, Col, Button, Divider } from "antd"
import { DollarSign, Users, Mail, Phone } from "lucide-react"
import { Link } from "react-router-dom"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Row gutter={[48, 48]}>
          {/* Company Info */}
          <Col xs={24} md={8}>
            <div className="flex items-center space-x-2 mb-6">
              <DollarSign className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold">FinanceConsult</span>
            </div>
            <Link to="/term-conditions">
            <p className="text-gray-300 mb-6">Điều khoản và điều kiện</p>
            </Link>
            <Link to="/privacy-policy">
            <p className="text-gray-300 mb-6">Chính sách bảo mật</p>
            </Link>
            <Link to="/contact-with-us">
            <p className="text-gray-300 mb-6">Liên hệ với chúng tôi</p>
            </Link>

            <p className="text-gray-300 mb-6">Đối tác tin cậy trong hành trình xây dựng tài chính bền vững của bạn.</p>
            <div className="flex space-x-4">
              <Button type="text" className="text-gray-300 hover:text-white p-2">
                <Users className="w-5 h-5" />
              </Button>
              <Button type="text" className="text-gray-300 hover:text-white p-2">
                <Mail className="w-5 h-5" />
              </Button>
              <Button type="text" className="text-gray-300 hover:text-white p-2">
                <Phone className="w-5 h-5" />
              </Button>
            </div>
          </Col>

          {/* Services */}
          <Col xs={24} md={8}>
            <h3 className="text-xl font-bold mb-6">Dịch vụ</h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Tư vấn tài chính trực tuyến
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Công cụ quản lý ngân sách
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Công cụ quản lý nợ
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Tạo mục tiêu tài chính
                </a>
              </li>
              <li>
                <a href="#premium" className="hover:text-yellow-400 transition-colors font-semibold">
                  Gói Premium ⭐
                </a>
              </li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col xs={24} md={8}>
            <h3 className="text-xl font-bold mb-6">Liên hệ</h3>
            <div className="space-y-3 text-gray-300">
              {/* <p>📞 +84 123 456 789</p>
              <p>✉️ info@financeconsult.vn</p>
              <p>📍 123 Đường ABC, Quận 1, TP.HCM</p> */}
              <p>📞 +84 854 494 415</p>
              <p>✉️ kietlgse172490@fpt.edu.vn</p>
              <p>📍 123 Đường ABC, Quận 1, TP.HCM</p>
            </div>
          </Col>
        </Row>

        <Divider className="border-gray-600 my-8" />

        <div className="text-center text-gray-400">
          <p>&copy; {currentYear} FinanceConsult. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
