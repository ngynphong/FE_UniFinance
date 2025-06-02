import React from "react";
import TransactionItem from "./TransactionItem";

const TransactionList = ({ transactions, onEdit, onDelete }) => {
    if (transactions.length === 0) {
        return <div className="text-center text-gray-400 py-8">No transactions found.</div>;
    }
    return (
        <div className="divide-y">
            {transactions.map(tran => (
                <TransactionItem
                    key={tran.id}
                    transaction={tran}
                    onEdit={() => onEdit(tran)}
                    onDelete={() => onDelete(tran.id)}
                />
            ))}
        </div>
    );
};

export default TransactionList; 