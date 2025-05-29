import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber, Select, DatePicker, TimePicker, Button } from "antd";
import dayjs from "dayjs";

const { Option, OptGroup } = Select;

const categoryOptions = [
    // Income
    { value: "Salary", label: "Salary", icon: "💼", type: "income" },
    { value: "Freelance", label: "Freelance", icon: "🧑‍💻", type: "income" },
    { value: "Bank Interest", label: "Bank Interest", icon: "🏦", type: "income" },
    { value: "Gift", label: "Gift", icon: "🎁", type: "income" },
    { value: "Investment", label: "Investment", icon: "📈", type: "income" },
    // Expense
    { value: "Food", label: "Food", icon: "🍔", type: "expense" },
    { value: "Transport", label: "Transport", icon: "🚌", type: "expense" },
    { value: "Shopping", label: "Shopping", icon: "👕", type: "expense" },
    { value: "Bills", label: "Bills", icon: "🧾", type: "expense" },
    { value: "Health", label: "Health", icon: "💊", type: "expense" },
    { value: "Education", label: "Education", icon: "🎓", type: "expense" },
    { value: "Entertainment", label: "Entertainment", icon: "🎮", type: "expense" },
    { value: "Travel", label: "Travel", icon: "✈️", type: "expense" },
    { value: "Other", label: "Other", icon: "🔖", type: "expense" },
];

const accountOptions = [
    { value: "Wallet", label: "Wallet", icon: "👛" },
    { value: "Bank", label: "Bank account", icon: "🏦" },
    { value: "Credit Card", label: "Credit card", icon: "💳" },
    { value: "Cash", label: "Cash", icon: "💵" },
];

const TransactionModal = ({ open, onClose, onSave, editData }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (editData) {
            form.setFieldsValue({
                ...editData,
                date: dayjs(editData.date),
                time: editData.time ? dayjs(editData.time, "HH:mm") : dayjs(),
            });
        } else {
            form.resetFields();
            form.setFieldsValue({ type: "income", date: dayjs(), time: dayjs(), account: "Wallet" });
        }
    }, [editData, form]);

    const handleFinish = (values) => {
        const cat = categoryOptions.find(c => c.value === values.category && c.type === values.type);
        const acc = accountOptions.find(a => a.value === values.account);
        onSave({
            ...editData,
            ...values,
            date: values.date.format("YYYY-MM-DD"),
            time: values.time ? values.time.format("HH:mm") : "",
            icon: cat ? cat.icon : "💸",
            accountIcon: acc ? acc.icon : "💵",
        });
        form.resetFields();
    };

    // Lọc category theo loại
    // const filteredCategories = categoryOptions.filter(c => c.type === form.getFieldValue("type"));

    return (
        <Modal
            open={open}
            onCancel={onClose}
            title={editData ? "Edit Transaction" : "New Transaction"}
            footer={null}
            width={600}
        >
            <Form layout="vertical" form={form} onFinish={handleFinish}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item label="Type" name="type" rules={[{ required: true }]}>
                        <Select>
                            <Option value="income">Income</Option>
                            <Option value="expense">Expense</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Category" name="category" rules={[{ required: true }]}>
                        <Select placeholder="Select category">
                            <OptGroup label="Income">
                                {categoryOptions.filter(c => c.type === "income").map(cat => (
                                    <Option key={cat.value} value={cat.value}>{cat.icon} {cat.label}</Option>
                                ))}
                            </OptGroup>
                            <OptGroup label="Expense">
                                {categoryOptions.filter(c => c.type === "expense").map(cat => (
                                    <Option key={cat.value} value={cat.value}>{cat.icon} {cat.label}</Option>
                                ))}
                            </OptGroup>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Value" name="amount" rules={[{ required: true, message: "Enter value" }]}>
                        <InputNumber min={0} className="w-full" suffix="$" placeholder="Enter Value" />
                    </Form.Item>
                    <Form.Item label="Account" name="account" rules={[{ required: true }]}>
                        <Select placeholder="Select account">
                            {accountOptions.map(acc => (
                                <Option key={acc.value} value={acc.value}>{acc.icon} {acc.label}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Date" name="date" rules={[{ required: true }]}>
                        <DatePicker className="w-full" />
                    </Form.Item>
                    <Form.Item label="Time" name="time" rules={[{ required: true }]}>
                        <TimePicker className="w-full" format="HH:mm" />
                    </Form.Item>
                </div>
                <Form.Item label="From" name="from">
                    <Input placeholder="From (optional)" />
                </Form.Item>
                <Form.Item label="Notes" name="note">
                    <Input.TextArea rows={2} placeholder="Notes (optional)" />
                </Form.Item>
                <div className="flex gap-2 justify-end mt-4">
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="primary" htmlType="submit">{editData ? "Save" : "Save"}</Button>
                </div>
            </Form>
        </Modal>
    );
};

export default TransactionModal;
