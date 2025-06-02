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
            bodyStyle={{ padding: '16px 8px' }}
        >
            <Form form={form} layout="vertical" className="space-y-2">
                <Form.Item name="name" label="Name" rules={[{ required: true }]}
                    className="mb-2">
                    <Input className="py-2" />
                </Form.Item>
                <Form.Item name="amount" label="Target Amount" rules={[{ required: true }]}
                    className="mb-2">
                    <InputNumber min={0} className="w-full py-2" />
                </Form.Item>
                <Form.Item name="current" label="Current" className="mb-2">
                    <InputNumber min={0} className="w-full py-2" />
                </Form.Item>
                <Form.Item name="deadline" label="Deadline" rules={[{ required: true }]}
                    className="mb-2">
                    <DatePicker className="w-full py-2" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default GoalTargetModal;