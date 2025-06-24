import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, DatePicker, Button, message } from "antd";
import { budgetService } from "../../services/budgetService";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import moment from 'moment';

const UpdateBudgetModal = ({ open, onClose, budget, onSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleSubmit = async (values) => {
        if (!isAuthenticated) {
            message.error('Vui lòng đăng nhập để cập nhật ngân sách');
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
                status: budget.status || 0
            };

            await budgetService.updateBudget(budget.id, budgetData);
            message.success('Cập nhật ngân sách thành công!');
            form.resetFields();
            onSuccess?.();
            onClose();
        } catch (error) {
            console.error('Update budget error:', error);
            if (error.message.includes('Unauthorized')) {
                message.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại');
                navigate('/login');
            } else {
                message.error(error.message || 'Cập nhật ngân sách thất bại');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            title="Cập nhật ngân sách"
            footer={null}
            width={600}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                    name: budget?.name,
                    limitAmount: budget?.limitAmount,
                    dateRange: budget ? [
                        moment(budget.startDate),
                        moment(budget.endDate)
                    ] : undefined
                }}
            >
                <Form.Item
                    name="name"
                    label="Tên ngân sách"
                    rules={[{ required: true, message: 'Vui lòng nhập tên ngân sách' }]}
                >
                    <Input placeholder="Nhập tên ngân sách" />
                </Form.Item>

                <Form.Item
                    name="limitAmount"
                    label="Số tiền giới hạn"
                    rules={[{ required: true, message: 'Vui lòng nhập số tiền giới hạn' }]}
                >
                    <InputNumber
                        className="w-full"
                        min={0}
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VNĐ'}
                        parser={value => value.replace(/\s?VNĐ|(,*)/g, '')}
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
                        format="DD/MM/YYYY HH:mm:ss"
                        placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                    />
                </Form.Item>

                <div className="flex justify-end gap-2">
                    <Button onClick={onClose}>Hủy</Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                    >
                        Cập nhật ngân sách
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default UpdateBudgetModal;