import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import DashboardLayout from '../../../components/layout/user/DashboardLayout';
import { useAuth } from '../../../contexts/useAuth';
import { authService } from '../../../services/authService';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyDTH0Is91VEQndqZHwo5_TgpI3XIBXTZ-c',
    authDomain: 'pizza-web-daca5.firebaseapp.com',
    projectId: 'pizza-web-daca5',
    storageBucket: 'pizza-web-daca5.appspot.com',
    messagingSenderId: '1023847484458',
    appId: '1:1023847484458:web:16e8fb0a9e9b4223b04753'
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

async function uploadAvatarToFirebase(file, userId) {
    const storageRef = ref(storage, `avatars/${userId}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
}

const Profile = () => {
    const { user, updateUserProfile } = useAuth();
    const [form] = Form.useForm();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState(null);
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setLoading(true);

                const userData = await authService.getUserProfile(user.userID);

                setUserProfile(userData);
                setAvatar(userData.avatar);
                form.setFieldsValue({
                    name: userData.name,
                    email: userData.email,
                    phoneNumber: userData.phoneNumber,
                    address: userData.address,

                });
            } catch (error) {
                message.error('Lỗi khi tải dữ liệu');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.userID) {
            fetchUserProfile();
        }
    }, [user?.userID, form]);
    const onFinish = async (values) => {
        console.log(user.userID)
        try {
            setLoading(true);
            const updatedData = {
                id: user.userID,
                name: values.name,
                phoneNumber: values.phoneNumber,
                address: values.address || null,
                avatar: avatar || userProfile?.avatar,
            };

            await authService.updateUserProfile(user.userID, updatedData);
            await updateUserProfile(updatedData);
            message.success('Cập nhật hồ sơ thành công');
        } catch (error) {
            message.error('Lỗi khi cập nhật hồ sơ');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <DashboardLayout>
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Hồ sơ người dùng</h1>

                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        name: userProfile?.name || '',
                        email: userProfile?.email || '',
                    }}
                    onFinish={onFinish}
                >
                    <div className="flex justify-center mb-6">
                        <Upload
                            name="avatar"
                            showUploadList={false}
                            beforeUpload={async (file) => {
                                try {
                                    const url = await uploadAvatarToFirebase(file, user.userID);
                                    setAvatar(url);
                                    return false;
                                } catch (error) {
                                    message.error('Lỗi khi thay avatar');
                                    console.error(error);
                                    return false;
                                }
                            }}
                        >
                            <div className="text-center">
                                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-2">
                                    {(avatar || userProfile?.avatar) ? (
                                        <img
                                            src={avatar || userProfile?.avatar}
                                            alt="avatar"
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <UserOutlined className="text-4xl text-gray-400" />
                                    )}
                                </div>
                                <Button icon={<UploadOutlined />}>Thay avatar</Button>
                            </div>
                        </Upload>
                    </div>

                    <Form.Item
                        name="name"
                        label="Tên"
                        rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Vui lòng nhập đúng email!' }
                        ]}
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        name="phoneNumber"
                        label="Số điện thoại"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label="Địa chỉ"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Lưu thay đổi
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </DashboardLayout>
    );
};

export default Profile; 