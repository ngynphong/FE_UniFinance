import React, { useState } from 'react';
import { Form, Input, Button, Card, Statistic, DatePicker } from 'antd';
import { calculateLoanPayment } from '../../components/utils/Caculations';
import DashboardLayout from '../layout/user/DashboardLayout';

const DebtCalculator = () => {
    const [results, setResults] = useState(null);

    const onFinish = (values) => {
        const principal = parseFloat(values.loanAmount);
        const rate = parseFloat(values.interestRate) / 100 / 12; // Monthly interest rate
        const numberOfPayments = parseFloat(values.termMonths);

        const monthlyPayment = calculateLoanPayment(principal, rate, numberOfPayments);
        const totalPayment = monthlyPayment * numberOfPayments;
        const totalInterest = totalPayment - principal;

        setResults({
            monthlyPayment,
            totalPayment,
            totalInterest,
        });
    };

    return (
        <DashboardLayout>
            <h2 className="text-2xl font-bold mb-6">Máy tính trả nợ</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label="Số tiền vay"
                            name="loanAmount"
                            rules={[{ required: true, message: 'Vui lòng nhập số tiền vay!' }]}
                        >
                            <Input prefix="VNĐ" type="number" placeholder="Nhập số tiền vay" />
                        </Form.Item>

                        <Form.Item
                            label="Lãi suất (%)"
                            name="interestRate"
                            rules={[{ required: true, message: 'Vui lòng nhập lãi suất!' }]}
                        >
                            <Input type="number" step="0.01" placeholder="Nhập lãi suất" />
                        </Form.Item>

                        <Form.Item
                            label="Thời hạn (tháng)"
                            name="termMonths"
                            rules={[{ required: true, message: 'Vui lòng nhập thời hạn vay!' }]}
                        >
                            <Input type="number" placeholder="Nhập số tháng" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="w-full">
                                Tính toán
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>

                {results && (
                    <Card title="Kết quả tính toán">
                        <div className="space-y-4">
                            <Statistic
                                title="Số tiền trả hàng tháng"
                                value={results.monthlyPayment}
                                precision={2}
                                suffix="VNĐ"
                                valueStyle={{ color: '#1890ff' }}
                            />
                            <Statistic
                                title="Tổng số tiền phải trả"
                                value={results.totalPayment}
                                precision={2}
                                suffix="VNĐ"
                                valueStyle={{ color: '#52c41a' }}
                            />
                            <Statistic
                                title="Tổng tiền lãi"
                                value={results.totalInterest}
                                precision={2}
                                suffix="VNĐ"
                                valueStyle={{ color: '#faad14' }}
                            />
                        </div>
                    </Card>
                )}
            </div>
        </DashboardLayout>
    );
};

export default DebtCalculator;