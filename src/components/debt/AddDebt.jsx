import React from "react";
import { Form, Input, DatePicker, Button, message } from "antd";
import debtService from "../../services/debtService";
import DashboardLayout from "../layout/user/DashboardLayout";

const AddDebt = ({ onSuccess }) => {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        try {
            const debtData = {
                debtName: values.debtName,
                description: values.description,
                amount: parseFloat(values.amount),
                interestRate: parseFloat(values.interestRate),
                dueDate: values.dueDate.toISOString(),
            };

            await debtService.addDebt(debtData);
            message.success("Debt added successfully");
            form.resetFields();
            if (onSuccess) onSuccess();
        } catch (error) {
            message.error("Failed to add debt", error.message || "Please try again later.");
        }
    };

    return (
        <DashboardLayout>
            <h2 className="text-2xl font-bold mb-6">Add New Debt</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="debtName"
                    label="Debt Name"
                    rules={[{ required: true, message: "Please enter debt name" }]}
                >
                    <Input placeholder="Enter debt name" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                >
                    <Input.TextArea placeholder="Enter description" />
                </Form.Item>

                <Form.Item
                    name="amount"
                    label="Amount"
                    rules={[{ required: true, message: "Please enter amount" }]}
                >
                    <Input type="number" placeholder="Enter amount" />
                </Form.Item>

                <Form.Item
                    name="interestRate"
                    label="Interest Rate (%)"
                    rules={[{ required: true, message: "Please enter interest rate" }]}
                >
                    <Input type="number" placeholder="Enter interest rate" />
                </Form.Item>

                <Form.Item
                    name="dueDate"
                    label="Due Date"
                    rules={[{ required: true, message: "Please select due date" }]}
                >
                    <DatePicker className="w-full" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full">
                        Add Debt
                    </Button>
                </Form.Item>
            </Form>
        </DashboardLayout>
    );
};

export default AddDebt;