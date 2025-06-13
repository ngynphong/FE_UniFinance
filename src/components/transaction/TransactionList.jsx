import React from "react";
import TransactionItem from "./TransactionItem";

const TransactionList = ({ transactions, onEdit, onDelete, categories, budgets }) => {
    if (transactions.length === 0) {
        return <div className="text-center text-gray-400 py-8">No transactions found.</div>;
    }
    return (
        <div className="divide-y">
            {transactions.map(tran => (
                <TransactionItem
                    key={tran.transactionId}
                    transaction={tran}
                    onEdit={() => onEdit(tran)}
                    onDelete={() => onDelete(tran.transactionId)}
                    categories={categories}
                    budgets={budgets}
                />
            ))}
        </div>
    );
};

export default TransactionList; 