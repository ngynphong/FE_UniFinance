import React from 'react';
import { Row, Col, Card, Statistic, Progress, List, Tag } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, UserOutlined, CrownOutlined, DollarOutlined } from '@ant-design/icons';
import AdminLayout from '../../components/layout/admin/AdminLayout';

// Website statistics with package-specific data
const websiteStats = {
    totalRevenue: 150000000, // In VND
    lastMonthRevenue: 90000000,
    totalUsers: 1500,
    activeUsers: 1200,
    premiumUsers: {
        total: 300,
        basic: 150,    // Premium Basic users
        pro: 100,      // Premium Pro users
        elite: 50,     // Premium Elite users
    },
    premiumRevenue: {
        total: 90000000,
        basic: 30000000,   // 2.999.000 × 150
        pro: 35000000,     // 4.999.000 × 100
        elite: 25000000,   // 9.999.000 × 50
    },
    revenueGrowth: 66.67,
    userGrowth: 25,
};

// Recent premium subscriptions with actual package prices
const transactions = [
    {
        id: 1,
        type: 'subscription',
        package: 'Premium Pro',
        amount: 4999000,
        date: '2024-06-05',
        note: 'Premium Pro Subscription - John Doe'
    },
    {
        id: 2,
        type: 'subscription',
        package: 'Premium Elite',
        amount: 9999000,
        date: '2024-06-04',
        note: 'Premium Elite Subscription - Jane Smith'
    },
    {
        id: 3,
        type: 'subscription',
        package: 'Premium Basic',
        amount: 2999000,
        date: '2024-06-03',
        note: 'Premium Basic Subscription - Mike Johnson'
    },
    {
        id: 4,
        type: 'subscription',
        package: 'Premium Basic',
        amount: 2999000,
        date: '2024-06-02',
        note: 'Premium Basic Subscription - Sarah Wilson'
    },
    {
        id: 5,
        type: 'subscription',
        package: 'Premium Pro',
        amount: 4999000,
        date: '2024-06-01',
        note: 'Premium Pro Subscription - Tom Brown'
    },
];

// Monthly goals with realistic targets
const goals = [
    {
        id: 1,
        name: 'Revenue Target',
        target: 200000000,
        current: websiteStats.totalRevenue,
        suffix: 'VND'
    },
    {
        id: 2,
        name: 'Premium Users Target',
        target: 500,
        current: websiteStats.premiumUsers.total,
        suffix: 'users'
    },
    {
        id: 3,
        name: 'Active Users Target',
        target: 2000,
        current: websiteStats.activeUsers,
        suffix: 'users'
    },
];

// Get 5 most recent transactions
const recentTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

// Format currency to VND
const formatVND = (value) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(value);
};

const AdminDashboard = () => {
    return (
        <AdminLayout>
            <div className="space-y-6 px-2 md:px-0">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>

                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                        <Card className="h-full">
                            <Statistic
                                title="Total Revenue"
                                value={websiteStats.totalRevenue}
                                formatter={value => formatVND(value)}
                                valueStyle={{ color: '#3f8600' }}
                            />
                            <div className="mt-2 text-xs text-green-600">
                                <ArrowUpOutlined /> {websiteStats.revenueGrowth}% vs last month
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                        <Card className="h-full">
                            <Statistic
                                title="Total Users"
                                value={websiteStats.totalUsers}
                                valueStyle={{ color: '#1890ff' }}
                                prefix={<UserOutlined />}
                            />
                            <div className="mt-2 text-xs text-blue-600">
                                <ArrowUpOutlined /> {websiteStats.userGrowth}% increase
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                        <Card className="h-full">
                            <Statistic
                                title="Active Users"
                                value={websiteStats.activeUsers}
                                valueStyle={{ color: '#52c41a' }}
                                prefix={<UserOutlined />}
                            />
                            <div className="mt-2 text-xs text-gray-600">
                                {Math.round((websiteStats.activeUsers / websiteStats.totalUsers) * 100)}% of total users
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                        <Card className="h-full">
                            <Statistic
                                title="Premium Users"
                                value={websiteStats.premiumUsers.total}
                                valueStyle={{ color: '#faad14' }}
                                prefix={<CrownOutlined />}
                            />
                            <div className="mt-2 text-xs text-gray-600">
                                {formatVND(websiteStats.premiumRevenue.total)} revenue
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col xs={24} md={24} lg={12} xl={12}>
                        <Card title="Recent Premium Subscriptions" className="h-full">
                            <List
                                itemLayout="vertical"
                                dataSource={recentTransactions}
                                renderItem={item => (
                                    <List.Item className="flex-col sm:flex-row">
                                        <List.Item.Meta
                                            title={
                                                <span>
                                                    {item.note}{' '}
                                                    <Tag color={
                                                        item.package === 'Premium Elite' ? 'purple' :
                                                            item.package === 'Premium Pro' ? 'gold' : 'blue'
                                                    }>
                                                        {item.package}
                                                    </Tag>
                                                </span>
                                            }
                                            description={item.date}
                                        />
                                        <div className="text-green-600">
                                            {formatVND(item.amount)}
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} md={24} lg={12} xl={12}>
                        <Card title="Premium Package Distribution" className="h-full">
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span>Premium Basic Users</span>
                                        <span>{Math.round((websiteStats.premiumUsers.basic / websiteStats.premiumUsers.total) * 100)}%</span>
                                    </div>
                                    <Progress
                                        percent={Math.round((websiteStats.premiumUsers.basic / websiteStats.premiumUsers.total) * 100)}
                                        strokeColor="#1890ff"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span>Premium Pro Users</span>
                                        <span>{Math.round((websiteStats.premiumUsers.pro / websiteStats.premiumUsers.total) * 100)}%</span>
                                    </div>
                                    <Progress
                                        percent={Math.round((websiteStats.premiumUsers.pro / websiteStats.premiumUsers.total) * 100)}
                                        strokeColor="#faad14"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span>Premium Elite Users</span>
                                        <span>{Math.round((websiteStats.premiumUsers.elite / websiteStats.premiumUsers.total) * 100)}%</span>
                                    </div>
                                    <Progress
                                        percent={Math.round((websiteStats.premiumUsers.elite / websiteStats.premiumUsers.total) * 100)}
                                        strokeColor="#722ed1"
                                    />
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col xs={24}>
                        <Card title="Monthly Goals" className="h-full">
                            <List
                                itemLayout="vertical"
                                dataSource={goals}
                                renderItem={goal => (
                                    <List.Item>
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-2">
                                            <div>
                                                <div className="font-semibold">{goal.name}</div>
                                                <div className="text-sm text-gray-500">
                                                    Target: {goal.suffix === 'VND' ? formatVND(goal.target) : `${goal.target} ${goal.suffix}`}
                                                </div>
                                            </div>
                                            <div className="w-full md:w-1/2 mt-2 md:mt-0">
                                                <Progress
                                                    percent={Math.round((goal.current / goal.target) * 100)}
                                                    status={goal.current >= goal.target ? 'success' : 'active'}
                                                    format={() => goal.suffix === 'VND' ?
                                                        `${formatVND(goal.current)} / ${formatVND(goal.target)}` :
                                                        `${goal.current} / ${goal.target} ${goal.suffix}`
                                                    }
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
        </AdminLayout>
    );
};

export default AdminDashboard;