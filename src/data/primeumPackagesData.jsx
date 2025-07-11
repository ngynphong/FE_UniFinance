import { Crown, Star, Zap } from "lucide-react"

export const premiumPackagesData = [
  {
    name: "Premium Basic",
    price: "2.999.000đ",
    period: "/tháng",
    originalPrice: "3.999.000đ",
    description: "Dành cho cá nhân muốn tối ưu tài chính",
    icon: <Star className="w-8 h-8 text-blue-600" />,
    iconBg: "bg-blue-100",
    popular: false,
    features: [
      "Tư vấn đầu tư cá nhân hóa",
      "Phân tích danh mục đầu tư",
      "Báo cáo thị trường hàng tuần",
      "Hỗ trợ qua email 24/7",
      "Kế hoạch tiết kiệm cá nhân",
      "Tư vấn bảo hiểm cơ bản",
    ],
    bonus: ["Miễn phí tháng đầu tiên", "E-book đầu tư cho người mới"],
  },
  {
    name: "Premium Pro",
    price: "4.999.000đ",
    period: "/tháng",
    originalPrice: "6.999.000đ",
    description: "Giải pháp toàn diện cho gia đình",
    icon: <Crown className="w-8 h-8 text-yellow-600" />,
    iconBg: "bg-yellow-100",
    popular: true,
    features: [
      "Tất cả tính năng Premium Basic",
      "Chuyên gia tư vấn riêng",
      "Cuộc gọi tư vấn không giới hạn",
      "Phân tích rủi ro chuyên sâu",
      "Kế hoạch tài chính gia đình",
      "Tư vấn thuế và pháp lý",
      "Báo cáo đầu tư hàng tháng",
      "Ưu tiên hỗ trợ khẩn cấp",
    ],
    bonus: ["Tặng 2 tháng khi đăng ký năm", "Khóa học đầu tư miễn phí", "Tham gia sự kiện VIP"],
  },
  {
    name: "Premium Elite",
    price: "9.999.000đ",
    period: "/tháng",
    originalPrice: "12.999.000đ",
    description: "Dành cho doanh nghiệp và nhà đầu tư lớn",
    icon: <Zap className="w-8 h-8 text-purple-600" />,
    iconBg: "bg-purple-100",
    popular: false,
    features: [
      "Tất cả tính năng Premium Pro",
      "Đội ngũ chuyên gia chuyên biệt",
      "Tư vấn đầu tư quốc tế",
      "Quản lý danh mục chuyên nghiệp",
      "Phân tích thị trường real-time",
      "Tư vấn M&A và IPO",
      "Dịch vụ private banking",
      "Hỗ trợ 24/7 với hotline riêng",
    ],
    bonus: [
      "Tặng 3 tháng khi đăng ký năm",
      "Tư vấn chiến lược miễn phí",
      "Quyền truy cập nghiên cứu độc quyền",
      "Sự kiện networking cao cấp",
    ],
  },
]
