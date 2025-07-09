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
            console.log('Debt', debts)
        } catch (error) {
            message.error('Chưa có nợ');
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
                progressPercentage: 0,
                progressText: '0/0 (0%)'
            };
        }

        // Calculate total debt using principal
        const totalDebt = debts.reduce((sum, debt) => sum + (debt.principal || 0), 0);

        // Calculate paid amount using paidAmount field
        const paidDebt = debts.reduce((sum, debt) => {
            return sum + (debt.paidAmount || 0);
        }, 0);

        const remainingDebt = totalDebt - paidDebt;
        // Nếu có progress ở từng debt, lấy tổng progressText và phần trăm trung bình
        let progressText = '';
        let progressPercentage = 0;
        if (debts[0]?.progress) {
            // Nếu tất cả các debt đều có progress, lấy trung bình phần trăm
            const progresses = debts.map(d => {
                const match = d.progress.match(/\((\d+)%\)/);
                return match ? parseFloat(match[1]) : 0;
            });
            progressPercentage = progresses.length > 0 ? progresses.reduce((a, b) => a + b, 0) / progresses.length : 0;
            progressText = debts.map(d => d.progress).join(' | ');
        } else {
            progressPercentage = totalDebt > 0 ? (paidDebt / totalDebt) * 100 : 0;
            progressText = `${paidDebt.toLocaleString('vi-VN')} / ${totalDebt.toLocaleString('vi-VN')} (${progressPercentage.toFixed(1)}%)`;
        }

        return {
            totalDebt,
            paidDebt,
            remainingDebt,
            progressPercentage,
            progressText
        };
    };

    // Function to translate status to Vietnamese
    const getStatusInVietnamese = (debt) => {
        if (debt.isPaid) {
            return 'Đã trả';
        }
        if (debt.currentAmount > 0) {
            return 'Đang nợ';
        }
        return 'Đã trả';
    };

    // Function to get status color
    const getStatusColor = (debt) => {
        if (debt.isPaid) {
            return 'green';
        }
        if (debt.currentAmount > 0) {
            return 'blue';
        }
        return 'green';
    };

    const { totalDebt, paidDebt, remainingDebt, progressPercentage, progressText } = calculateTotals();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <DashboardLayout>
            <h2 className="text-2xl font-bold mb-6">Tổng quan nợ</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                    <Statistic
                        title="Tổng số nợ"
                        value={totalDebt}
                        precision={0}
                        suffix="VNĐ"
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    />
                </Card>
                <Card>
                    <Statistic
                        title="Số tiền đã trả"
                        value={paidDebt}
                        precision={0}
                        suffix="VNĐ"
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        valueStyle={{ color: '#3f8600' }}
                    />
                </Card>
                <Card>
                    <Statistic
                        title="Nợ còn lại"
                        value={remainingDebt}
                        precision={0}
                        suffix="VNĐ"
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        valueStyle={{ color: remainingDebt > 0 ? '#cf1322' : '#3f8600' }}
                    />
                </Card>
            </div>

            <Card className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Tiến độ trả nợ</h3>
                <Progress
                    percent={Number(progressPercentage.toFixed(2))}
                    status="active"
                    strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                    }}
                    // format={() => progressText}
                />
                <div className="mt-2 text-sm text-gray-600">
                    Đã hoàn thành {progressText}
                </div>
            </Card>

            <Card>
                <h3 className="text-lg font-semibold mb-4">Danh sách nợ</h3>
                {debts.length > 0 ? (
                    <List
                        dataSource={debts}
                        renderItem={debt => (
                            <List.Item>
                                <List.Item.Meta
                                    title={debt.debtName}
                                    description={debt.description || 'Không có mô tả'}
                                />
                                <div className="flex flex-col items-end">
                                    <span className="text-lg font-semibold">
                                        {debt.currentAmount?.toLocaleString('vi-VN')} VNĐ
                                    </span>
                                    <Tag color={getStatusColor(debt)}>
                                        {getStatusInVietnamese(debt)}
                                    </Tag>
                                    {debt.dueDate && (
                                        <div className="text-xs text-gray-500 mt-1">
                                            Hạn: {new Date(debt.dueDate).toLocaleDateString('vi-VN')}
                                        </div>
                                    )}
                                    <div className="text-xs text-gray-500 mt-1">
                                        Đã trả: {debt.paidAmount?.toLocaleString('vi-VN')} VNĐ
                                    </div>
                                </div>
                            </List.Item>
                        )}
                    />
                ) : (
                    <div className="text-center text-gray-500 py-8">
                        <p>Không có khoản nợ nào</p>
                        <p className="text-sm">Bạn chưa thêm khoản nợ nào vào hệ thống</p>
                    </div>
                )}
            </Card>
        </DashboardLayout>
    );
};

export default DebtOverview;