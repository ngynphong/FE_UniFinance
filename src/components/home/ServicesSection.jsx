"use client"

import { Row, Col, Card } from "antd"
import { CheckCircle } from "lucide-react"
import { servicesData } from "../../data/servicesData"


const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Dịch vụ của chúng tôi</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cung cấp giải pháp tài chính toàn diện cho cá nhân và doanh nghiệp
          </p>
        </div>

        {/* Services Grid */}
        <Row gutter={[32, 32]}>
          {servicesData.map((service, index) => (
            <Col xs={24} md={12} lg={6} key={index}>
              <Card
                className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0"
                bodyStyle={{ padding: "2rem" }}
              >
                <div className="text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-gray-50 rounded-full">{service.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center justify-center text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}

export default ServicesSection
