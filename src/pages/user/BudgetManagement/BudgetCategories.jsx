import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import BudgetCategoryItem from "../../../components/budget/BudgetCategoryItem";

const categories = [
    { name: "Food & Groceries", current: 480, budget: 600 },
    { name: "Entertainment", current: 350, budget: 300 },
    { name: "Transportation", current: 230, budget: 300 },
    { name: "Bills & Utilities", current: 380, budget: 400 },
];

const BudgetCategories = ({ onAddCategory }) => {
    return (
        <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-700">Budget Categories</h4>
                <Button type="primary" className="" icon={<PlusOutlined />} onClick={onAddCategory}>
                    Add New Budget Category
                </Button>
            </div>
            <div className="space-y-3">
                {categories.map((cat) => (
                    <BudgetCategoryItem key={cat.name} category={cat} />
                ))}
            </div>
        </div>
    );
};

export default BudgetCategories; 