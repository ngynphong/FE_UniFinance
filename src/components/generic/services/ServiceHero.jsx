"use client";

import { Row, Col, Button, Badge } from "antd";
import { ArrowRight, Star, Shield, TrendingUp, Users } from "lucide-react";

const ServiceHero = ({ isVisible, scrollToSection }) => {
  const highlights = [
    {
      icon: <Star className="w-5 h-5" />,
      text: "5+ Tính năng",
      color: "text-yellow-500",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: "Bảo mật tuyệt đối",
      color: "text-green-500",
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      text: "85% Duy trì sử dụng",
      color: "text-blue-500",
    },
    {
      icon: <Users className="w-5 h-5" />,
      text: "6+ khách hàng",
      color: "text-purple-500",
    },
  ];

  return (
    <section
      id="hero"
      className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full animate-pulse-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200/20 rounded-full animate-float-medium"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-green-200/20 rounded-full animate-float-fast"></div>

        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse-slower"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={12}>
            <div
              className={`transform transition-all duration-1000 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              <Badge
                count="Dịch vụ tài chính đơn giản và tiện lợi"
                className="mb-6"
              >
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                  <Star className="w-4 h-4 inline mr-2" />
                  Tư vấn tài chính phù hợp với nhu cầu của bạn
                </div>
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                <span className="block animate-slide-up">Dịch vụ tư vấn</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 animate-gradient-text">
                 Tài chính Cá nhân
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed animate-fade-in-delayed">
                Chúng tôi cung cấp công cụ tài chính đơn giản giúp bạn lập ngân
                sách, tiết kiệm và theo dõi chi tiêu, đồng thời hỗ trợ cá nhân
                hóa để đạt mục tiêu tài chính hiệu quả.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {highlights.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`${item.color}`}>{item.icon}</div>
                    <span className="text-gray-700 font-medium">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="primary"
                  size="large"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-none h-14 px-8 text-lg font-semibold animate-pulse-button"
                  onClick={() => scrollToSection("services")}
                >
                  Khám phá dịch vụ
                  <ArrowRight className="w-5 h-5 ml-2 animate-arrow-move" />
                </Button>
                <Button
                  size="large"
                  className="h-14 px-8 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 animate-border-glow"
                  onClick={() => scrollToSection("pricing")}
                >
                  Xem bảng giá
                </Button>
              </div>
            </div>
          </Col>

          <Col xs={24} lg={12}>
            <div
              className={`transform transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
            >
              <div className="relative">
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 animate-float-gentle">
                  <img
                    src="/services.jpg"
                    alt="Financial Services"
                    className="w-full h-80 object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default ServiceHero;
