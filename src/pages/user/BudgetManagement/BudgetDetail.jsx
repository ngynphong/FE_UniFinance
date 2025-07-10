import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { budgetService } from '../../../services/budgetService';
import { transactionService } from '../../../services/transactionService';
import { Card, Spin, message, InputNumber, Button, Statistic, Col, Row } from 'antd';
import DashboardLayout from '../../../components/layout/user/DashboardLayout';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const BudgetDetail = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [budget, setBudget] = useState(null);
    const [transactionSummary, setTransactionSummary] = useState(null);
    const [categories, setCategories] = useState([]);
    const [budgetAlerts, setBudgetAlerts] = useState([]);
    const [alertThreshold, setAlertThreshold] = useState(80);
    useEffect(() => {
        fetchBudgetDetail();
        fetchTransactionSummary();
        fetchBudgetCategories();
        fetchBudgetAlerts(alertThreshold);
    }, [id, alertThreshold]);

    const fetchBudgetDetail = async () => {
        try {
            setLoading(true);
            const data = await budgetService.getBudgetDetails(id);
            setBudget(data);
        } catch (error) {
            message.error(error.message || 'Lỗi khi tải chi tiết ngân sách');
        } finally {
            setLoading(false);
        }
    };

    const fetchTransactionSummary = async () => {
        try {
            if (!budget?.userId && !budget?.userID) return;
            const userId = budget?.userId || budget?.userID;
            const data = await transactionService.getTransactionSumary(userId);
            setTransactionSummary(data);
        } catch {
            setTransactionSummary(null);
        }
    };

    const fetchBudgetCategories = async () => {
        try {
            const data = await budgetService.getBudgetCategories(id);
            setCategories(data);
        } catch {
            setCategories([]);
        }
    };

    const fetchBudgetAlerts = async (threshold) => {
        try {
            const data = await budgetService.getBudgetAlert(threshold);
            setBudgetAlerts(data);
        } catch {
            setBudgetAlerts([]);
        }
    };

    if (loading) return <Spin size="large" className="flex justify-center items-center h-40" />;
    if (!budget) return <div>Không tìm thấy ngân sách</div>;

    return (
        <DashboardLayout>
            <div className="space-y-6 p-4 md:p-8">
                {/* Tổng quan ngân sách */}

                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <Card className='h-full'>
                            <Statistic
                                title="Ngân sách hàng tháng"
                                value={budget.limitAmount?.toLocaleString()}
                                precision={2}
                                prefix="VND"
                            />

                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <Card className='h-full'>
                            <Statistic
                                title="Đã chi cho đến nay"
                                value={budget.spentAmount?.toLocaleString()}
                                precision={2}
                                prefix="VND"
                            />

                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <Card className='h-full'>
                            <Statistic
                                title="Ngân sách còn lại"
                                value={budget.remainingAmount?.toLocaleString()}
                                precision={2}
                                prefix="VND"
                            />

                        </Card>
                    </Col>
                </Row>

                {/* Transaction summary */}
                {transactionSummary && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div>
                            <div className="text-gray-500">Tổng thu nhập</div>
                            <div className="text-lg font-semibold text-green-600">{transactionSummary.totalIncome?.toLocaleString()}</div>
                        </div>
                        <div>
                            <div className="text-gray-500">Tổng chi phí</div>
                            <div className="text-lg font-semibold text-red-500">{transactionSummary.totalExpense?.toLocaleString()}</div>
                        </div>
                        <div>
                            <div className="text-gray-500">Số dư</div>
                            <div className="text-lg font-semibold {transactionSummary.netBalance >= 0 ? 'text-green-600' : 'text-red-500'}">{transactionSummary.netBalance?.toLocaleString()}</div>
                        </div>
                    </div>
                )}
                {/* Danh sách category và transaction */}
                <Card>
                    <div className="font-semibold text-lg mb-4">Giao dịch</div>
                    {categories?.map(category => {
                        const overLimit = category.percentageUsed > 100;
                        return (
                            <div key={category.categoryName} className={`mb-8 p-4 rounded-lg border ${overLimit ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'} shadow-sm transition-all`}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold text-base flex items-center gap-2">
                                        {overLimit ? <ArrowUpOutlined className="text-red-500" /> : <ArrowDownOutlined className="text-green-500" />}
                                        {category.categoryName}
                                    </span>
                                    <span className="text-sm font-semibold">
                                        <span className={overLimit ? 'text-red-500' : 'text-green-600'}>
                                            {category.spent?.toLocaleString()}<span className="text-gray-400">{category.limit ? ` / ${category.limit?.toLocaleString()}` : ''}</span>
                                        </span>
                                    </span>
                                </div>
                                {/* Progress bar và phần trăm dùng */}
                                <div className="w-full bg-gray-200 rounded h-3 mb-2 overflow-hidden">
                                    <div
                                        className={`h-3 rounded transition-all duration-500 ${overLimit ? 'bg-gradient-to-r from-red-400 to-red-600' : 'bg-gradient-to-r from-green-400 to-green-600'}`}
                                        style={{ width: `${Math.min(category.percentageUsed, 100)}%` }}
                                    />
                                </div>
                                <div className={`text-right text-xs font-bold ${overLimit ? 'text-red-500 animate-pulse' : 'text-green-600'}`}>{category.percentageUsed}%</div>
                                {/* List transaction */}
                                <ul className="space-y-1 mt-2">
                                    {category.transactions?.map(tran => (
                                        <li key={tran.transactionId} className="flex justify-between items-center text-sm border-b py-2 group hover:bg-blue-50 transition-all">
                                            <span className="truncate max-w-[40%]" title={tran.description}>{tran.description}</span>
                                            <span className={'text-red-500 font-semibold'}>
                                                - {tran.amount?.toLocaleString()}
                                            </span>
                                            <span className="text-gray-400 text-xs">{tran.dateCreate && new Date(tran.dateCreate).toLocaleDateString('vi-VN')}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </Card>
                {/* ALERT BUDGET */}
                <Card className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">Cảnh báo ngân sách khi vượt</span>
                        <InputNumber
                            min={1}
                            max={100}
                            value={alertThreshold}
                            onChange={setAlertThreshold}
                            className="w-20"
                        />
                        <span>% giới hạn</span>
                        <Button size="small" onClick={() => fetchBudgetAlerts(alertThreshold)}>
                            Kiểm tra
                        </Button>
                    </div>
                    {budgetAlerts && budgetAlerts.length > 0 && (
                        <div className="bg-yellow-50 border border-yellow-300 rounded p-2">
                            <div className="font-semibold text-yellow-700 mb-2">Cảnh báo ngân sách!</div>
                            <ul className="list-disc pl-5">
                                {budgetAlerts.map(alert => (
                                    <li key={alert.id || alert.budgetId}>
                                        Ngân sách <b>{alert.name || alert.budgetName}</b> đã vượt {alert.percentageUsed || alert.percent || alertThreshold}% giới hạn!
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {budgetAlerts && budgetAlerts.length === 0 && (
                        <div className="text-green-600">Không có ngân sách nào vượt ngưỡng cảnh báo.</div>
                    )}
                </Card>
                {/* Thêm mới category */}
                
                {/* TODO: Transaction recent, transaction summary sẽ bổ sung sau */}
            </div>
        </DashboardLayout>
    );
};

export default BudgetDetail;
