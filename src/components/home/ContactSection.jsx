"use client";
import { useState } from "react";
import { Row, Col, Card, Form, Input, Button, message } from "antd";
import { Phone, Mail, MapPin } from "lucide-react";
import { contactService } from "../../services/contactService/";

const { TextArea } = Input;

const ContactSection = () => {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    setDisabled(true);
    try {
      // Gọi API tạo contact
      const response = await contactService.createContact({
        Name: values.name,
        Email: values.email,
        Issue: values.issue,
        Message: values.message,
        DateSent: new Date().toISOString(),
      });

      message.success(
        "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong 24h."
      );
      console.log("Contact created:", response);
    } catch (error) {
      message.error(error.message || "Đã có lỗi xảy ra, vui lòng thử lại!");
      console.log("Error creating contact:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setDisabled(false);
      }, 5000);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-blue-600" />,
      title: "Điện thoại",
      content: "+84 854 494 415",
      bgColor: "bg-blue-100",
    },
    {
      icon: <Mail className="w-6 h-6 text-green-600" />,
      title: "Email",
      content: "kietlgse172490@fpt.edu.vn",
      bgColor: "bg-green-100",
    },
    {
      icon: <MapPin className="w-6 h-6 text-purple-600" />,
      title: "Địa chỉ",
      content: "123 Đường ABC, Quận 1, TP.HCM",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Liên hệ với chúng tôi
          </h2>
          <p className="text-xl text-gray-600">
            Sẵn sàng tư vấn miễn phí cho bạn
          </p>
        </div>

        <Row gutter={[48, 48]}>
          {/* Contact Information */}
          <Col xs={24} lg={12}>
            <Card className="h-full border-0 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Thông tin liên hệ
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`p-3 ${info.bgColor} rounded-full`}>
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {info.title}
                      </h4>
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
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Gửi tin nhắn
              </h3>
              <Form layout="vertical" onFinish={onFinish}>
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Họ và tên"
                      name="name"
                      rules={[
                        { required: true, message: "Vui lòng nhập họ tên!" },
                      ]}
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
                  label="Vấn đề"
                  name="issue"
                  rules={[{ required: true, message: "Vui lòng nhập vấn đề!" }]}
                >
                  <TextArea
                    rows={4}
                    placeholder="Nhập vấn đề bạn đang gặp phải"
                  />
                </Form.Item>

                <Form.Item
                  label="Mô tả chi tiết"
                  name="message"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mô tả chi tiết!",
                    },
                  ]}
                >
                  <TextArea
                    rows={4}
                    placeholder="Mô tả chi tiết vấn đề hoặc yêu cầu của bạn. Ví dụ: 'Tôi đã thử đổi mật khẩu nhưng không thể đăng nhập.'"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={loading}
                    disabled={disabled}
                    className={`w-full ${
                      disabled
                        ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
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
  );
};

export default ContactSection;
