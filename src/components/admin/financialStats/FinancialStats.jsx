
import React, { useState, useEffect } from 'react';
import {
  Layout,
  Card,
  Table,
  Statistic,
  Tag,
  Row,
  Col,
  Spin,
  message
} from 'antd';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { Eye } from 'lucide-react';
import AdminLayout from '../../layout/admin/AdminLayout';
import { getAllTransactions, getFinanceDashboardData } from '../../../services/adminService';

const { Header, Content } = Layout;

const FinancialDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [displayTransactions, setDisplayTransactions] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getFinanceDashboardData();
        setData(response);
        const transactions = await getAllTransactions();
        setTotalTransactions(transactions.filter(transaction => transaction.email !== 'bachdxse182030@fpt.edu.vn' && transaction.email !== 'd69579386@gmail.com').length - 2);

        // Tính tổng doanh thu từ tất cả giao dịch
        const totalRev = transactions.reduce((sum, transaction) => sum + (transaction.price || 0), 0);
        setTotalRevenue(totalRev - (99000 * 4));

        // Loại bỏ 2 giao dịch cuối cùng khỏi hiển thị
        const transactionsToDisplay = transactions.filter(transaction => transaction.email !== 'bachdxse182030@fpt.edu.vn' && transaction.email !== 'd69579386@gmail.com').slice(0, -2);
        setDisplayTransactions(transactionsToDisplay);
        console.log('Tran', transactionsToDisplay)
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu thống kê tài chính:', error);
        message.error('Không thể tải dữ liệu thống kê tài chính');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  // const getStatusTag = (status) => {
  //   const statusConfig = {
  //     success: { color: 'green', text: 'Thành công' },
  //     pending: { color: 'orange', text: 'Đang xử lý' },
  //     failed: { color: 'red', text: 'Hoàn tiền' },
  //   };
  //   const config = statusConfig[status];
  //   if (!config) {
  //     return <Tag color="default">Không xác định</Tag>;
  //   }
  //   return <Tag color={config.color}>{config.text}</Tag>;
  // };

  const columns = [
    {
      title: 'Khách hàng',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email) => email || <span className="text-gray-400 italic">Không có</span>,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      render: (phoneNumber) => phoneNumber || <span className="text-gray-400 italic">Không có</span>,
    },
    {
      title: 'Dịch vụ',
      dataIndex: 'packageName',
      key: 'packageName',
    },
    {
      title: 'Số tiền',
      dataIndex: 'price',
      key: 'price',
      render: (amount) => (
        <span className={`font-semibold ${amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {amount > 0 ? '+' : ''}
          {formatCurrency(amount)}
        </span>
      ),
    },
    {
      title: 'Ngày giao dịch',
      dataIndex: 'subscribedAt',
      key: 'subscribedAt',
      render: (text) => (text ? new Date(text).toLocaleDateString('vi-VN') : ''),
    },
    // {
    //   title: 'Hành động',
    //   key: 'action',
    //   render: () => (
    //     <Eye size={16} className="text-blue-500 cursor-pointer hover:text-blue-700" />
    //   ),
    // },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      </AdminLayout>
    );
  }

  const {
    // totalRevenue = 0,
    // totalTransactions = 0,
    monthlyGrowthRate: monthlyGrowth = 0,
    // monthlyRevenueData = [],
    // monthlyTransactionData = [],
  } = data || {};

  return (
    <AdminLayout>
      <>
        <Header className="bg-white rounded-xl px-6">
          <h1 className="text-2xl font-semibold text-gray-800 leading-[64px]">
            Thống kê tài chính
          </h1>
        </Header>

        <Content className="p-6  mt-4">
          <Row gutter={[24, 24]} className="mb-6">
            <Col xs={24} sm={8}>
              <Card bordered={false}>
                <Statistic
                  title="Tổng doanh thu"
                  value={totalRevenue}
                  formatter={(value) => formatCurrency(value)}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>

            <Col xs={24} sm={8}>
              <Card bordered={false}>
                <Statistic
                  title="Tổng số giao dịch"
                  value={totalTransactions}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>

            {/* <Col xs={24} sm={8}>
              <Card bordered={false}>
                <Statistic
                  title="Tăng trưởng theo tháng"
                  value={monthlyGrowth}
                  suffix="%"
                  valueStyle={{ color: '#fa8c16' }}
                />
              </Card>
            </Col> */}
          </Row>

          {/* <Row gutter={[24, 24]} className="mb-6">
            <Col xs={24} lg={12}>
              <Card title="Doanh thu theo tháng">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#52c41a"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="Số lượng giao dịch theo tháng">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyTransactionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="transactions" fill="#1890ff" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row> */}

          <Card title="Giao dịch gần đây">
            <Table
              columns={columns}
              dataSource={displayTransactions}
              loading={loading}
              pagination={{
                pageSize: 15,
                showTotal: (total) => `Hiển thị ${total} giao dịch`,
              }}
              className="overflow-x-auto"
            />
          </Card>
        </Content>
      </>
    </AdminLayout>
  );
};

export default FinancialDashboard;
