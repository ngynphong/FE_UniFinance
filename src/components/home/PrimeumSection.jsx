"use client";

import { Row, Col, Card, Button, Badge, message } from "antd";
import {
  Crown,
  Star,
  CheckCircle,
  ArrowRight,
  Zap,
  Users,
  TrendingUp,
  Phone,
  Clock,
  Award,
  Shield,
} from "lucide-react";
import { useEffect, useState } from "react";
import packageService from "../../services/packageService";
import { useAuth } from "../../components/auth/useAuthHook";
import { useNavigate } from "react-router-dom";

const PremiumSection = () => {
  const [packages, setPackages] = useState([]);
  const [currentPkg, setCurrentPkg] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const rank = { Free: 0, Plus: 1, Premium: 2 };

  useEffect(() => {
    if (!user) {
      setCurrentPkg(null);
      return;
    }

    const fetchUserPkg = async () => {
      try {
        const data = await packageService.getUserPackage(user.userID);

        // Lọc các record còn hiệu lực (status=2 & chưa hết hạn)
        const valid = data.filter(
          (up) =>
            up.userPackageStatusId === 2 &&
            (!up.expiredAt || new Date(up.expiredAt) > new Date())
        );

        // Lấy record mới nhất theo renewedAt/createdAt
        valid.sort(
          (a, b) =>
            new Date(b.renewedAt || b.createdAt) -
            new Date(a.renewedAt || a.createdAt)
        );

        const activeName =
          valid[0]?.package?.name ?? // Package.Name
          valid[0]?.packageName ?? // tuỳ DTO
          "Free";

        setCurrentPkg(activeName);
      } catch {
        setCurrentPkg("Free");
      }
    };

    fetchUserPkg();
  }, [user]);

  const premiumFeatures = [
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: "Bảo vệ toàn diện",
      description: "Bảo hiểm và quản lý rủi ro chuyên sâu",
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      title: "Tăng trưởng tối ưu",
      description: "Chiến lược đầu tư cá nhân hóa",
    },
    {
      icon: <Users className="w-6 h-6 text-purple-600" />,
      title: "Chuyên gia riêng",
      description: "Đội ngũ tư vấn viên chuyên biệt",
    },
    {
      icon: <Phone className="w-6 h-6 text-orange-600" />,
      title: "Hỗ trợ 24/7",
      description: "Tư vấn khẩn cấp mọi lúc",
    },
  ];

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await packageService.getPackage();
        setPackages(data);
      } catch {
        setPackages([]);
      }
    };
    fetchPackages();
  }, []);

  const handlePayment = async (pkg) => {
    try {
      const res = await packageService.paymentPackage(pkg.id, user.userID);

      // Backend trả link cổng thanh toán
      if (res?.checkoutUrl) {
        window.location.href = res.checkoutUrl;
        return;
      }

      // Trường hợp thanh toán instant
      message.success(`Thanh toán gói ${pkg.name} thành công!`);
    } catch {
      message.error("Thanh toán thất bại. Vui lòng thử lại.");
    }
  };

  const premiumPkg = packages.find((p) => p.name === "Premium");

  const onPremiumCTAClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (currentPkg === "Premium") {
      message.info("Bạn đang ở gói Premium."); 
      return;
    }

    handlePayment(premiumPkg);
  };


  const onConsultClick = () => {
  if (!user) {
    navigate("/login");            
  } else {
    navigate("/dashboard/booking");
  }
};

  return (
    <section
      id="premium"
      className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-12 h-12 text-yellow-400 mr-3" />
            <Badge
              count="VIP"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-0 ">
                Gói Premium
              </h2>
            </Badge>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Trải nghiệm dịch vụ tư vấn tài chính đẳng cấp với những ưu đãi độc
            quyền
          </p>
        </div>

        {/* Premium Features */}
        <div className="mb-16">
          <Row gutter={[32, 32]}>
            {premiumFeatures.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <div className="h-full text-center p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-white/20 rounded-full">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Premium Packages */}
        <Row gutter={[32, 32]} className="mb-16">
          {packages.map((pkg) => {
            let icon, iconBg, cardBg, priceColor;
            if (pkg.name === "Free") {
              icon = <Star className="w-10 h-10 text-blue-400" />;
              iconBg = "bg-blue-50";
              cardBg = "bg-blue-100 border-blue-200";
              priceColor = "text-blue-600";
            } else if (pkg.name === "Plus") {
              icon = <TrendingUp className="w-10 h-10 text-purple-500" />;
              iconBg = "bg-purple-50";
              cardBg = "bg-purple-100 border-purple-200";
              priceColor = "text-purple-600";
            } else if (pkg.name === "Premium") {
              icon = <Crown className="w-10 h-10 text-yellow-400" />;
              iconBg = "bg-yellow-50";
              cardBg =
                "bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-300";
              priceColor = "text-yellow-600";
            }

            /* ---------- XÁC ĐỊNH TRẠNG THÁI GÓI ---------------------- */
            const isLoggedIn = !!user;
            const isCurrentPkg = isLoggedIn && currentPkg === pkg.name;
            const isDowngrade =
              isLoggedIn && currentPkg && rank[pkg.name] < rank[currentPkg];

            /* ----- Nhãn nút ----------------------------------------- */
            let buttonLabel;
            if (!isLoggedIn) {
              buttonLabel =
                pkg.name === "Premium"
                  ? "Chọn gói Premium"
                  : pkg.name === "Plus"
                  ? "Chọn gói Plus"
                  : "Đăng ký Free";
            } else if (isCurrentPkg) {
              buttonLabel = `Bạn đang ở gói ${pkg.name}`;
            } else if (isDowngrade) {
              buttonLabel = "Không khả dụng";
            } else {
              // Nâng cấp
              buttonLabel =
                pkg.name === "Premium"
                  ? "Nâng cấp lên Premium"
                  : pkg.name === "Plus"
                  ? "Nâng cấp lên Plus"
                  : "Đăng ký Free";
            }
            /* ----- Xử lý click -------------------------------------- */
            const onPackageClick = () => {
              if (!isLoggedIn) {
                navigate("/login");
                return;
              }
              if (isCurrentPkg || isDowngrade) return;
              handlePayment(pkg);
            };

            return (
              <Col xs={24} lg={8} key={pkg.id}>
                <Card
                  className={`h-full border-2 relative overflow-hidden ${cardBg}`}
                  bodyStyle={{ padding: "2rem" }}
                >
                  <div className="flex justify-center mb-4">
                    <div className={`rounded-full p-4 shadow ${iconBg}`}>
                      {icon}
                    </div>
                  </div>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {pkg.name}
                    </h3>
                    <div className="mb-2">
                      <span className={`text-4xl font-bold ${priceColor}`}>
                        {pkg.price === 0
                          ? "Miễn phí"
                          : pkg.price.toLocaleString("vi-VN") + "đ"}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2">{pkg.description}</p>
                  </div>
                  <div className="space-y-3 mb-8">
                    {pkg.features &&
                      pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                  </div>
                  <Button
                    type={pkg.name === "Premium" ? "primary" : "default"}
                    size="large"
                    disabled={isCurrentPkg || isDowngrade}
                    className={`w-full h-12 font-semibold flex items-center justify-center
    ${
      pkg.name === "Premium"
        ? "bg-gradient-to-r from-yellow-400 to-orange-500 border-none hover:from-yellow-500 hover:to-orange-600"
        : "border-blue-600 text-blue-600 hover:bg-blue-50"
    }
    ${isCurrentPkg || isDowngrade ? "cursor-default" : ""}`}
                    onClick={onPackageClick}
                  >
                    {buttonLabel}
                    {!isCurrentPkg && !isDowngrade && (
                      <ArrowRight className="w-4 h-4 ml-2" />
                    )}
                  </Button>
                </Card>
              </Col>
            );
          })}
        </Row>

        {/* Premium Benefits */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <h3 className="text-3xl font-bold text-white mb-6">
                Tại sao chọn gói Premium?
              </h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <Clock className="w-6 h-6 text-blue-400 mr-3" />
                  <span>Tiết kiệm thời gian với quy trình tối ưu</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <TrendingUp className="w-6 h-6 text-green-400 mr-3" />
                  <span>Tăng lợi nhuận đầu tư lên đến 35%</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Shield className="w-6 h-6 text-purple-400 mr-3" />
                  <span>Bảo vệ tài sản với chiến lược toàn diện</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Users className="w-6 h-6 text-orange-400 mr-3" />
                  <span>Đội ngũ chuyên gia hàng đầu Việt Nam</span>
                </div>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className="relative flex justify-center">
                <img
                  src="/best-choice.jpg"
                  alt="Premium Benefits"
                  className="rounded-2xl shadow-2xl w-2/3  /* hoặc max-w-md */"
                  style={{ width: "60%", height: "auto" }}
                />
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-full">
                  <Crown className="w-8 h-8" />
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-white mb-4">
            Sẵn sàng nâng cấp trải nghiệm tài chính của bạn?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Liên hệ ngay để được tư vấn miễn phí và nhận ưu đãi đặc biệt cho
            khách hàng mới
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              type="primary"
              size="large"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 border-none hover:from-yellow-500 hover:to-orange-600 h-12 px-8 text-lg font-semibold flex items-center justify-center"
              onClick={onPremiumCTAClick}
            >
              Đăng ký Premium ngay
              <Crown className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="large"
              className="h-12 px-8 text-lg bg-transparent border-2 border-orange-300 text-orange-500 
             hover:bg-orange-200 hover:text-orange-700 hover:border-orange-400 
             flex items-center justify-center"
              onClick={onConsultClick}
            >
              Tư vấn miễn phí
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumSection;
