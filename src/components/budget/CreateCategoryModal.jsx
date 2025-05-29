import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Select, Button, Switch, Card } from "antd";
import { AppstoreOutlined, CarOutlined, ShoppingOutlined, SmileOutlined, ThunderboltOutlined } from "@ant-design/icons";

const iconOptions = [
    { value: "food", icon: <AppstoreOutlined />, label: "Food" },
    { value: "entertainment", icon: <SmileOutlined />, label: "Entertainment" },
    { value: "transport", icon: <CarOutlined />, label: "Transport" },
    { value: "shopping", icon: <ShoppingOutlined />, label: "Shopping" },
    { value: "utilities", icon: <ThunderboltOutlined />, label: "Utilities" },
];

const CreateCategoryModal = ({ open, onClose }) => {
    const [form] = Form.useForm();
    const [icon, setIcon] = useState("food");
    const [alert, setAlert] = useState(true);
    const [percent, setPercent] = useState(80);

    const handleSubmit = (values) => {
        // Fake submit, sau này call API
        onClose();
    };

    const preview = form.getFieldsValue();
    const selectedIcon = iconOptions.find(i => i.value === icon)?.icon;

    return (
        <Modal
            open={open}
            onCancel={onClose}
            title="Create Budget Category"
            footer={null}
            width={700}
        >
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                    <Form layout="vertical" form={form} onFinish={handleSubmit} initialValues={{ icon: "food", time: "Monthly" }}>
                        <Form.Item label="Category Name" name="name" rules={[{ required: true, message: "Please enter category name" }]}>
                            <Input placeholder="Enter Category Name" />
                        </Form.Item>
                        <Form.Item label="Category Icon (Optional)" name="icon">
                            <Select
                                value={icon}
                                onChange={setIcon}
                                className="w-full"
                                options={iconOptions.map(i => ({ value: i.value, label: <span className="flex items-center gap-2">{i.icon}{i.label}</span> }))}
                            />
                        </Form.Item>
                        <Form.Item label="Budget Amount" name="amount" rules={[{ required: true, message: "Please enter amount" }]}>
                            <InputNumber min={0} className="w-full" placeholder="$ 0.00" />
                        </Form.Item>
                        <Form.Item label="Time Period" name="time">
                            <Select options={[{ value: "Monthly", label: "Monthly" }, { value: "Weekly", label: "Weekly" }]} />
                        </Form.Item>
                        <Form.Item label="Description (Optional)" name="desc">
                            <Input.TextArea rows={2} placeholder="Add more about this budget category" />
                        </Form.Item>
                        <div className="flex items-center gap-2 mb-4">
                            <Switch checked={alert} onChange={setAlert} />
                            <span className="text-gray-600 text-sm">Enable alert for this category</span>
                            {alert && (
                                <InputNumber
                                    min={1}
                                    max={100}
                                    value={percent}
                                    onChange={setPercent}
                                    className="w-20 ml-2"
                                />
                            )}
                            {alert && <span className="text-gray-600 text-sm">% of budget</span>}
                        </div>
                        <div className="flex gap-2 mt-6">
                            <Button onClick={onClose}>Cancel</Button>
                            <Button type="primary" htmlType="submit">Save Changes</Button>
                        </div>
                    </Form>
                </div>
                <div className="w-full md:w-72">
                    <Card title="Preview" bordered={false} className="bg-gray-50">
                        <div className="flex items-center gap-2 mb-2">
                            {selectedIcon}
                            <span className="font-semibold text-gray-700">{preview.name || "Sample"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm mb-2">
                            <span>${preview.amount || 0} / ${preview.amount || 0}</span>
                            <span className="text-green-600">0%</span>
                        </div>
                        <div className="text-xs text-gray-500 mb-2">{preview.desc || "Description"}</div>
                        <div className="flex gap-2">
                            <Button size="small" danger>Delete</Button>
                            <Button size="small" type="primary">Edit</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </Modal>
    );
};

export default CreateCategoryModal; 