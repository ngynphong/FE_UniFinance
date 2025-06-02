import React from "react";
import { Progress } from "antd";

const getStatusColor = (percent) => {
    if (percent < 80) return "#22c55e"; // xanh lá
    if (percent < 100) return "#f59e42"; // cam
    return "#ef4444"; // đỏ
};

const BudgetCategoryItem = ({ category }) => {
    const { name, current, budget } = category;
    const percent = Math.round((current / budget) * 100);
    const color = getStatusColor(percent);
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center bg-white rounded shadow p-3 border border-gray-100 gap-2">
            <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1 gap-1">
                    <span className="font-medium text-gray-700">{name}</span>
                    <span className={`text-xs font-semibold ${percent >= 100 ? 'text-red-500' : percent >= 80 ? 'text-orange-500' : 'text-green-600'}`}>{percent}%</span>
                </div>
                <Progress percent={percent} showInfo={false} strokeColor={color} trailColor="#f3f4f6" />
                <div className="text-xs text-gray-500 mt-1">${current} / ${budget}</div>
            </div>
        </div>
    );
};

export default BudgetCategoryItem; 