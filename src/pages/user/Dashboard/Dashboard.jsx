import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Progress, List, Tag, Spin } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import DashboardLayout from '../../../components/layout/user/DashboardLayout';
import { transactionService } from '../../../services/transactionService';
import { goalService } from '../../../services/goalService';
import { budgetService } from '../../../services/budgetService';
import { useAuth } from '../../../contexts/useAuth';
import debtService from '../../../services/debtService';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);
    const [goals, setGoals] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [debts, setDebts] = useState([]);
    const { user } = useAuth();

    // Calculate totals
    const calculateTotals = () => {
        const totalIncome = transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const totalExpense = transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        const totalBalance = totalIncome - totalExpense;
        const savingsRate = totalIncome > 0
            ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100)
            : 0;

        return { totalIncome, totalExpense, totalBalance, savingsRate };
    };

    // Fetch all data
    const fetchGoals = async () => {
        try {
            const goalsData = await goalService.getAllGoals();
            setGoals(goalsData.filter(g => g.userId === user?.userID));
        } catch (error) {
            // console.error('Lỗi lấy dữ liệu :', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchDebts = async () => {
        try {
            const debtsData = await debtService.getAllDebts();
            setDebts(debtsData || []);
        } catch (error) {
            // console.error('Lỗi lấy dữ liệu :', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchBudgets = async () => {
        try {
            const budgetsData = await budgetService.getBudgets();
            setBudgets(budgetsData);
        } catch (error) {
            // console.error('Lỗi lấy dữ liệu :', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTransactions = async () => {
        try {
            const transactionsData = await transactionService.getAllTransactions();
            setTransactions(transactionsData.filter(t => t.userId === user?.userID));
        } catch (error) {
            // console.error('Lỗi lấy dữ liệu :', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
        fetchGoals();
        fetchBudgets();
        fetchDebts();
    }, []);

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex justify-center items-center h-screen">
                    <Spin size="large" />
                </div>
            </DashboardLayout>
        );
    }

    const { totalIncome, totalExpense, totalBalance, savingsRate } = calculateTotals();
    const recentTransactions = [...transactions]
        .sort((a, b) => new Date(b.dateCreate) - new Date(a.dateCreate))
        .slice(0, 5);

    // Get the current month's budget if exists
    const currentBudget = budgets.length > 0 ? budgets[0] : { limitAmount: 0 };

    // Tổng số dư còn lại trong nợ
    const totalDebtCurrentAmount = debts.reduce((sum, d) => sum + (d.currentAmount || 0), 0);

    return (
        <DashboardLayout>
            <div className="space-y-6 px-2 md:px-0">
                <h1 className="text-2xl font-bold text-gray-800">Tổng quan chính</h1>

                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                        <Card className="h-full">
                            <Statistic
                                title="Tổng số dư"
                                value={totalBalance}
                                precision={2}
                                valueStyle={{ color: totalBalance >= 0 ? '#3f8600' : '#cf1322' }}
                                prefix="VND"
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                        <Card className="h-full">
                            <Statistic
                                title="Thu nhập hàng tháng"
                                value={totalIncome}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix="VND"
                                suffix={<ArrowUpOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                        <Card className="h-full">
                            <Statistic
                                title="Chi phí hàng tháng"
                                value={totalExpense}
                                precision={2}
                                valueStyle={{ color: '#cf1322' }}
                                prefix="VND"
                                suffix={<ArrowDownOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                        <Card className="h-full">
                            <Statistic
                                title="Tỷ lệ tiết kiệm"
                                value={savingsRate}
                                suffix="%"
                                valueStyle={{ color: savingsRate >= 0 ? '#3f8600' : '#cf1322' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                        <Card className="h-full">
                            <Statistic
                                title="Số dư còn lại trong nợ"
                                value={totalDebtCurrentAmount}
                                precision={2}
                                valueStyle={{ color: totalDebtCurrentAmount > 0 ? '#cf1322' : '#3f8600' }}
                                prefix="VND"
                            />
                        </Card>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col xs={24} md={24} lg={12} xl={12}>
                        <Card title="Giao dịch gần đây" className="h-full">
                            <List
                                itemLayout="vertical"
                                dataSource={recentTransactions}
                                renderItem={item => (
                                    <List.Item className="flex-col sm:flex-row">
                                        <List.Item.Meta
                                            title={
                                                <span>
                                                    {item.description}
                                                    {item.debtId && <Tag color="blue" className="ml-2">Khoản nợ</Tag>}
                                                    {item.budgetId && !item.debtId && <Tag color="purple" className="ml-2">Ngân sách</Tag>}
                                                    <Tag color={item.type === 'income' ? 'green' : 'red'} className='ml-2'>
                                                        {item.type === 'income' ? 'Thu nhập' : 'Chi phí'}
                                                    </Tag>
                                                </span>
                                            }
                                            description={new Date(item.dateCreate).toLocaleDateString()}
                                        />
                                        <div className={item.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                                            {item.type === 'income' ? '+' : '-'}{Number(item.amount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                        </div>
                                    </List.Item>
                                )}
                                locale={{ emptyText: 'Không có giao dịch gần đây' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} md={24} lg={12} xl={12}>
                        <Card title="Tổng quan về ngân sách" className="h-full">
                            <div className="space-y-2">
                                <div className="flex justify-between flex-wrap">
                                    <span>Ngân sách hàng tháng:</span>
                                    <span className="font-semibold">{Number(currentBudget.limitAmount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                </div>
                                <div className="flex justify-between flex-wrap">
                                    <span>Đã tiêu:</span>
                                    <span className="font-semibold text-red-600">{Number(totalExpense).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                </div>
                                <div className="flex justify-between flex-wrap">
                                    <span>Còn lại:</span>
                                    <span className="font-semibold text-green-600">
                                        {Number(currentBudget.limitAmount - totalExpense).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </span>
                                </div>
                                <Progress
                                    percent={Math.round((totalExpense / currentBudget.limitAmount) * 100)}
                                    status={totalExpense > currentBudget.limitAmount ? 'exception' : 'active'}
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col xs={24}>
                        <Card title="Mục tiêu tài chính" className="h-full">
                            <List
                                itemLayout="vertical"
                                dataSource={goals}
                                renderItem={goal => (
                                    <List.Item>
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-2">
                                            <div>
                                                <div className="font-semibold">{goal.goal}</div>
                                                <div className="text-sm text-gray-500">Mục tiêu: {Number(goal.amount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                            </div>
                                            <div className="w-full md:w-1/2 mt-2 md:mt-0">
                                                <Progress
                                                    percent={Math.round((goal.currentSpending / goal.amount) * 100)}
                                                    status={goal.currentSpending >= goal.amount ? 'success' : 'active'}
                                                    format={() => `${Number(goal.currentSpending).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} / ${Number(goal.amount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`}
                                                />
                                            </div>
                                        </div>
                                    </List.Item>
                                )}
                                locale={{ emptyText: 'Không đặt mục tiêu' }}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;