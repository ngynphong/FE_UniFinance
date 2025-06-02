import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, DatePicker } from 'antd';
import dayjs from 'dayjs';

const GoalTargetModal = ({ open, goal, onClose, onSave }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (goal) {
            form.setFieldsValue({
                ...goal,
                deadline: goal.deadline ? dayjs(goal.deadline) : null,
            });
        } else {
            form.resetFields();
        }
    }, [goal, form]);

    const handleOk = () => {
        form.validateFields().then(values => {
            onSave({
                ...goal,
                ...values,
                deadline: values.deadline ? values.deadline.format('YYYY-MM-DD') : '',
            });
            form.resetFields();
        });
    };

    return (
        <Modal
            open={open}
            title={goal ? 'Edit Goal Target' : 'Add Goal Target'}
            onCancel={onClose}
            onOk={handleOk}
            okText="Save"
        >
            <Form form={form} layout="vertical">
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="amount" label="Target Amount" rules={[{ required: true }]}>
                    <InputNumber min={0} className="w-full" />
                </Form.Item>
                <Form.Item name="current" label="Current">
                    <InputNumber min={0} className="w-full" />
                </Form.Item>
                <Form.Item name="deadline" label="Deadline" rules={[{ required: true }]}>
                    <DatePicker className="w-full" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default GoalTargetModal;