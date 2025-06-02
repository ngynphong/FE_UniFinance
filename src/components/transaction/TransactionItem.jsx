import { Button, Popconfirm } from "antd";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TransactionItem = ({ transaction, onEdit, onDelete }) => {
    const { type, category, amount, date, note, icon } = transaction;
    return (
        <div className="flex flex-col sm:flex-row sm:items- justify-between py-3 px-2 hover:bg-gray-50 transition gap-2">
            <div className="flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <div>
                    <div className="font-medium text-gray-800">{category}</div>
                    <div className="text-xs text-gray-500">{note}</div>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                <div className={`font-semibold ${type === "income" ? "text-green-600" : "text-red-500"}`}>{type === "income" ? "+" : "-"}${amount}</div>
                <div className="text-xs text-gray-400 w-full sm:w-20">{date}</div>
                <div className="flex gap-2">
                    <Button className="text-blue-500 hover:underline" onClick={onEdit}><FaEdit /></Button>
                    <Popconfirm title="Delete this goal?" onConfirm={onDelete}>
                        <Button danger><FaTrash /></Button>
                    </Popconfirm>
                </div>
            </div>
        </div>
    );
};

export default TransactionItem; 