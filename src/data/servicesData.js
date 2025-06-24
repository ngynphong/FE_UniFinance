import { TrendingUp, Shield, PieChart, Calculator } from "lucide-react"

export const servicesData = [
  {
    icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
    title: "Tư vấn tài chính trực tuyến",
    description: "Dịch vụ chat tư vấn online: Bạn có thể làm nổi bật dịch vụ tư vấn trực tuyến mà bạn cung cấp, bao gồm cả tư vấn qua AI và chat trực tiếp.",
    features: ["Tư vấn tài chính trực tuyến 24/7", "Chat với chuyên gia AI", "Quản lý rủi ro"],
  },
  {
    icon: <Shield className="w-8 h-8 text-green-600" />,
    title: "Công cụ quản lý ngân sách",
    description: " Bạn có thể tạo ra dịch vụ hỗ trợ người dùng lập và theo dõi ngân sách cá nhân thông qua các công cụ quản lý chi tiêu",
    features: [" Quản lý ngân sách cá nhân", "Giúp bạn theo dõi ngân sách","Chi tiêu hàng tháng"],
  },
  {
    icon: <PieChart className="w-8 h-8 text-purple-600" />,
    title: " Công cụ quản lý nợ",
    description: " Dịch vụ này giúp người dùng theo dõi và quản lý các khoản nợ của mình, đồng thời cung cấp các giải pháp để trả nợ hiệu quả.",
    features: [ " Quản lý nợ cá nhân hiệu quả","Công cụ theo dõi ", "quản lý nợ cá nhân" ],
  },
  {
    icon: <Calculator className="w-8 h-8 text-orange-600" />,
    title: "Tạo mục tiêu tài chính",
    description: "Người dùng có thể thiết lập các mục tiêu tài chính dài hạn như tiết kiệm mua nhà, du lịch, ...",
    features: ["Theo dõi mục tiêu tài chính ", "Xây dựng mục tiêu tài chính"],
  },
]
