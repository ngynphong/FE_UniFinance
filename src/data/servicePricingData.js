import { Star, Crown, Zap } from 'lucide-react'

export const servicePricingData = [
  {
    name: "Gói Cơ bản",
    monthlyPrice: "1.999.000đ",
    yearlyPrice: "19.990.000đ",
    yearlyDiscount: "3.998.000đ",
    description: "Phù hợp cho người mới bắt đầu",
    icon: <Star className="w-8 h-8 text-blue-600" />,
    iconBg: "bg-blue-100",
    popular: false,
    features: [
      "Tư vấn tài chính cơ bản",
      "Lập kế hoạch ngân sách",
      "Hỗ trợ qua email",
      "Báo cáo tháng",
      "1 buổi tư vấn/tháng",
    ],
  },
  // Thêm các gói khác...
]