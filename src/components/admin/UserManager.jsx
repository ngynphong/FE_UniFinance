import React, { useState, useEffect } from 'react';
import {
  Table,
  Space,
  Tag,
  message,
  Spin,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import AdminLayout from '../../components/layout/admin/AdminLayout';
import { getAllUsers } from '../../services/adminService';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const userData = await getAllUsers();
      setUsers(userData);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
      message.error('Không thể tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'admin' ? 'blue' : 'green'}>
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'success' : 'error'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Gói dịch vụ',
      dataIndex: 'subscription',
      key: 'subscription',
      render: (subscription) => (
        <Tag color={subscription === 'premium' ? 'gold' : 'default'}>
          {subscription.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Ngày tham gia',
      dataIndex: 'joinDate',
      key: 'joinDate',
      sorter: (a, b) => new Date(a.joinDate) - new Date(b.joinDate),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined className="text-blue-500" />
          <DeleteOutlined className="text-red-500" />
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 px-2 md:px-0">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý người dùng</h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={users}
            rowKey="id"
            pagination={{
              total: users.length,
              pageSize: 10,
              showTotal: (total) => `Tổng ${total} người dùng`,
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
