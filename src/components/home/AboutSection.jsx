"use client"

import { Row, Col, Timeline } from "antd"
import { Award } from "lucide-react"
import { timelineData } from "../../data/timelineData"


const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <Row gutter={[48, 48]} align="middle">
          {/* Image */}
          <Col xs={24} lg={12}>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="About us"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-xl">
                <Award className="w-8 h-8" />
              </div>
            </div>
          </Col>

          {/* Content */}
          <Col xs={24} lg={12}>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Về Uni Finance</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Với hơn 15 năm kinh nghiệm trong lĩnh vực tư vấn tài chính, chúng tôi đã đồng hành cùng hàng nghìn khách
              hàng xây dựng và phát triển tài sản một cách bền vững.
            </p>
            <Timeline items={timelineData} />
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default AboutSection
