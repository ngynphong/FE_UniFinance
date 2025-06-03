import React, { useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import DashboardLayout from '../../components/layout/user/DashboardLayout';
import { useAuth } from '../../contexts/useAuth';

const Profile = () => {
    const { user, updateUserProfile } = useAuth();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        try {
            setLoading(true);
            await updateUserProfile(values);
            message.success('Profile updated successfully');
        } catch (error) {
            message.error('Failed to update profile');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h1>

                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        name: user?.name || '',
                        email: user?.email || '',
                    }}
                    onFinish={onFinish}
                >
                    <div className="flex justify-center mb-6">
                        <Upload
                            name="avatar"
                            showUploadList={false}
                            beforeUpload={() => false}
                        >
                            <div className="text-center">
                                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-2">
                                    {user?.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt="avatar"
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <UserOutlined className="text-4xl text-gray-400" />
                                    )}
                                </div>
                                <Button icon={<UploadOutlined />}>Change Avatar</Button>
                            </div>
                        </Upload>
                    </div>

                    <Form.Item
                        name="name"
                        label="Full Name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter a valid email!' }
                        ]}
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Phone Number"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Save Changes
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </DashboardLayout>
    );
};

export default Profile; 