import React, { useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber, Select, DatePicker, Button } from "antd";
import dayjs from "dayjs";
import { useAuth } from "../../components/auth/useAuthHook";
import { categoryService } from "../../services/categoryService";
import { budgetService } from "../../services/budgetService";
import debtService from "../../services/debtService";
import { goalService } from "../../services/goalService";

const { Option } = Select;

const TransactionModal = ({ open, onClose, onSave, editData }) => {
    const [form] = Form.useForm();
    const { user } = useAuth();
    const [categories, setCategories] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [debts, setDebts] = useState([]);
    const [goals, setGoals] = useState([]);
    const [transactionType, setTransactionType] = useState('income');

    useEffect(() => {
        if (open) {
            fetchCategories();
            fetchBudgets();
            fetchDebts();
            fetchGoals();
            if (editData) {
                form.setFieldsValue({
                    ...editData,
                    date: dayjs(editData.dateCreate),
                });
                setTransactionType(editData.type);
            } else {
                form.setFieldsValue({ type: "income", date: dayjs(), isDeleted: false });
                setTransactionType('income');
            }
        }
    }, [open, editData, form]);

    const fetchCategories = async () => {
        try {
            const data = await categoryService.getUserCategories();
            setCategories(data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchBudgets = async () => {
        try {
            const data = await budgetService.getBudgets();
            setBudgets(data);
        } catch (error) {
            setBudgets([]);
            console.log(error);
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

    const handleFinish = (values) => {
        const data = {
            userId: user?.userID,
            amount: parseFloat(values.amount),
            description: values.description || "",
            categoryId: parseInt(values.categoryId) || null,
            budgetId: transactionType === 'expense' ? (parseInt(values.budgetId) || null) : null,
            debtId: transactionType === 'expense' ? (parseInt(values.debtId) || null) : null,
            goalTargetId: transactionType === 'income' ? (parseInt(values.goalTargetId) || null) : null,
            dateCreate: values.date.format('YYYY-MM-DDTHH:mm:ss'),
            type: values.type,
            isDeleted: values.isDeleted ?? false
        };

        if (editData?.id) {
            data.id = editData.id;
            data.userId = editData.userId;
        }

        onSave(data);
    };

    const handleValuesChange = (changedValues) => {
        if (changedValues.type) {
            setTransactionType(changedValues.type);
        }
    }

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
                onValuesChange={handleValuesChange}
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

                    <Form.Item label="Loại ngân sách" name="categoryId" rules={[{ required: true, message: 'Vui lòng chọn loại ngân sách' }]}>
                        <Select placeholder="Chọn loại ngân sách">
                            {categories.map(cat => (
                                <Select.Option key={cat.categoryId} value={cat.categoryId}>
                                    {cat.categoryName}
                                </Select.Option>
                            ))}
                        </Select>
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
                            format="DD/MM/YYYY HH:mm"
                            showTime
                        />
                    </Form.Item>

                    {transactionType === 'expense' && (
                        <>
                            <Form.Item
                                label="Ngân sách"
                                name="budgetId"
                            >
                                <Select placeholder="Chọn ngân sách" allowClear>
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
                        </>
                    )}

                    {transactionType === 'income' && (
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
                    )}
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