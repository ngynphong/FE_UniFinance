import React from 'react';
import { Row, Col, Card, Statistic, Progress, List, Tag } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import DashboardLayout from '../../../components/layout/user/DashboardLayout';

// Fake data
const transactions = [
    { id: 1, type: 'income', amount: 2500, date: '2024-06-01', note: 'Salary' },
    { id: 2, type: 'expense', amount: 800, date: '2024-06-02', note: 'Rent' },
    { id: 3, type: 'expense', amount: 200, date: '2024-06-03', note: 'Groceries' },
    { id: 4, type: 'income', amount: 300, date: '2024-06-10', note: 'Freelance' },
    { id: 5, type: 'expense', amount: 372, date: '2024-06-12', note: 'Utilities' },
    { id: 6, type: 'expense', amount: 100, date: '2024-06-15', note: 'Transport' },
];
// Budget giả
const BUDGET = 3000;

// Goals giả
const goals = [
    { id: 1, name: 'Emergency Fund', target: 1000, current: 600 },
    { id: 2, name: 'Buy a Laptop', target: 1500, current: 900 },
    { id: 3, name: 'Travel', target: 2000, current: 400 },
];

// Tính toán số liệu tổng quan
const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
const totalBalance = totalIncome - totalExpense;
const savingsRate = totalIncome > 0 ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100) : 0;

// Lấy 5 giao dịch gần nhất
const recentTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

const Dashboard = () => {
    return (
        <DashboardLayout>
            <div className="space-y-6 px-2 md:px-0">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>

                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                        <Card className="h-full">
                            <Statistic
                                title="Total Balance"
                                value={totalBalance}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix="$"
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                        <Card className="h-full">
                            <Statistic
                                title="Monthly Income"
                                value={totalIncome}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix="$"
                                suffix={<ArrowUpOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                        <Card className="h-full">
                            <Statistic
                                title="Monthly Expenses"
                                value={totalExpense}
                                precision={2}
                                valueStyle={{ color: '#cf1322' }}
                                prefix="$"
                                suffix={<ArrowDownOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                        <Card className="h-full">
                            <Statistic
                                title="Savings Rate"
                                value={savingsRate}
                                suffix="%"
                                valueStyle={{ color: '#3f8600' }}
                            />
                        </Card>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col xs={24} md={24} lg={12} xl={12}>
                        <Card title="Recent Transactions" className="h-full">
                            <List
                                itemLayout="vertical"
                                dataSource={recentTransactions}
                                renderItem={item => (
                                    <List.Item className="flex-col sm:flex-row">
                                        <List.Item.Meta
                                            title={<span>{item.note} <Tag color={item.type === 'income' ? 'green' : 'red'}>{item.type}</Tag></span>}
                                            description={item.date}
                                        />
                                        <div className={item.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                                            {item.type === 'income' ? '+' : '-'}${item.amount}
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} md={24} lg={12} xl={12}>
                        <Card title="Budget Overview" className="h-full">
                            <div className="space-y-2">
                                <div className="flex justify-between flex-wrap">
                                    <span>Monthly Budget:</span>
                                    <span className="font-semibold">${BUDGET}</span>
                                </div>
                                <div className="flex justify-between flex-wrap">
                                    <span>Spent:</span>
                                    <span className="font-semibold text-red-600">${totalExpense}</span>
                                </div>
                                <div className="flex justify-between flex-wrap">
                                    <span>Remaining:</span>
                                    <span className="font-semibold text-green-600">${BUDGET - totalExpense}</span>
                                </div>
                                <Progress percent={Math.round((totalExpense / BUDGET) * 100)} status={totalExpense > BUDGET ? 'exception' : 'active'} />
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col xs={24}>
                        <Card title="Financial Goals" className="h-full">
                            <List
                                itemLayout="vertical"
                                dataSource={goals}
                                renderItem={goal => (
                                    <List.Item>
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-2">
                                            <div>
                                                <div className="font-semibold">{goal.name}</div>
                                                <div className="text-sm text-gray-500">Target: ${goal.target}</div>
                                            </div>
                                            <div className="w-full md:w-1/2 mt-2 md:mt-0">
                                                <Progress
                                                    percent={Math.round((goal.current / goal.target) * 100)}
                                                    status={goal.current >= goal.target ? 'success' : 'active'}
                                                    format={() => `$${goal.current} / $${goal.target}`}
                                                />
                                            </div>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard; 