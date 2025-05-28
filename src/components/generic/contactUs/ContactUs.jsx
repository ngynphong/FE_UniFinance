import { Input, Button } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

function ContactUs() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col md:flex-row items-center justify-center px-4 py-16 gap-8 md:gap-12">
      {/* LEFT: Thông tin liên hệ */}
      <div className="w-full md:w-[45%] ml-auto">
        <h1 className="text-5xl font-bold text-gray-800 mb-10">
          Chúng tôi luôn sẵn sàng hỗ trợ bạn!
        </h1>
        <div className="space-y-8 text-gray-700 text-lg">
          <div className="flex items-start">
            <MailOutlined className="text-blue-500 text-3xl mr-4 mt-1" />
            <div>
              <h2 className="font-semibold">Email</h2>
              <p>[email@example.com]</p>
            </div>
          </div>
          <div className="flex items-start">
            <PhoneOutlined className="text-blue-500 text-3xl mr-4 mt-1" />
            <div>
              <h2 className="font-semibold">Số điện thoại</h2>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="flex items-start">
            <EnvironmentOutlined className="text-blue-500 text-3xl mr-4 mt-1" />
            <div>
              <h2 className="font-semibold">Địa chỉ</h2>
              <p>
                1234 College Ave, Suite 100
                <br />
                Los Angeles, Hoa Kỳ
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Biểu mẫu liên hệ */}
      <div className="w-full md:w-[45%] bg-white p-10 rounded-2xl shadow-lg">
        <form>
          <div className="mb-5">
            <label htmlFor="name" className="block text-gray-700 text-lg mb-1">
              Họ và tên
            </label>
            <Input id="name" size="large" placeholder="Nhập họ tên của bạn" />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 text-lg mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              size="large"
              placeholder="ban@example.com"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-gray-700 text-lg mb-1"
            >
              Tin nhắn
            </label>
            <TextArea
              id="message"
              size="large"
              autoSize={{ minRows: 5, maxRows: 6 }}
              placeholder="Viết nội dung tin nhắn của bạn..."
            />
          </div>
          <div className="flex justify-center">
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className="w-1/2 text-base"
            >
              Gửi tin nhắn
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
