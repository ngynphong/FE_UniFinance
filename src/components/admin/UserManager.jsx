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
    title: 'Số điện thoại',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    render: (phone) => phone || <span className="text-gray-400 italic">Không có</span>,
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    key: 'address',
    render: (address) => address || <span className="text-gray-400 italic">Không có</span>,
  },
  {
    title: 'Vai trò',
    dataIndex: 'role',
    key: 'role',
    render: (role) => (
      <Tag color={role === 'Admin' ? 'blue' : role === 'Consultant' ? 'cyan' : 'default'}>
        {role}
      </Tag>
    ),
  },
  {
    title: 'Hành động',
    key: 'action',
    render: () => (
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
