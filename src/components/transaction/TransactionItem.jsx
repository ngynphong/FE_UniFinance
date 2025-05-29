import { Button, Popconfirm } from "antd";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TransactionItem = ({ transaction, onEdit, onDelete }) => {
    const { type, category, amount, date, note, icon } = transaction;
    return (
        <div className="flex items-center justify-between py-3 px-2 hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <div>
                    <div className="font-medium text-gray-800">{category}</div>
                    <div className="text-xs text-gray-500">{note}</div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className={`font-semibold ${type === "income" ? "text-green-600" : "text-red-500"}`}>{type === "income" ? "+" : "-"}${amount}</div>
                <div className="text-xs text-gray-400 w-20 text-right">{date}</div>
                <Button className="text-blue-500 hover:underline text-xs" onClick={onEdit}><FaEdit /></Button>
                <Popconfirm title="Delete this goal?" onConfirm={onDelete}>
                    <Button size="small" danger><FaTrash /></Button>
                </Popconfirm>
            </div>
        </div>
    );
};

export default TransactionItem; 