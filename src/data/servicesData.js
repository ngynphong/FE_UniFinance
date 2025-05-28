import { TrendingUp, Shield, PieChart, Calculator } from "lucide-react"

export const servicesData = [
  {
    icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
    title: "Tư vấn đầu tư",
    description: "Chiến lược đầu tư thông minh, tối ưu hóa lợi nhuận và giảm thiểu rủi ro",
    features: ["Phân tích thị trường", "Đa dạng hóa danh mục", "Quản lý rủi ro"],
  },
  {
    icon: <Shield className="w-8 h-8 text-green-600" />,
    title: "Bảo hiểm tài chính",
    description: "Bảo vệ tài sản và gia đình với các gói bảo hiểm phù hợp",
    features: ["Bảo hiểm nhân thọ", "Bảo hiểm tài sản", "Bảo hiểm sức khỏe"],
  },
  {
    icon: <PieChart className="w-8 h-8 text-purple-600" />,
    title: "Lập kế hoạch tài chính",
    description: "Xây dựng kế hoạch tài chính cá nhân và doanh nghiệp",
    features: ["Ngân sách cá nhân", "Tiết kiệm hưu trí", "Quỹ giáo dục"],
  },
  {
    icon: <Calculator className="w-8 h-8 text-orange-600" />,
    title: "Tư vấn thuế",
    description: "Tối ưu hóa nghĩa vụ thuế và tuân thủ quy định pháp luật",
    features: ["Khai báo thuế", "Hoạch định thuế", "Tuân thủ pháp luật"],
  },
]
