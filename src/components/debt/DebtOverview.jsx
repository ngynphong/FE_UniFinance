import React, { useState, useEffect } from 'react';
import { Card, Progress, List, Tag, Statistic, message, Spin } from 'antd';
import debtService from '../../services/debtService';
import DashboardLayout from '../layout/user/DashboardLayout';

const DebtOverview = () => {
    const [debts, setDebts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDebts();
    }, []);

    const fetchDebts = async () => {
        try {
            setLoading(true);
            const response = await debtService.getAllDebts();
            setDebts(response);
        } catch (error) {
            message.error('Failed to fetch debts data');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Calculate totals only if debts array exists and has items
    const calculateTotals = () => {
        if (!debts || debts.length === 0) {
            return {
                totalDebt: 0,
                paidDebt: 0,
                remainingDebt: 0,
                progressPercentage: 0
            };
        }

        // Calculate total debt
        const totalDebt = debts.reduce((sum, debt) => sum + debt.amount, 0);

        // Calculate paid amount based on debt status
        const paidDebt = debts.reduce((sum, debt) => {
            // Assuming debt has a 'paid' or similar status field
            if (debt.status === 'Paid') {
                return sum + debt.amount;
            }
            // If debt has a paidAmount field, use it
            if (debt.paidAmount) {
                return sum + debt.paidAmount;
            }
            return sum;
        }, 0);

        const remainingDebt = totalDebt - paidDebt;
        const progressPercentage = totalDebt > 0 ? (paidDebt / totalDebt) * 100 : 0;

        return {
            totalDebt,
            paidDebt,
            remainingDebt,
            progressPercentage
        };
    };

    const { totalDebt, paidDebt, remainingDebt, progressPercentage } = calculateTotals();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <DashboardLayout>
            <h2 className="text-2xl font-bold mb-6">Debt Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                    <Statistic
                        title="Total Debt"
                        value={totalDebt}
                        precision={2}
                        prefix="$"
                    />
                </Card>
                <Card>
                    <Statistic
                        title="Paid Amount"
                        value={paidDebt}
                        precision={2}
                        prefix="$"
                        valueStyle={{ color: '#3f8600' }}
                    />
                </Card>
                <Card>
                    <Statistic
                        title="Remaining Debt"
                        value={remainingDebt}
                        precision={2}
                        prefix="$"
                        valueStyle={{ color: remainingDebt > 0 ? '#cf1322' : '#3f8600' }}
                    />
                </Card>
            </div>

            <Card className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Repayment Progress</h3>
                <Progress
                    percent={Number(progressPercentage.toFixed(2))}
                    status="active"
                    strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                    }}
                />
            </Card>

            <Card>
                <h3 className="text-lg font-semibold mb-4">Debt List</h3>
                {debts.length > 0 ? (
                    <List
                        dataSource={debts}
                        renderItem={debt => (
                            <List.Item>
                                <List.Item.Meta
                                    title={debt.debtName}
                                    description={debt.description}
                                />
                                <div className="flex flex-col items-end">
                                    <span className="text-lg font-semibold">${debt.amount}</span>
                                    <Tag color={debt.status === 'active' ? 'blue' : 'green'}>
                                        {debt.status || 'Active'}
                                    </Tag>
                                </div>
                            </List.Item>
                        )}
                    />
                ) : (
                    <div className="text-center text-gray-500">No debts found</div>
                )}
            </Card>
        </DashboardLayout>
    );
};

export default DebtOverview;