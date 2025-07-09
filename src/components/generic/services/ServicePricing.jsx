"use client";

import { Row, Col, Card, Button, message } from "antd";
import { CheckCircle, Star, Crown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import packageService from "../../../services/packageService";
import { useAuth } from "../../../components/auth/useAuthHook";
import { useNavigate } from "react-router-dom";

const rank = { Free: 0, Plus: 1, Premium: 2 };

const ServicePricing = () => {
  const [packages, setPackages] = useState([]);
  const [currentPkg, setCurrentPkg] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  /* ─────────────────── Lấy danh sách gói ─────────────────── */
  useEffect(() => {
    packageService.getPackage().then(setPackages).catch(() => setPackages([]));
  }, []);

  /* ────────────── Lấy gói hiện tại (nếu login) ────────────── */
  /* ────────────── Lấy gói hiện tại (nếu login) ────────────── */
useEffect(() => {
  if (!user) {
    setCurrentPkg(null);
    return;
  }

  (async () => {
    try {
      const data = await packageService.getUserPackage(user.userID);

      const active = data
        .filter(
          (up) =>
            up.userPackageStatusId === 2 &&
            (!up.expiredAt || new Date(up.expiredAt) > new Date())
        )
        .sort(
          (a, b) =>
            new Date(b.renewedAt || b.createdAt) -
            new Date(a.renewedAt || a.createdAt)
        )[0];

      /* 👉 ĐỔI 2 DÒNG NÀY */
      const name =
        active?.package?.name ??   // khi backend trả object Package { name: ... }
        active?.packageName ??     // khi backend trả thẳng trường packageName
        null;

      setCurrentPkg(name || "Free");
    } catch {
      setCurrentPkg("Free");
    }
  })();
}, [user]);


  /* ────────────────── Gọi thanh toán ────────────────── */
  const handlePayment = async (pkg) => {
    try {
      const res = await packageService.paymentPackage(pkg.id, user.userID);
      if (res?.checkoutUrl) {
        window.location.href = res.checkoutUrl;
        return;
      }
      message.success(`Thanh toán gói ${pkg.name} thành công!`);
    } catch {
      message.error("Thanh toán thất bại. Vui lòng thử lại.");
    }
  };

  /* ────────────────── Map màu / icon theo gói ─────────────── */
  const styleMap = {
    Free: {
      icon: <Star className="w-8 h-8 text-blue-500" />,
      iconBg: "bg-blue-100",
      cardBg: "shadow-lg",
      priceColor: "text-blue-600",
    },
    Plus: {
      icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
      iconBg: "bg-purple-100",
      cardBg: "shadow-lg",
      priceColor: "text-purple-600",
    },
    Premium: {
      icon: <Crown className="w-8 h-8 text-yellow-500" />,
      iconBg: "bg-yellow-100",
      cardBg: "ring-2 ring-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50",
      priceColor: "text-yellow-600",
    },
  };

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Bảng giá gói dịch vụ
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chọn gói phù hợp với nhu cầu của bạn
          </p>
        </div>

        <Row gutter={[32, 32]}>
          {packages.map((pkg) => {
            const { icon, iconBg, cardBg, priceColor } =
              styleMap[pkg.name] || styleMap.Free;

            const isLoggedIn = !!user;
            const isCurrent = isLoggedIn && currentPkg === pkg.name;
            const isDowngrade =
              isLoggedIn && currentPkg && rank[pkg.name] < rank[currentPkg];

            /* label nút */
            let label = "Đăng ký Free";
            if (!isLoggedIn) {
              label =
                pkg.name === "Premium"
                  ? "Chọn gói Premium"
                  : pkg.name === "Plus"
                  ? "Chọn gói Plus"
                  : "Đăng ký Free";
            } else if (isCurrent) label = `Bạn đang ở gói ${pkg.name}`;
            else if (isDowngrade) label = "Không khả dụng";
            else
              label =
                pkg.name === "Premium"
                  ? "Nâng cấp Premium"
                  : pkg.name === "Plus"
                  ? "Nâng cấp Plus"
                  : "Đăng ký Free";

            const onClick = () => {
              if (!isLoggedIn) {
                navigate("/login");
                return;
              }
              if (isCurrent || isDowngrade) return;
              handlePayment(pkg);
            };

            return (
              <Col xs={24} lg={8} key={pkg.id}>
                <Card
                  className={`h-full relative overflow-hidden transition-all duration-300 hover:shadow-2xl ${cardBg}`}
                  bodyStyle={{ padding: "2rem" }}
                >
                  <div className="text-center mb-6">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${iconBg}`}
                    >
                      {icon}
                    </div>
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
                    {pkg.features?.map((f, idx) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{f}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    type={pkg.name === "Premium" ? "primary" : "default"}
                    size="large"
                    disabled={isCurrent || isDowngrade}
                    className={`w-full h-12 font-semibold ${
                      pkg.name === "Premium"
                        ? "bg-gradient-to-r from-yellow-400 to-orange-500 border-none hover:from-yellow-500 hover:to-orange-600"
                        : "border-blue-600 text-blue-600 hover:bg-blue-50"
                    } ${isCurrent || isDowngrade ? "cursor-default" : ""}`}
                    onClick={onClick}
                  >
                    {label}
                  </Button>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </section>
  );
};

export default ServicePricing;
