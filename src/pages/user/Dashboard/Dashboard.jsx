import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Progress, List, Tag, Spin, Select, DatePicker } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import DashboardLayout from '../../../components/layout/user/DashboardLayout';
import { transactionService } from '../../../services/transactionService';
import { budgetService } from '../../../services/budgetService';
import { useAuth } from '../../../contexts/useAuth';
import debtService from '../../../services/debtService';
import dayjs from 'dayjs';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);
    const [debts, setDebts] = useState([]);
    const { user } = useAuth();
    const [filterPeriod, setFilterPeriod] = useState('month');
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [budgets, setBudgets] = useState([]);
    const [selectedBudgetId, setSelectedBudgetId] = useState(null);
    const [budgetCategories, setBudgetCategories] = useState([]);
    const [selectedCategoryName, setSelectedCategoryName] = useState(null);
    const [categorySpent, setCategorySpent] = useState(0);

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
    const fetchDebts = async () => {
        try {
            const debtsData = await debtService.getAllDebts();
            setDebts(debtsData || []);
        } catch {
            // console.error('Lỗi lấy dữ liệu :');
        } finally {
            setLoading(false);
        }
    };

    const fetchBudgets = async () => {
        try {
            const budgetData = await budgetService.getBudgets();
            setBudgets(budgetData || []);
        } catch (error) {
            console.error('Failed to fetch budgets:', error);
        }
    };


    const fetchTransactions = async () => {
        try {
            const transactionsData = await transactionService.getAllTransactions();
            setTransactions(transactionsData.filter(t => t.userId === user?.userID));
        } catch {
            // console.error('Lỗi lấy dữ liệu :');
        } finally {
            setLoading(false);
        }
    };

    const getFilteredTotal = (type) => {
        return transactions
            .filter(t => {
                if (t.type !== type) return false;
                const tDate = dayjs(t.dateCreate);
                if (filterPeriod === 'day') {
                    return tDate.isSame(selectedDate, 'day');
                }
                if (filterPeriod === 'month') {
                    return tDate.isSame(selectedDate, 'month');
                }
                if (filterPeriod === 'year') {
                    return tDate.isSame(selectedDate, 'year');
                }
                return false;
            })
            .reduce((sum, t) => sum + t.amount, 0);
    };


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await Promise.all([
                    fetchTransactions(),
                    fetchDebts(),
                    fetchBudgets(),
                ]);
            } catch {
                // console.error("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedBudgetId) {
            const fetchCategories = async () => {
                try {
                    const categoriesData = await budgetService.getBudgetDetails(selectedBudgetId);
                    setBudgetCategories(categoriesData.categories || []);
                    setSelectedCategoryName(null);
                    setCategorySpent(0);
                } catch (error) {
                    console.error('Failed to fetch budget categories:', error);
                }
            };
            fetchCategories();
        } else {
            setBudgetCategories([]);
            setSelectedCategoryName(null);
            setCategorySpent(0);
        }
    }, [selectedBudgetId]);

    useEffect(() => {
        if (selectedCategoryName) {
            const selectedCategory = budgetCategories.find(c => c.categoryName === selectedCategoryName);
            if (selectedCategory) {
                setCategorySpent(selectedCategory.spent);
            }
        } else {
            setCategorySpent(0);
        }
    }, [selectedCategoryName, budgetCategories]);

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

    // Tổng số dư còn lại trong nợ
    const totalDebtCurrentAmount = debts.reduce((sum, d) => sum + (d.currentAmount || 0), 0);

    const filteredIncome = getFilteredTotal('income');
    const filteredExpense = getFilteredTotal('expense');

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
                    
                    {/* các giaoa dịch gần đây */}
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
                    {/* Tổng quan chi tiêu và thu nhập */}
                    <Col xs={24} md={24} lg={12} xl={12}>
                        <Card title="Tổng quan chi tiêu và thu nhập" className="h-full">
                            <div className="flex justify-end mb-4 space-x-2">
                                <Select value={filterPeriod} onChange={setFilterPeriod} style={{ width: 120 }}>
                                    <Select.Option value="day">Ngày</Select.Option>
                                    <Select.Option value="month">Tháng</Select.Option>
                                    <Select.Option value="year">Năm</Select.Option>
                                </Select>
                                <DatePicker
                                    picker={filterPeriod}
                                    value={selectedDate}
                                    onChange={setSelectedDate}
                                />
                            </div>
                            <div className="space-y-4">
                                <Card>
                                    <Statistic
                                        title="Tổng thu nhập"
                                        value={filteredIncome}
                                        precision={2}
                                        valueStyle={{ color: '#3f8600' }}
                                        prefix="VND"
                                    />
                                </Card>
                                <Card>
                                    <Statistic
                                        title="Tổng chi tiêu"
                                        value={filteredExpense}
                                        precision={2}
                                        valueStyle={{ color: '#cf1322' }}
                                        prefix="VND"
                                    />
                                </Card>
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} md={24} lg={12} xl={12}>
                        <Card title="Chi tiêu theo danh mục ngân sách" className="h-full">
                            <div className="flex justify-end mb-4 space-x-2">
                                <Select
                                    placeholder="Chọn ngân sách"
                                    style={{ width: 200 }}
                                    onChange={setSelectedBudgetId}
                                    value={selectedBudgetId}
                                >
                                    {budgets.map(b => (
                                        <Select.Option key={b.id} value={b.id}>{b.name}</Select.Option>
                                    ))}
                                </Select>
                                <Select
                                    placeholder="Chọn danh mục"
                                    style={{ width: 200 }}
                                    onChange={setSelectedCategoryName}
                                    value={selectedCategoryName}
                                    disabled={!selectedBudgetId}
                                >
                                    {budgetCategories.map(c => (
                                        <Select.Option key={c.categoryName} value={c.categoryName}>{c.categoryName}</Select.Option>
                                    ))}
                                </Select>
                            </div>
                            <Card>
                                <Statistic
                                    title="Số tiền đã chi"
                                    value={categorySpent}
                                    precision={2}
                                    valueStyle={{ color: '#cf1322' }}
                                    prefix="VND"
                                />
                            </Card>
                        </Card>
                    </Col>
                </Row>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
