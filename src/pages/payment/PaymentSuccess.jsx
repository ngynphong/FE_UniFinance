import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
    const navigate = useNavigate();
    return (
        <Result
            status="success"
            title="Thanh toán thành công!"
            subTitle="Cảm ơn bạn đã nâng cấp dịch vụ. Giao dịch của bạn đã được xác nhận."
            extra={[
                <Button type="primary" onClick={() => navigate("/")}>Về trang chủ</Button>,
                <Button onClick={() => navigate("/")}>Xem các gói dịch vụ</Button>
            ]}
        />
    );
};

export default PaymentSuccess; 