import React, { useState, useEffect } from "react";
import { Card, Progress, Spin, Button, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { budgetService } from "../../services/budgetService";

const BudgetSummary = ({ onEdit, onRefresh, refresh }) => {
    const [loading, setLoading] = useState(true);
    const [budgets, setBudgets] = useState([]);

    useEffect(() => {
        fetchBudgets();
    }, [refresh]);

    const fetchBudgets = async () => {
        try {
            setLoading(true);
            const data = await budgetService.getBudgets();
            setBudgets(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Fetch budgets error:', error);
            message.error(error.message || 'Failed to fetch budgets');
            setBudgets([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await budgetService.deleteBudget(id);
            message.success('Budget deleted successfully');
            fetchBudgets();
            onRefresh?.();
        } catch (error) {
            message.error('Failed to delete budget', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {budgets.map((budget) => (
                <div
                    key={budget.id}
                    className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl border-l-8 border-blue-400 transition-all duration-200 p-6 max-w-md mx-auto flex flex-col justify-between min-h-[180px]"
                >
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="inline-block w-3 h-3 rounded-full bg-blue-400"></span>
                            <span className="text-xl font-extrabold text-blue-700 tracking-tight">{budget.name}</span>
                        </div>
                        <div className="text-2xl font-bold text-green-500 mb-1">${budget.limitAmount?.toLocaleString()}</div>
                        <div className="text-xs text-gray-400 mb-2">
                            {new Date(budget.startDate).toLocaleDateString()} - {new Date(budget.endDate).toLocaleDateString()}
                        </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                        <button
                            className="bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full p-2 shadow transition"
                            onClick={() => onEdit(budget)}
                            title="Edit"
                        >
                            <EditOutlined />
                        </button>
                        <Popconfirm
                            title="Delete this budget?"
                            onConfirm={() => handleDelete(budget.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <button
                                className="bg-red-50 hover:bg-red-100 text-red-500 rounded-full p-2 shadow transition"
                                title="Delete"
                            >
                                <DeleteOutlined />
                            </button>
                        </Popconfirm>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BudgetSummary;