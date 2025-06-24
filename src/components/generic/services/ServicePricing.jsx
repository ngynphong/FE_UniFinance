"use client"

import { Row, Col, Card, Button, Badge, Switch } from "antd"
import { useState } from "react"
import { CheckCircle, Crown, Star, Zap } from 'lucide-react'
import { servicePricingData } from "../../../data/servicePricingData"


const ServicePricing = ({ scrollToSection }) => {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Bảng giá dịch vụ</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Chọn gói dịch vụ phù hợp với nhu cầu và ngân sách của bạn
          </p>

          {/* Pricing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`font-medium ${!isYearly ? "text-blue-600" : "text-gray-500"}`}>
              Thanh toán hàng tháng
            </span>
            <Switch checked={isYearly} onChange={setIsYearly} className="bg-gray-300" />
            <span className={`font-medium ${isYearly ? "text-blue-600" : "text-gray-500"}`}>Thanh toán hàng năm</span>
            <Badge count="Tiết kiệm 20%" className="bg-green-500">
              <span></span>
            </Badge>
          </div>
        </div>

        {/* Pricing Cards */}
        <Row gutter={[32, 32]} className="mb-16">
          {servicePricingData.map((plan, index) => (
            <Col xs={24} lg={8} key={index}>
              <Card
                className={`h-full border-0 relative overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                  plan.popular
                    ? "ring-2 ring-blue-500 transform scale-105 bg-gradient-to-br from-blue-50 to-purple-50"
                    : "shadow-lg hover:shadow-xl"
                }`}
                bodyStyle={{ padding: "2rem" }}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Phổ biến nhất
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${plan.iconBg}`}
                  >
                    {plan.icon}
                  </div>
                  
                  {/* Plan name */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                  
                  {/* Price */}
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-blue-600">
                      {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-gray-500 ml-1">{isYearly ? "/năm" : "/tháng"}</span>
                  </div>
                  
                  {/* Discount */}
                  {isYearly && plan.yearlyDiscount && (
                    <div className="text-green-600 text-sm font-medium">Tiết kiệm {plan.yearlyDiscount}</div>
                  )}
                  
                  {/* Description */}
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  type={plan.popular ? "primary" : "default"}
                  size="large"
                  className={`w-full h-12 font-semibold ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 border-none hover:from-blue-600 hover:to-purple-600"
                      : "border-blue-600 text-blue-600 hover:bg-blue-50"
                  }`}
                  onClick={() => scrollToSection("contact")}
                >
                  {plan.popular ? "Chọn gói này" : "Tìm hiểu thêm"}
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}

export default ServicePricing