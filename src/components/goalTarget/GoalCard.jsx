import React from 'react';
import { Button, Popconfirm, Progress, Card } from 'antd';
import { FaTrash, FaEdit } from "react-icons/fa";

const GoalCard = ({ goal, onEdit, onDelete }) => {
    const percent = goal.amount > 0
        ? Math.min(100, Math.round((goal.currentSpending / goal.amount) * 100))
        : 0;

    return (
        <Card
            className="w-full hover:shadow-lg transition-shadow duration-200"
            actions={[
                <Button
                    key="edit"
                    type="text"
                    className='text-blue-500'
                    onClick={() => onEdit(goal)}
                    icon={<FaEdit />}
                />,
                <Popconfirm
                    key="delete"
                    title="Xóa mục tiêu?"
                    onConfirm={() => onDelete(goal.id)}
                >
                    <Button
                        type="text"
                        className='text-red-500'
                        icon={<FaTrash />}
                    />
                </Popconfirm>
            ]}
        >
            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            {goal.goal}
                        </h3>
                        <p className="text-gray-500 text-sm">
                            Ngày mục tiêu: {goal.targetDate}
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                            {goal.amount.toLocaleString()} đ
                        </div>
                        <div className="text-sm text-gray-500">
                            Hiện tại: {goal.currentSpending.toLocaleString()}
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Progress
                        percent={percent}
                        status={percent >= 100 ? "success" : "active"}
                        strokeColor={{
                            '0%': '#1890ff',
                            '100%': '#52c41a',
                        }}
                    />
                    <p className="text-sm text-gray-500 text-right">
                        {percent}% Hoàn thành
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default GoalCard;