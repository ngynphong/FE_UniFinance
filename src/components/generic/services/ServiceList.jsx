"use client";

import { Row, Col, Button } from "antd";
import { ArrowRight, CheckCircle } from "lucide-react";
import { detailedServicesData } from "../../../data/detailedServicesData";
import { useAuth } from "../../../components/auth/useAuthHook";
import { useNavigate } from "react-router-dom";
const ServiceList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleConsult = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    navigate("/dashboard/booking");
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Dịch vụ chi tiết
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Khám phá dịch vụ tư vấn tài chính cá nhân, được thiết kế riêng cho
            nhu cầu của bạn
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-16">
          {detailedServicesData.map((service, index) => (
            <div key={index} className="relative">
              <Row gutter={[48, 48]} align="middle">
                {/* Image Column - Alternating layout */}
                <Col xs={24} lg={12} order={index % 2 === 0 ? 1 : 2}>
                  <div className="relative">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-80 object-cover rounded-2xl shadow-lg"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                    {/* Category badge */}
                    <div className="absolute bottom-6 left-6 text-white">
                      <div className="flex items-center space-x-2 mb-2">
                        {service.icon}
                        <span className="text-sm font-medium">
                          {service.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>

                {/* Content Column */}
                <Col xs={24} lg={12} order={index % 2 === 0 ? 2 : 1}>
                  <div className="space-y-6">
                    {/* Title and description */}
                    <div>
                      <h3 className="text-3xl font-bold text-gray-800 mb-4">
                        {service.title}
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Benefits */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
                      <h4 className="font-semibold text-gray-800 mb-3">
                        Lợi ích chính:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.benefits.map((benefit, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-2"
                          >
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm text-gray-700">
                              {benefit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {service.price}
                        </div>
                        <div className="text-sm text-gray-500">
                          {service.priceNote}
                        </div>
                      </div>
                      <Button
                        type="primary"
                        size="large"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={handleConsult}
                      >
                        Đặt lịch tư vấn
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>

              {/* Divider */}
              {index < detailedServicesData.length - 1 && (
                <div className="mt-16 flex justify-center">
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceList;
