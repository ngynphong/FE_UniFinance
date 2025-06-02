import React, { useState } from "react";
import { Modal, Form, InputNumber, Button, Card } from "antd";

const initialCategories = [
    { name: "Food & Groceries", current: 480, budget: 600 },
    { name: "Entertainment", current: 350, budget: 300 },
    { name: "Transportation", current: 230, budget: 300 },
    { name: "Bills & Utilities", current: 380, budget: 400 },
];

const UpdateBudgetModal = ({ open, onClose }) => {
    const [form] = Form.useForm();
    const [categories, setCategories] = useState(initialCategories);
    const [totalBudget, setTotalBudget] = useState(2500);

    const handleCategoryChange = (value, idx) => {
        const newCats = [...categories];
        newCats[idx].budget = value;
        setCategories(newCats);
    };

    const handleSubmit = () => {
        // Fake submit, sau này call API
        onClose();
    };

    const allocated = categories.reduce((sum, c) => sum + Number(c.budget), 0);
    const unallocated = totalBudget - allocated;
    const allocatedPercent = Math.round((allocated / totalBudget) * 100);

    return (
        <Modal
            open={open}
            onCancel={onClose}
            title="Update Budget"
            footer={null}
            width={700}
        >
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                    <Form layout="vertical" form={form} onFinish={handleSubmit}>
                        <Form.Item label="Monthly Budget Amount">
                            <InputNumber
                                min={0}
                                value={totalBudget}
                                onChange={setTotalBudget}
                                className="w-full"
                            />
                        </Form.Item>
                        <div className="mb-2 font-semibold text-gray-700">Budget Categories</div>
                        {categories.map((cat, idx) => (
                            <div key={cat.name} className="flex items-center gap-2 mb-2">
                                <span className="w-36 text-gray-600">{cat.name}</span>
                                <InputNumber
                                    min={0}
                                    value={cat.budget}
                                    onChange={val => handleCategoryChange(val, idx)}
                                    className="w-32"
                                />
                                <span className="text-xs text-gray-400 ml-2">Current: ${cat.current}</span>
                            </div>
                        ))}
                        <div className="flex gap-2 mt-6">
                            <Button onClick={onClose}>Cancel</Button>
                            <Button type="primary" htmlType="submit">Save Changes</Button>
                        </div>
                    </Form>
                </div>
                <div className="w-full md:w-64">
                    <Card title="Budget Summary" bordered={false} className="bg-gray-50">
                        <div className="flex justify-between mb-2 text-sm">
                            <span>Total Budget:</span>
                            <span>${totalBudget}</span>
                        </div>
                        <div className="flex justify-between mb-2 text-sm">
                            <span>Allocated:</span>
                            <span className="text-green-600">${allocated}</span>
                        </div>
                        <div className="flex justify-between mb-2 text-sm">
                            <span>Unallocated:</span>
                            <span className="text-orange-500">${unallocated}</span>
                        </div>
                        <div className="flex justify-between mb-2 text-sm">
                            <span>Allocated Percentage:</span>
                            <span>{allocatedPercent}%</span>
                        </div>
                    </Card>
                </div>
            </div>
        </Modal>
    );
};

export default UpdateBudgetModal; 