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
            <h2 className="text-2xl font-bold mb-6">Debt Repayment Calculator</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label="Loan Amount"
                            name="loanAmount"
                            rules={[{ required: true, message: 'Please input loan amount!' }]}
                        >
                            <Input prefix="$" type="number" />
                        </Form.Item>

                        <Form.Item
                            label="Interest Rate (%)"
                            name="interestRate"
                            rules={[{ required: true, message: 'Please input interest rate!' }]}
                        >
                            <Input type="number" step="0.01" />
                        </Form.Item>

                        <Form.Item
                            label="Term (months)"
                            name="termMonths"
                            rules={[{ required: true, message: 'Please input loan term!' }]}
                        >
                            <Input type="number" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="w-full">
                                Calculate
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>

                {results && (
                    <Card>
                        <div className="space-y-4">
                            <Statistic
                                title="Monthly Payment"
                                value={results.monthlyPayment}
                                precision={2}
                                prefix="$"
                            />
                            <Statistic
                                title="Total Payment"
                                value={results.totalPayment}
                                precision={2}
                                prefix="$"
                            />
                            <Statistic
                                title="Total Interest"
                                value={results.totalInterest}
                                precision={2}
                                prefix="$"
                            />
                        </div>
                    </Card>
                )}
            </div>
        </DashboardLayout>
    );
};

export default DebtCalculator;