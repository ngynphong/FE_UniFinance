import React from "react";
import { Row, Col, Card } from "antd";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../components/layout/user/DashboardLayout";

const DebtManagement = () => {

    const navigate = useNavigate();

    const menuItems = [
        {
            title: "Debt Overview",
            path: "/dashboard/debt-overview",
            icon: "/debt.png",
        },
        {
            title: "Add New Debt",
            path: "/dashboard/add-debt",
            icon: "/borrow.png",
        },
        {
            title: "Repayment Progress",
            path: "/dashboard/repayment-progress",
            icon: "/progress.png",
        },
        {
            title: "Debt Calculator",
            path: "/dashboard/debt-calculator",
            icon: "/caculator.png",
        },
      ];

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-6">Debt Management</h1>
            <Row gutter={[16, 16]}>
                {menuItems.map((item, index) => (
                    <Col xs={24} sm={12} key={index}>
                        <Card
                            hoverable
                            className="h-full"
                            onClick={() => navigate(item.path)}
                        >
                            <div className="flex items-center space-x-4">
                                <img src={item.icon} alt={item.title} className="w-12 h-12" />
                                <div>
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </DashboardLayout>
    );
};

export default DebtManagement;