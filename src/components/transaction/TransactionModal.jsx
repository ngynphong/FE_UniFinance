import React, { useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber, Select, DatePicker, TimePicker, Button, message, Divider, Space } from "antd";
import dayjs from "dayjs";
import { useAuth } from "../../components/auth/useAuthHook"; // Add this import
const { Option, OptGroup } = Select;
import { categoryService } from "../../services/categoryService";
import { PlusOutlined } from "@ant-design/icons";
import { budgetService } from "../../services/budgetService";

const TransactionModal = ({ open, onClose, onSave, editData }) => {
    const [form] = Form.useForm();
    const { user } = useAuth(); // Get user from auth context
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [addingCategory, setAddingCategory] = useState(false);
    const [budgets, setBudgets] = useState([]);
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await categoryService.getUserCategories();
            setCategories(data);
        } catch (error) {
            message.error('Lỗi khi tải dữ liệu', error);
        }
    };

    useEffect(() => {
        // Gọi API lấy danh sách budget
        const fetchBudgets = async () => {
            try {
                const data = await budgetService.getBudgets();
                setBudgets(data); // data là mảng budget
            } catch (error) {
                setBudgets([]);
                console.log(error)
            }
        };
        fetchBudgets();
    }, []);

    const handleAddCategory = async () => {
        try {
            const newCategory = await categoryService.createCategory({
                userId: user?.userID,
                categoryName: newCategoryName,
                type: form.getFieldValue('type'), // income/expense
                description: ''
            });

            setCategories(prev => [...prev, newCategory]);
            form.setFieldValue('categoryId', newCategory.id);
            setNewCategoryName('');
            setAddingCategory(false);
            message.success('Loại ngân sách được tạo thành công');
        } catch (error) {
            console.error('Error adding category:', error);
            message.error('Lỗi khi thêm loại ngân sách', error);
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
            categoryId: parseInt(values.categoryId) || 0,
            budgetId: parseInt(values.budgetId) || 0,
            dateCreate: dateTime.format('YYYY-MM-DDTHH:mm:ss'),
            type: values.type // income or expense
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
                        rules={[{ required: true, message: 'Vui lọng chọn loại' }]}
                    >
                        <Select>
                            <Option value="income">Thu nhập</Option>
                            <Option value="expense">Chi phí</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Loại ngân sách" required>
                        <Space.Compact block>
                            <Form.Item
                                name="categoryId"
                                noStyle
                                rules={[{ required: true, message: 'Please select or add category' }]}
                            >
                                <Select
                                    style={{ width: addingCategory ? '69%' : '100%' }}
                                    placeholder="Chọn loại ngân sách"
                                    popupRender={menu => (
                                        <>
                                            {menu}
                                            <Divider style={{ margin: '8px 0' }} />
                                            <Button
                                                type="text"
                                                icon={<PlusOutlined />}
                                                onClick={() => setAddingCategory(true)}
                                                block
                                            >
                                                Thêm loại ngân sách
                                            </Button>
                                        </>
                                    )}
                                >
                                    {categories
                                        .filter(cat => cat.type === form.getFieldValue('type'))
                                        .map(cat => (
                                            <Select.Option key={cat.categoryId} value={cat.categoryId}>
                                                {cat.categoryName}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Space.Compact>
                        {addingCategory && (
                            <Space.Compact block className="mt-2">
                                <Input
                                    value={newCategoryName}
                                    onChange={e => setNewCategoryName(e.target.value)}
                                    placeholder="Thêm loại ngân sách"
                                />
                                <Button type="primary" onClick={handleAddCategory}>
                                    Thêm
                                </Button>
                                <Button
                                    onClick={() => {
                                        setAddingCategory(false);
                                        setNewCategoryName('');
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Space.Compact>
                        )}
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
                        <DatePicker className="w-full" />
                    </Form.Item>

                    <Form.Item
                        label="Ngân sách"
                        name="budgetId"
                    >
                        <Select placeholder="Chọn ngân sách">
                            {budgets.map((budget) => (
                                <Select.Option key={budget.id} value={budget.id}>
                                    {budget.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>

                <Form.Item
                    label="Mô tả"
                    name="description"
                >
                    <Input.TextArea rows={2} placeholder="Nhập mô tả" />
                </Form.Item>

                <div className="flex justify-end gap-2 mt-4">
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="primary" htmlType="submit">
                        {editData ? "Sửa" : "Tạo"}
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default TransactionModal;
