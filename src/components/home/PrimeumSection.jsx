"use client";

import { Row, Col, Card, Button, Badge } from "antd";
import {
  Crown,
  Star,
  CheckCircle,
  ArrowRight,
  Zap,
  Users,
  TrendingUp,
  Phone,
  Clock,
  Award,
  Shield,
} from "lucide-react";
import { premiumPackagesData } from "../../data/primeumPackagesData";

const PremiumSection = ({ scrollToSection }) => {
  const premiumFeatures = [
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: "Bảo vệ toàn diện",
      description: "Bảo hiểm và quản lý rủi ro chuyên sâu",
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      title: "Tăng trưởng tối ưu",
      description: "Chiến lược đầu tư cá nhân hóa",
    },
    {
      icon: <Users className="w-6 h-6 text-purple-600" />,
      title: "Chuyên gia riêng",
      description: "Đội ngũ tư vấn viên chuyên biệt",
    },
    {
      icon: <Phone className="w-6 h-6 text-orange-600" />,
      title: "Hỗ trợ 24/7",
      description: "Tư vấn khẩn cấp mọi lúc",
    },
  ];

  return (
    <section
      id="premium"
      className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-12 h-12 text-yellow-400 mr-3" />
            <Badge
              count="VIP"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-0 ">
                Gói Premium
              </h2>
            </Badge>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Trải nghiệm dịch vụ tư vấn tài chính đẳng cấp với những ưu đãi độc
            quyền
          </p>
        </div>

        {/* Premium Features */}
        <div className="mb-16">
          <Row gutter={[32, 32]}>
            {premiumFeatures.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <div className="h-full text-center p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-white/20 rounded-full">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Premium Packages */}
        <Row gutter={[32, 32]} className="mb-16">
          {premiumPackagesData.map((pkg, index) => (
            <Col xs={24} lg={8} key={index}>
              <Card
                className={`h-full border-0 relative overflow-hidden ${
                  pkg.popular
                    ? "bg-gradient-to-br from-yellow-50 to-orange-50 ring-2 ring-yellow-400 transform scale-105"
                    : "bg-white"
                }`}
                bodyStyle={{ padding: "2rem" }}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Phổ biến nhất
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${pkg.iconBg}`}
                  >
                    {pkg.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {pkg.name}
                  </h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-blue-600">
                      {pkg.price}
                    </span>
                    <span className="text-gray-500 ml-1">{pkg.period}</span>
                  </div>
                  {pkg.originalPrice && (
                    <div className="text-gray-400 line-through text-lg">
                      {pkg.originalPrice}
                    </div>
                  )}
                  <p className="text-gray-600 mt-2">{pkg.description}</p>
                </div>

                <div className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {pkg.bonus && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-6 border border-blue-200">
                    <div className="flex items-center mb-2">
                      <Award className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="font-semibold text-blue-800">
                        Ưu đãi đặc biệt
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {pkg.bonus.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-blue-700 flex items-center"
                        >
                          <Zap className="w-3 h-3 mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button
                  type={pkg.popular ? "primary" : "default"}
                  size="large"
                  className={`w-full h-12 font-semibold flex items-center justify-center ${
                    pkg.popular
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500 border-none hover:from-yellow-500 hover:to-orange-600"
                      : "border-blue-600 text-blue-600 hover:bg-blue-50"
                  }`}
                  onClick={() => scrollToSection("contact")}
                >
                  {pkg.popular ? "Chọn gói Premium" : "Tìm hiểu thêm"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Premium Benefits */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <h3 className="text-3xl font-bold text-white mb-6">
                Tại sao chọn gói Premium?
              </h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <Clock className="w-6 h-6 text-blue-400 mr-3" />
                  <span>Tiết kiệm thời gian với quy trình tối ưu</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <TrendingUp className="w-6 h-6 text-green-400 mr-3" />
                  <span>Tăng lợi nhuận đầu tư lên đến 35%</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Shield className="w-6 h-6 text-purple-400 mr-3" />
                  <span>Bảo vệ tài sản với chiến lược toàn diện</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Users className="w-6 h-6 text-orange-400 mr-3" />
                  <span>Đội ngũ chuyên gia hàng đầu Việt Nam</span>
                </div>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className="relative">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Premium Benefits"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-full">
                  <Crown className="w-8 h-8" />
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-white mb-4">
            Sẵn sàng nâng cấp trải nghiệm tài chính của bạn?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Liên hệ ngay để được tư vấn miễn phí và nhận ưu đãi đặc biệt cho
            khách hàng mới
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              type="primary"
              size="large"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 border-none hover:from-yellow-500 hover:to-orange-600 h-12 px-8 text-lg font-semibold flex items-center justify-center"
              onClick={() => scrollToSection("contact")}
            >
              Đăng ký Premium ngay
              <Crown className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="large"
              className="h-12 px-8 text-lg bg-transparent border-2 border-orange-300 text-orange-500 
             hover:bg-orange-200 hover:text-orange-700 hover:border-orange-400 
             flex items-center justify-center"
              onClick={() => scrollToSection("contact")}
            >
              Tư vấn miễn phí
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumSection;
