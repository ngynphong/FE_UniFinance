"use client"

import { Row, Col, Card, Timeline } from "antd"
import { processSteps } from "../../../data/processSteps"


const ServiceProcess = () => {
  return (
    <section id="process" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Quy trình làm việc</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Quy trình tư vấn chuyên nghiệp và minh bạch, đảm bảo hiệu quả tối ưu cho khách hàng
          </p>
        </div>

        <Row gutter={[32, 32]}>
          {/* Timeline */}
          <Col xs={24} lg={12}>
            <Card className="h-full border-0 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Các bước thực hiện</h3>
              <Timeline
                items={processSteps.map((step, index) => ({
                  dot: (
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                  ),
                  children: (
                    <div className="pb-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h4>
                      <p className="text-gray-600 mb-3">{step.description}</p>
                      <div className="text-sm text-blue-600 font-medium">Thời gian: {step.duration}</div>
                    </div>
                  ),
                }))}
              />
            </Card>
          </Col>

          {/* Process Benefits */}
          <Col xs={24} lg={12}>
            <div className="space-y-6">
              {/* Cam kết chất lượng */}
              <Card className="border-0 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Cam kết chất lượng</h3>
                <div className="space-y-4">
                  {/* Các cam kết */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Minh bạch 100%</h4>
                      <p className="text-gray-600 text-sm">Mọi thông tin và chi phí được công khai rõ ràng</p>
                    </div>
                  </div>

                  {/* Thêm các cam kết khác tương tự */}
                </div>
              </Card>

              {/* CTA Card */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Bắt đầu ngay hôm nay</h3>
                  <p className="text-gray-600 mb-6">
                    Liên hệ với chúng tôi để được tư vấn miễn phí và bắt đầu hành trình tài chính của bạn
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">15 phút</div>
                      <div className="text-sm text-gray-500">Tư vấn miễn phí</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">24h</div>
                      <div className="text-sm text-gray-500">Phản hồi nhanh</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">100%</div>
                      <div className="text-sm text-gray-500">Hài lòng</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default ServiceProcess