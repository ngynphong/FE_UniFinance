import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, DatePicker } from 'antd';
import dayjs from 'dayjs';

const GoalTargetModal = ({ open, onClose, onSave, goal }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open && goal) {
            form.setFieldsValue({
                ...goal,
                targetDate: dayjs(goal.targetDate)
            });
        } else if (open) {
            form.resetFields();
        }
    }, [open, goal, form]);

    const handleSubmit = (values) => {
        const data = {
            ...values,
            targetDate: values.targetDate.format('YYYY-MM-DD'),
        };

        if (goal?.id) {
            data.id = goal.id;
        }

        onSave(data);
    };

    return (
        <Modal
            open={open}
            title={goal ? 'Sửa mục tiêu' : 'Tạo mới mục tiêu'}
            onCancel={() => {
                form.resetFields();
                onClose();
            }}
            onOk={() => form.submit()}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                preserve={false}
            >
                <Form.Item
                    name="goal"
                    label="Tên mục tiêu"
                    rules={[{ required: true, message: 'Làm ơn nhập tên mục tiêu' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="amount"
                    label="Tiền mục tiêu"
                    rules={[{ required: true, message: 'Làm nhơn nhập tiền mục tiêu' }]}
                >
                    <InputNumber
                        className="w-full"
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                </Form.Item>

                <Form.Item
                    name="targetDate"
                    label="Ngày mục tiêu"
                    rules={[{ required: true, message: 'Làm nhơn nhập ngày mục tiêu' }]}
                >
                    <DatePicker className="w-full" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default GoalTargetModal;