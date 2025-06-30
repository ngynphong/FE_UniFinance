import { Button, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { categoryService } from "../../services/categoryService";
import { budgetService } from "../../services/budgetService";
import dayjs from "dayjs";

const TransactionItem = ({ transaction, onEdit, onDelete }) => {
    const { type, categoryId, budgetId, amount, dateCreate, description } = transaction;
    const [categoryName, setCategoryName] = useState("");
    const [budgetName, setBudgetName] = useState("");

    useEffect(() => {
        const fetchCategoryAndBudget = async () => {
            try {
                // Fetch category name
                const categories = await categoryService.getUserCategories();
                const category = categories.find(cat => cat.categoryId === categoryId);
                if (category) {
                    setCategoryName(category.categoryName);
                }

                // Fetch budget name
                const budgets = await budgetService.getBudgets();
                const budget = budgets.find(b => b.id === budgetId);
                if (budget) {
                    setBudgetName(budget.name);
                }
            } catch (error) {
                console.error("Error fetching category or budget:", error);
            }
        };

        fetchCategoryAndBudget();
    }, [categoryId, budgetId]);

    // Format date (Vietnamese style)
    const formattedDate = dayjs(dateCreate).format("DD/MM/YYYY");
    // Format amount as VND currency
    const formattedAmount = Number(amount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 px-2 hover:bg-gray-50 transition gap-2">
            <div className="flex items-center gap-3">
                <div>
                    <div className="font-medium text-gray-800">{categoryName}</div>
                    <div className="text-xs text-gray-500">{description}</div>
                    {budgetName && (
                        <div className="text-xs text-blue-500">Ngân sách: {budgetName}</div>
                    )}
                </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                <div className={`font-semibold ${type === "income" ? "text-green-600" : "text-red-500"}`}>
                    {type === "income" ? "+" : "-"}{formattedAmount}
                </div>
                <div className="text-xs text-gray-400 w-full sm:w-20">{formattedDate}</div>
                <div className="flex gap-2">
                    <Button className="text-blue-500 hover:underline" onClick={onEdit}><FaEdit /></Button>
                    <Popconfirm title="Xóa giao dịch này?" onConfirm={onDelete} okText="Xóa" cancelText="Hủy">
                        <Button danger><FaTrash /></Button>
                    </Popconfirm>
                </div>
            </div>
        </div>
    );
};

export default TransactionItem; 