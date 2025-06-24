"use client"

import { Row, Col, Button, Card } from "antd"
import { ArrowRight, Phone, Mail, MessageCircle } from 'lucide-react'

const ServiceCTA = ({ scrollToSection }) => {
  return (
    <section
      id="cta"
      className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <Row gutter={[48, 48]} align="middle">
          {/* Content */}
          <Col xs={24} lg={12}>
            <div className="text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Sẵn sàng bắt đầu hành trình tài chính của bạn?</h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Đừng để thời gian trôi qua mà không có kế hoạch tài chính rõ ràng. Hãy liên hệ với chúng tôi ngay hôm
                nay để được tư vấn miễn phí.
              </p>

              {/* Benefits */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <span className="text-gray-300">Tư vấn miễn phí 15 phút đầu tiên</span>
                </div>
                {/* Thêm các benefits khác */}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="primary"
                  size="large"
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 border-none hover:from-yellow-500 hover:to-orange-600 h-14 px-8 text-lg font-semibold"
                  onClick={() => scrollToSection("contact")}
                >
                  Đặt lịch tư vấn ngay
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </Col>

          {/* Contact Cards */}
          <Col xs={24} lg={12}>
            <div className="grid grid-cols-1 gap-6">
              {/* Contact Cards */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Hotline 24/7</h4>
                    <p className="text-gray-300">+84 123 456 789</p>
                  </div>
                </div>
              </Card>

              {/* Thêm các contact cards khác */}

              {/* Stats */}
              <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-lg rounded-xl p-6 border border-yellow-400/30">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">50+</div>
                    <div className="text-xs text-gray-300">Khách hàng</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">65%</div>
                    <div className="text-xs text-gray-300">Hài lòng</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">5+</div>
                    <div className="text-xs text-gray-300">Năm kinh nghiệm</div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default ServiceCTA