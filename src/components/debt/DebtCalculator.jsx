import React, { useState } from 'react';
import { Form, Input, Button, Card, Statistic, DatePicker, Spin } from 'antd';
// import { calculateLoanPayment } from '../../components/utils/Caculations';
import DashboardLayout from '../layout/user/DashboardLayout';
import debtService from '../../services/debtService';

const DebtCalculator = () => {
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const payload = {
                loanAmount: Number(values.loanAmount),
                interestRate: Number(values.interestRate),
                startDate: values.startDate.format('YYYY-MM-DD'),
                repaymentDate: values.repaymentDate.format('YYYY-MM-DD'),
            };
            const res = await debtService.calculateDebtInterest(payload);
            setResults(res);
        } catch (error) {
            setResults({ error: 'Có lỗi xảy ra khi tính toán!' });
            console.log(error)
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex justify-center items-center h-screen">
                    <Spin size="large" />
                </div>
            </DashboardLayout>
        );
    }
    return (
        <DashboardLayout>
            <h2 className="text-2xl font-bold mb-6">Máy tính trả nợ</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className=''>
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
                            label="Ngày bắt đầu vay"
                            name="startDate"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}
                        >
                            <DatePicker format="YYYY-MM-DD" className="w-full" />
                        </Form.Item>
                        <Form.Item
                            label="Ngày trả nợ"
                            name="repaymentDate"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày trả nợ!' }]}
                        >
                            <DatePicker format="YYYY-MM-DD" className="w-full" />
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
                        {results.error ? (
                            <div className="text-red-500">{results.error}</div>
                        ) : (
                            <div className="space-y-4">
                                {/* Hiển thị các trường kết quả trả về từ API */}
                                <Statistic
                                    title="Tổng tiền lãi"
                                    value={results}
                                    precision={2}
                                    suffix="VNĐ"
                                    valueStyle={{ color: '#faad14' }}
                                />
                                {/* Thêm các trường khác nếu API trả về */}
                            </div>
                        )}
                    </Card>
                )}
            </div>
        </DashboardLayout>
    );
};

export default DebtCalculator;