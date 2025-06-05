import React, { useState } from 'react';
import { Table, Button, Space, Tag, Modal, Form, Input, Select, message } from 'antd';
import { EditOutlined, DeleteOutlined, UserAddOutlined } from '@ant-design/icons';
import AdminLayout from '../../components/layout/admin/AdminLayout';

const UserManagement = () => {
    const [users] = useState([
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            role: 'user',
            status: 'active',
            subscription: 'premium',
            joinDate: '2024-05-01',
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'user',
            status: 'inactive',
            subscription: 'basic',
            joinDate: '2024-05-15',
        },
        // Add more mock data as needed
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingUser, setEditingUser] = useState(null);

    const columns = [
        {
            title: 'Name',
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
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role) => (
                <Tag color={role === 'admin' ? 'blue' : 'green'}>{role.toUpperCase()}</Tag>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'active' ? 'success' : 'error'}>{status.toUpperCase()}</Tag>
            ),
        },
        {
            title: 'Subscription',
            dataIndex: 'subscription',
            key: 'subscription',
            render: (subscription) => (
                <Tag color={subscription === 'premium' ? 'gold' : 'default'}>{subscription.toUpperCase()}</Tag>
            ),
        },
        {
            title: 'Join Date',
            dataIndex: 'joinDate',
            key: 'joinDate',
            sorter: (a, b) => new Date(a.joinDate) - new Date(b.joinDate),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    >
                        Edit
                    </Button>
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const handleEdit = (user) => {
        setEditingUser(user);
        form.setFieldsValue(user);
        setIsModalVisible(true);
    };

    const handleDelete = (user) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this user?',
            content: `This will permanently delete ${user.name}'s account.`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                message.success('User deleted successfully');
            },
        });
    };

    const handleModalOk = () => {
        form.validateFields().then((values) => {
            message.success('User information updated successfully');
            setIsModalVisible(false);
            form.resetFields();
            setEditingUser(null);
        });
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
        setEditingUser(null);
    };

    return (
        <AdminLayout>
            <div className="space-y-6 px-2 md:px-0">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
                    <Button
                        type="primary"
                        icon={<UserAddOutlined />}
                        onClick={() => {
                            setEditingUser(null);
                            setIsModalVisible(true);
                        }}
                    >
                        Add New User
                    </Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={users}
                    rowKey="id"
                    pagination={{
                        total: users.length,
                        pageSize: 10,
                        showTotal: (total) => `Total ${total} users`,
                    }}
                />

                <Modal
                    title={editingUser ? "Edit User" : "Add New User"}
                    open={isModalVisible}
                    onOk={handleModalOk}
                    onCancel={handleModalCancel}
                    width={600}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={{ role: 'user', status: 'active', subscription: 'basic' }}
                    >
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please input the name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'Please input the email!' },
                                { type: 'email', message: 'Please enter a valid email!' }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="role"
                            label="Role"
                        >
                            <Select>
                                <Select.Option value="user">User</Select.Option>
                                <Select.Option value="admin">Admin</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="status"
                            label="Status"
                        >
                            <Select>
                                <Select.Option value="active">Active</Select.Option>
                                <Select.Option value="inactive">Inactive</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="subscription"
                            label="Subscription"
                        >
                            <Select>
                                <Select.Option value="basic">Basic</Select.Option>
                                <Select.Option value="premium">Premium</Select.Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </AdminLayout>
    );
};

export default UserManagement;
