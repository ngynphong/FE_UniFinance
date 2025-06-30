import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, DatePicker, Button, message } from 'antd';
import { budgetService } from '../../services/budgetService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuthHook';

const CreateBudgetModal = ({ open, onClose, onSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleSubmit = async (values) => {
        if (!isAuthenticated) {
            message.error('Vui lòng đăng nhập để tạo ngân sách');
            navigate('/login');
            return;
        }

        try {
            setLoading(true);
            const budgetData = {
                name: values.name,
                limitAmount: values.limitAmount,
                startDate: values.dateRange[0].format('YYYY-MM-DDTHH:mm:ss'),
                endDate: values.dateRange[1].format('YYYY-MM-DDTHH:mm:ss'),
                status: 0
            };

            await budgetService.createBudget(budgetData);
            message.success('Tạo ngân sách thành công!');
            form.resetFields();
            onSuccess?.();
            onClose();
        } catch (error) {
            console.error('Create budget error:', error);
            if (error.message.includes('Unauthorized')) {
                message.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
                navigate('/login');
            } else {
                message.error(error.message || 'Lỗi khi tạo ngân sách');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            title="Tạo ngân sách"
            footer={null}
            width="90%"
            maxWidth={600}
            className="sm:w-[600px] w-full"
            style={{ top: 20 }}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="mt-4"
            >
                <Form.Item
                    name="name"
                    label="Tên ngân sách"
                    rules={[{ required: true, message: 'Làm ơn nhập tên ngân sách' }]}
                >
                    <Input placeholder="Nhập tên ngân sách" />
                </Form.Item>

                <Form.Item
                    name="limitAmount"
                    label="Giới hạn số tiền tối đa"
                    rules={[{ required: true, message: 'Vui lòng nhập số tiền tối đa' }]}
                >
                    <InputNumber
                        className="w-full"
                        min={0}
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                </Form.Item>

                <Form.Item
                    name="dateRange"
                    label="Thời gian ngân sách"
                    rules={[{ required: true, message: 'Vui lòng chọn khoảng thời gian' }]}
                >
                    <DatePicker.RangePicker
                        className="w-full"
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                    />
                </Form.Item>

                <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
                    <Button
                        onClick={onClose}
                        className="w-full sm:w-auto order-2 sm:order-1"
                    >
                        Hủy
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="w-full sm:w-auto order-1 sm:order-2"
                    >
                        Tạo ngân sách
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default CreateBudgetModal;