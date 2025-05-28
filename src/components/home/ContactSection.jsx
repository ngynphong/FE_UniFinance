"use client"

import { Row, Col, Card, Form, Input, Select, Button, message } from "antd"
import { Phone, Mail, MapPin } from "lucide-react"

const { Option } = Select
const { TextArea } = Input

const ContactSection = () => {
  const onFinish = (values) => {
    message.success("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong 24h.")
    console.log("Form values:", values)
  }

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-blue-600" />,
      title: "Điện thoại",
      content: "+84 123 456 789",
      bgColor: "bg-blue-100",
    },
    {
      icon: <Mail className="w-6 h-6 text-green-600" />,
      title: "Email",
      content: "info@financeconsult.vn",
      bgColor: "bg-green-100",
    },
    {
      icon: <MapPin className="w-6 h-6 text-purple-600" />,
      title: "Địa chỉ",
      content: "123 Đường ABC, Quận 1, TP.HCM",
      bgColor: "bg-purple-100",
    },
  ]

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Liên hệ với chúng tôi</h2>
          <p className="text-xl text-gray-600">Sẵn sàng tư vấn miễn phí cho bạn</p>
        </div>

        <Row gutter={[48, 48]}>
          {/* Contact Information */}
          <Col xs={24} lg={12}>
            <Card className="h-full border-0 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Thông tin liên hệ</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`p-3 ${info.bgColor} rounded-full`}>{info.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{info.title}</h4>
                      <p className="text-gray-600">{info.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          {/* Contact Form */}
          <Col xs={24} lg={12}>
            <Card className="h-full border-0 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Gửi tin nhắn</h3>
              <Form layout="vertical" onFinish={onFinish}>
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Họ và tên"
                      name="name"
                      rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
                    >
                      <Input size="large" placeholder="Nhập họ và tên" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: "Vui lòng nhập email!" },
                        { type: "email", message: "Email không hợp lệ!" },
                      ]}
                    >
                      <Input size="large" placeholder="Nhập email" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  label="Dịch vụ quan tâm"
                  name="service"
                  rules={[{ required: true, message: "Vui lòng chọn dịch vụ!" }]}
                >
                  <Select size="large" placeholder="Chọn dịch vụ">
                    <Option value="investment">Tư vấn đầu tư</Option>
                    <Option value="insurance">Bảo hiểm tài chính</Option>
                    <Option value="planning">Lập kế hoạch tài chính</Option>
                    <Option value="tax">Tư vấn thuế</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Tin nhắn"
                  name="message"
                  rules={[{ required: true, message: "Vui lòng nhập tin nhắn!" }]}
                >
                  <TextArea rows={4} placeholder="Nhập tin nhắn của bạn" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Gửi tin nhắn
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default ContactSection
