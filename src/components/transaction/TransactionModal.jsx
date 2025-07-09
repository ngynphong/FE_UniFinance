import React, { useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber, Select, DatePicker, TimePicker, Button, Divider, Space } from "antd";
import dayjs from "dayjs";
import { useAuth } from "../../components/auth/useAuthHook"; // Add this import
const { Option, OptGroup } = Select;
import { categoryService } from "../../services/categoryService";
import { PlusOutlined } from "@ant-design/icons";
import { budgetService } from "../../services/budgetService";
import debtService from "../../services/debtService";
import { goalService } from "../../services/goalService";

const TransactionModal = ({ open, onClose, onSave, editData }) => {
    const [form] = Form.useForm();
    const { user } = useAuth(); // Get user from auth context
    const [categories, setCategories] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [debts, setDebts] = useState([]);
    const [goals, setGoals] = useState([]);
    useEffect(() => {
        fetchCategories();
        fetchBudgets();
        fetchDebts();
        fetchGoals();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await categoryService.getUserCategories();
            console.log("Category", data)
            setCategories(data);
        } catch (error) {
            // message.error('Lỗi khi tải dữ liệu', error);
            console.log(error)
        }
    };

    const fetchBudgets = async () => {
        try {
            const data = await budgetService.getBudgets();
            setBudgets(data); // data là mảng budget
        } catch (error) {
            setBudgets([]);
            console.log(error)
        }
    };

    const fetchDebts = async () => {
        try {
            const data = await debtService.getAllDebts();
            setDebts(data);
        } catch {
            setDebts([]);
        }
    };

    const fetchGoals = async () => {
        try {
            const data = await goalService.getAllGoals();
            setGoals(data);
        } catch {
            setGoals([]);
        }
    };

    useEffect(() => {
        if (open && editData) {
            form.setFieldsValue({
                ...editData,
                date: dayjs(editData.date),
                time: editData.time ? dayjs(editData.time, "HH:mm") : dayjs(),
            });
        } else if (open) {
            form.setFieldsValue({ type: "income", date: dayjs(), time: dayjs(), account: "Wallet" });
        }
    }, [open, editData, form]);

    const handleFinish = (values) => {
        // Combine date and time
        const dateTime = values.date.clone()
            .hour(values.time ? values.time.hour() : 0)
            .minute(values.time ? values.time.minute() : 0)
            .second(0);

        const data = {
            userId: user?.userID, // Get userId from auth context
            amount: parseFloat(values.amount),
            description: values.description || "", // Use note as description
            categoryId: parseInt(values.categoryId) || null,
            budgetId: parseInt(values.budgetId) || null,
            debtId: parseInt(values.debtId) || null,
            goalTargetId: parseInt(values.goalTargetId) || null,
            dateCreate: dateTime.format('YYYY-MM-DDTHH:mm:ss'),
            type: values.type, // income or expense
            isDeleted: values.isDeleted ?? false
        };

        if (editData?.id) {
            data.id = editData.id;
            // Ensure we don't change the userId when updating
            data.userId = editData.userId;
        }

        onSave(data);
    };

    return (
        <Modal
            open={open}
            onCancel={() => {
                form.resetFields();
                onClose();
            }}
            title={editData ? "Sửa giao dịch" : "Tạo giao dịch"}
            footer={null}
            width={600}
        >
            <Form
                layout="vertical"
                form={form}
                onFinish={handleFinish}
                preserve={false}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                        label="Loại"
                        name="type"
                        rules={[{ required: true, message: 'Vui lòng chọn loại' }]}
                    >
                        <Select>
                            <Option value="income">Thu nhập</Option>
                            <Option value="expense">Chi phí</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Loại ngân sách" required>
                        <Form.Item
                            name="categoryId"
                            noStyle
                            rules={[{ required: true, message: 'Vui lòng chọn loại ngân sách' }]}
                        >
                            <Select
                                placeholder="Chọn loại ngân sách"
                            >
                                {categories
                                    .map(cat => (
                                        <Select.Option key={cat.categoryId} value={cat.categoryId}>
                                            {cat.categoryName}
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item
                        label="Số tiền"
                        name="amount"
                        rules={[{ required: true, message: 'Vui lòng nhập số tiền' }]}
                    >
                        <InputNumber
                            className="w-full"
                            min={0}
                            placeholder="Nhập số tiền"
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Ngày"
                        name="date"
                        rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}
                    >
                        <DatePicker
                            className="w-full"
                            format="YYYY-MM-DD HH:mm:ss"
                            showTime
                        />
                    </Form.Item>

                    <Form.Item
                        label="Ngân sách"
                        name="budgetId"
                    >
                        <Select placeholder="Chọn ngân sách">
                            {(budgets || []).map((budget) => (
                                <Select.Option key={budget.id} value={budget.id}>
                                    {budget.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Khoản nợ (nếu có)"
                        name="debtId"
                    >
                        <Select allowClear placeholder="Chọn khoản nợ">
                            {(debts || []).map(debt => (
                                <Select.Option key={debt.debtId} value={debt.debtId}>
                                    {debt.debtName || debt.name || `Nợ #${debt.debtId}`}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Mục tiêu tài chính (nếu có)"
                        name="goalTargetId"
                    >
                        <Select allowClear placeholder="Chọn mục tiêu tài chính">
                            {(goals || []).map(goal => (
                                <Select.Option key={goal.goalTargetId || goal.id} value={goal.goalTargetId || goal.id}>
                                    {goal.goal || `Mục tiêu #${goal.goalTargetId || goal.id}`}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {/* <Form.Item
                        label="Đánh dấu đã xoá?"
                        name="isDeleted"
                        valuePropName="checked"
                        initialValue={false}
                    >
                        <Select>
                            <Option value={false}>Chưa xoá</Option>
                            <Option value={true}>Đã xoá</Option>
                        </Select>
                    </Form.Item> */}
                </div>

                <Form.Item
                    label="Mô tả"
                    name="description"
                >
                    <Input.TextArea rows={2} placeholder="Nhập mô tả" />
                </Form.Item>

                <div className="flex justify-end gap-2 mt-4">
                    <Button onClick={onClose}>Hủy</Button>
                    <Button type="primary" htmlType="submit">
                        {editData ? "Sửa" : "Tạo"}
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default TransactionModal;
