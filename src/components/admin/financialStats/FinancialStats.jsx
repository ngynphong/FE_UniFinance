
import {
  Layout,
  Card,
  Table,
  Statistic,
  Tag,
  Row,
  Col,
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
import {
  TrendingUp,
  DollarSign,
  Activity,
  ArrowUpRight,
  Eye,
} from 'lucide-react';
import AdminLayout from '../../layout/admin/AdminLayout';

const { Header, Content } = Layout;

const FinancialDashboard = () => {
  const monthlyGrowthData = [
    { month: 'T1', revenue: 1800, transactions: 820 },
    { month: 'T2', revenue: 2100, transactions: 950 },
    { month: 'T3', revenue: 2350, transactions: 1100 },
    { month: 'T4', revenue: 2200, transactions: 980 },
    { month: 'T5', revenue: 2650, transactions: 1200 },
    { month: 'T6', revenue: 2850, transactions: 1247 },
  ];

  const transactionData = [
    {
      key: '1',
      code: '#TXN001',
      customer: 'Nguyễn Văn An',
      service: 'Gói tư vấn Premium',
      amount: 2500000,
      date: '29/06/2025',
      status: 'success',
    },
    {
      key: '2',
      code: '#TXN002',
      customer: 'Trần Thị Bình',
      service: 'Khóa học đầu tư',
      amount: 1800000,
      date: '28/06/2025',
      status: 'success',
    },
    {
      key: '3',
      code: '#TXN003',
      customer: 'Lê Minh Cường',
      service: 'Tư vấn cá nhân',
      amount: 500000,
      date: '28/06/2025',
      status: 'pending',
    },
    {
      key: '4',
      code: '#TXN004',
      customer: 'Phạm Thu Hà',
      service: 'Gói tư vấn Basic',
      amount: 1200000,
      date: '27/06/2025',
      status: 'success',
    },
    {
      key: '5',
      code: '#TXN005',
      customer: 'Hoàng Đức Minh',
      service: 'Khóa học nâng cao',
      amount: 3000000,
      date: '27/06/2025',
      status: 'success',
    },
    {
      key: '6',
      code: '#TXN006',
      customer: 'Đỗ Thị Lan',
      service: 'Tư vấn nhóm',
      amount: -150000,
      date: '26/06/2025',
      status: 'failed',
    },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      success: { color: 'green', text: 'Thành công' },
      pending: { color: 'orange', text: 'Đang xử lý' },
      failed: { color: 'red', text: 'Hoàn tiền' },
    };
    const config = statusConfig[status];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const columns = [
    {
      title: 'Mã giao dịch',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Dịch vụ',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <span className={`font-semibold ${amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {amount > 0 ? '+' : ''}
          {formatCurrency(amount)}
        </span>
      ),
    },
    {
      title: 'Ngày giao dịch',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: () => (
        <Eye size={16} className="text-blue-500 cursor-pointer hover:text-blue-700" />
      ),
    },
  ];

  return (
     <AdminLayout>
    <Layout>
      <Header className="bg-white shadow px-6">
        <h1 className="text-2xl font-semibold text-gray-800 leading-[64px]">Thống kê tài chính</h1>
      </Header>

      <Content className="p-6 bg-gray-50">
        <Row gutter={[24, 24]} className="mb-6">
          <Col xs={24} sm={8}>
            <Card bordered={false}>
              <Statistic
                title="Tổng doanh thu"
                value={2847550000}
                formatter={(value) => formatCurrency(value)}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={8}>
            <Card bordered={false}>
              <Statistic title="Tổng số giao dịch" value={1247} valueStyle={{ color: '#1890ff' }} />
            </Card>
          </Col>

          <Col xs={24} sm={8}>
            <Card bordered={false}>
              <Statistic title="Tăng trưởng theo tháng" value={23.5} suffix="%" valueStyle={{ color: '#fa8c16' }} />
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 24]} className="mb-6">
          <Col xs={24} lg={12}>
            <Card title="Doanh thu theo tháng">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#52c41a" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="Số lượng giao dịch theo tháng">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="transactions" fill="#1890ff" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>

        <Card title="Giao dịch gần đây">
          <Table
            columns={columns}
            dataSource={transactionData}
            pagination={{
              pageSize: 10,
              showTotal: (total) => `Hiển thị ${total} giao dịch gần nhất`,
            }}
            className="overflow-x-auto"
          />
        </Card>
      </Content>
    </Layout>
    </AdminLayout>
  );
};

export default FinancialDashboard;
