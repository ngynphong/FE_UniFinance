import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const PaymentCancelled = () => {
    const navigate = useNavigate();
    return (
        <Result
            status="warning"
            title="Bạn đã hủy thanh toán"
            subTitle="Giao dịch của bạn chưa được hoàn tất. Nếu cần hỗ trợ, vui lòng liên hệ bộ phận CSKH."
            extra={[
                <Button type="primary" onClick={() => navigate("/")}>Về trang chủ</Button>,
                <Button onClick={() => navigate("/")}>Chọn lại gói</Button>
            ]}
        />
    );
};

export default PaymentCancelled;