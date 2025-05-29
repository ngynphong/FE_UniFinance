import React from "react";
import { Card, Progress } from "antd";

const budgetData = {
    total: 2500,
    spent: 1850.75,
};
const remaining = budgetData.total - budgetData.spent;
const spentPercent = Math.round((budgetData.spent / budgetData.total) * 100);
const remainPercent = 100 - spentPercent;

const BudgetSummary = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="text-center border-blue-500 border-t-4">
                <div className="text-gray-500 text-sm mb-1">Monthly Budget</div>
                <div className="text-2xl font-bold text-blue-600 mb-2">${budgetData.total.toLocaleString()}</div>
            </Card>
            <Card className="text-center border-green-500 border-t-4">
                <div className="text-gray-500 text-sm mb-1">Spent So Far</div>
                <div className="text-2xl font-bold text-green-600 mb-2">${budgetData.spent.toLocaleString()}</div>
                <Progress percent={spentPercent} showInfo={false} strokeColor="#22c55e" />
            </Card>
            <Card className="text-center border-orange-500 border-t-4">
                <div className="text-gray-500 text-sm mb-1">Remaining Budget</div>
                <div className="text-2xl font-bold text-orange-500 mb-2">${remaining.toLocaleString()}</div>
                <Progress percent={remainPercent} showInfo={false} strokeColor="#f59e42" />
            </Card>
        </div>
    );
};

export default BudgetSummary; 