import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Progress, List, Spin } from 'antd';
import {
  ArrowUpOutlined,
  UserOutlined,
} from '@ant-design/icons';
import AdminLayout from '../../components/layout/admin/AdminLayout';
import { getQuickStats } from '../../services/adminService';

const goals = [
  {
    id: 1,
    name: 'Revenue Target',
    target: 2000000,
    current: 99000, // This will be updated from API
    suffix: 'VND',
  },
  {
    id: 3,
    name: 'Active Users Target',
    target: 200,
    current: 3, // This will be updated from API
    suffix: 'users',
  },
];

const formatVND = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getQuickStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch quick stats:', error);
        // Optionally, show an error message to the user
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 px-2 md:px-0">
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard Overview
        </h1>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={8} xl={8}>
            <Card className="h-full">
              <Statistic
                title="Total Revenue"
                value={stats.totalRevenue - (99000 * 2)}
                formatter={(value) => formatVND(value)}
                valueStyle={{ color: '#3f8600' }}
              />
              <div className="mt-2 text-xs text-green-600">
                <ArrowUpOutlined /> {stats.revenueGrowthRate}% vs last month
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={8}>
            <Card className="h-full">
              <Statistic
                title="Total Users"
                value={stats.totalUsers}
                valueStyle={{ color: '#1890ff' }}
                prefix={<UserOutlined />}
              />
              <div className="mt-2 text-xs text-blue-600">
                <ArrowUpOutlined /> {stats.userGrowthRate}% increase
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={8}>
            <Card className="h-full">
              <Statistic
                title="Active Users"
                value={stats.activeUsers}
                valueStyle={{ color: '#52c41a' }}
                prefix={<UserOutlined />}
              />
              <div className="mt-2 text-xs text-gray-600">
                {stats.activeUserPercentage}% of total users
              </div>
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Card title="Monthly Goals" className="h-full">
              <List
                itemLayout="vertical"
                dataSource={goals.map(goal => {
                  if (goal.name === 'Revenue Target') {
                    return { ...goal, current: stats.totalRevenue };
                  }
                  if (goal.name === 'Active Users Target') {
                    return { ...goal, current: stats.activeUsers };
                  }
                  return goal;
                })}
                renderItem={(goal) => (
                  <List.Item>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-2">
                      <div>
                        <div className="font-semibold">{goal.name}</div>
                        <div className="text-sm text-gray-500">
                          Target:{' '}
                          {goal.suffix === 'VND'
                            ? formatVND(goal.target)
                            : `${goal.target} ${goal.suffix}`}
                        </div>
                      </div>
                      <div className="w-full md:w-1/2 mt-2 md:mt-0">
                        <Progress
                          percent={Math.round(
                            (goal.current  / goal.target) * 100
                          )}
                          status={
                            goal.current >= goal.target ? 'success' : 'active'
                          }
                          format={() =>
                            goal.suffix === 'VND'
                              ? `${formatVND(goal.current - (99000 * 2))} / ${formatVND(
                                goal.target
                              )}`
                              : `${goal.current} / ${goal.target} ${goal.suffix}`
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