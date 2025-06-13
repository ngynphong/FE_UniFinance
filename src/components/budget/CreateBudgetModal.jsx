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
            message.error('Please login to create budget');
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
            message.success('Budget created successfully!');
            form.resetFields();
            onSuccess?.();
            onClose();
        } catch (error) {
            console.error('Create budget error:', error);
            if (error.message.includes('Unauthorized')) {
                message.error('Session expired. Please login again');
                navigate('/login');
            } else {
                message.error(error.message || 'Failed to create budget');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            title="Create New Budget"
            footer={null}
            width={600}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="name"
                    label="Budget Name"
                    rules={[{ required: true, message: 'Please enter budget name' }]}
                >
                    <Input placeholder="Enter budget name" />
                </Form.Item>

                <Form.Item
                    name="limitAmount"
                    label="Limit Amount"
                    rules={[{ required: true, message: 'Please enter limit amount' }]}
                >
                    <InputNumber
                        className="w-full"
                        min={0}
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                </Form.Item>

                <Form.Item
                    name="dateRange"
                    label="Budget Period"
                    rules={[{ required: true, message: 'Please select date range' }]}
                >
                    <DatePicker.RangePicker
                        className="w-full"
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                    />
                </Form.Item>

                <div className="flex justify-end gap-2">
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                    >
                        Create Budget
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default CreateBudgetModal;