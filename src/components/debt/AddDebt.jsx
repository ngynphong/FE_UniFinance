import React from "react";
import { Form, Input, DatePicker, Button, message, Card } from "antd";
import debtService from "../../services/debtService";
import DashboardLayout from "../layout/user/DashboardLayout";

const AddDebt = ({ onSuccess }) => {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        try {
            const debtData = {
                debtName: values.debtName,
                description: values.description,
                principal: parseFloat(values.amount),
                interestRate: parseFloat(values.interestRate),
                dueDate: values.dueDate.toISOString(),
            };

            await debtService.addDebt(debtData);
            message.success("Thêm khoản nợ thành công");
            form.resetFields();
            if (onSuccess) onSuccess();
        } catch (error) {
            message.error("Thêm khoản nợ thất bại", error.message || "Vui lòng thử lại sau.");
        }
    };

    return (
        <DashboardLayout>
            <h2 className="text-2xl font-bold mb-6">Thêm khoản nợ mới</h2>
            <Card className="w-full md:w-1/2 mx-auto">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="debtName"
                        label="Tên khoản nợ"
                        rules={[{ required: true, message: "Vui lòng nhập tên khoản nợ" }]}
                    >
                        <Input placeholder="Nhập tên khoản nợ" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Mô tả"
                    >
                        <Input.TextArea placeholder="Nhập mô tả" />
                    </Form.Item>

                    <Form.Item
                        name="amount"
                        label="Số tiền"
                        rules={[{ required: true, message: "Vui lòng nhập số tiền" }]}
                    >
                        <Input type="number" placeholder="Nhập số tiền" />
                    </Form.Item>

                    <Form.Item
                        name="interestRate"
                        label="Lãi suất (%)"
                        rules={[{ required: true, message: "Vui lòng nhập lãi suất" }]}
                    >
                        <Input type="number" placeholder="Nhập lãi suất" />
                    </Form.Item>

                    <Form.Item
                        name="dueDate"
                        label="Ngày đến hạn"
                        rules={[{ required: true, message: "Vui lòng chọn ngày đến hạn" }]}
                    >
                        <DatePicker
                            className="w-full"
                            placeholder="Chọn ngày đến hạn"
                            format="DD/MM/YYYY"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full">
                            Thêm khoản nợ
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </DashboardLayout>
    );
};

export default AddDebt;