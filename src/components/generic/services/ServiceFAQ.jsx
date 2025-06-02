"use client"

import { Collapse, Card } from "antd"
import { Plus, Minus } from 'lucide-react'
import { faqData } from "../../../data/faqData"


const { Panel } = Collapse

const ServiceFAQ = () => {
  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Câu hỏi thường gặp</h2>
          <p className="text-xl text-gray-600">Tìm hiểu thêm về dịch vụ của chúng tôi qua các câu hỏi phổ biến</p>
        </div>

        {/* FAQ Accordion */}
        <Card className="border-0 shadow-lg">
          <Collapse
            ghost
            expandIcon={({ isActive }) =>
              isActive ? <Minus className="w-5 h-5 text-blue-600" /> : <Plus className="w-5 h-5 text-gray-400" />
            }
            className="bg-transparent"
          >
            {faqData.map((faq, index) => (
              <Panel
                header={
                  <span className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                    {faq.question}
                  </span>
                }
                key={index}
                className="mb-4 bg-gray-50 rounded-lg"
              >
                <div className="text-gray-600 leading-relaxed pl-6">{faq.answer}</div>
              </Panel>
            ))}
          </Collapse>
        </Card>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Vẫn còn thắc mắc?</h3>
            <p className="text-blue-100 mb-6">Đội ngũ chuyên gia của chúng tôi sẵn sàng giải đáp mọi câu hỏi của bạn</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold">📞</div>
                <div className="text-sm">+84 123 456 789</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">✉️</div>
                <div className="text-sm">info@financeconsult.vn</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">💬</div>
                <div className="text-sm">Chat trực tuyến 24/7</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceFAQ