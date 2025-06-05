import React, { useState } from "react";
import TransactionList from "../../../components/transaction/TransactionList";
import TransactionFilter from "../../../components/transaction/TransactionFilter";
import TransactionModal from "../../../components/transaction/TransactionModal";
import TransactionItem from "../../../components/transaction/TransactionItem";
import { Button, Pagination } from "antd";
import GoalTarget from "../../../components/transaction/GoalTarget";
import DashboardLayout from '../../../components/layout/user/DashboardLayout';

// Fake data mẫu
const initialTransactions = [
    { id: 1, type: "income", category: "Salary", amount: 1200, date: "2023-03-01", note: "March salary", icon: "💼" },
    { id: 2, type: "expense", category: "Food", amount: 50, date: "2023-03-02", note: "Lunch", icon: "🍔" },
    { id: 3, type: "expense", category: "Transport", amount: 20, date: "2023-03-03", note: "Bus ticket", icon: "🚌" },
    { id: 4, type: "income", category: "Freelance", amount: 300, date: "2023-03-05", note: "Project", icon: "🧑‍💻" },
    { id: 5, type: "expense", category: "Shopping", amount: 100, date: "2023-03-06", note: "Clothes", icon: "👕" },
    { id: 6, type: "expense", category: "Food", amount: 30, date: "2023-03-07", note: "Dinner", icon: "🍔" },
    { id: 7, type: "income", category: "Salary", amount: 1200, date: "2023-02-01", note: "Feb salary", icon: "💼" },
    { id: 8, type: "expense", category: "Transport", amount: 15, date: "2023-03-08", note: "Taxi", icon: "🚌" },
    { id: 9, type: "expense", category: "Shopping", amount: 80, date: "2023-03-09", note: "Shoes", icon: "👕" },
    { id: 10, type: "income", category: "Freelance", amount: 200, date: "2023-03-10", note: "Design", icon: "🧑‍💻" },
];

const PAGE_SIZE = 5;

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState(initialTransactions);
    const [filter, setFilter] = useState({ type: "all", month: "2023-03" });
    const [modalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = PAGE_SIZE;

    // Lọc giao dịch theo filter
    const filteredTransactions = transactions.filter(tran => {
        const matchType = filter.type === "all" || tran.type === filter.type;
        const matchMonth = tran.date.startsWith(filter.month);
        return matchType && matchMonth;
    });

    // Phân trang
    const startIdx = (currentPage - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    const pagedTransactions = filteredTransactions.slice(startIdx, endIdx);

    // Thêm/sửa giao dịch
    const handleSave = (data) => {
        if (data.id) {
            setTransactions(tran => tran.map(t => t.id === data.id ? data : t));
        } else {
            setTransactions(tran => [...tran, { ...data, id: Date.now() }]);
        }
        setModalOpen(false);
        setEditData(null);
    };

    // Xóa giao dịch
    const handleDelete = (id) => {
        setTransactions(tran => tran.filter(t => t.id !== id));
    };

    // Khi filter thay đổi, reset về trang 1
    React.useEffect(() => {
        setCurrentPage(1);
    }, [filter]);

    return (
        <DashboardLayout>
            <div className="space-y-6 px-2 md:px-0">
                <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
                <div className="mx-auto p-4 md:p-6 bg-white rounded-lg shadow-md mt-6 mb-10">

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
                        <Button
                            type="primary"
                            onClick={() => { setModalOpen(true); setEditData(null); }}
                        >
                            + Add Transaction
                        </Button>
                    </div>
                    <TransactionFilter filter={filter} setFilter={setFilter} />
                    <TransactionList
                        transactions={pagedTransactions}
                        onEdit={tran => { setEditData(tran); setModalOpen(true); }}
                        onDelete={handleDelete}
                    />
                    <div className="flex justify-center mt-4">
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={filteredTransactions.length}
                            onChange={setCurrentPage}
                            showSizeChanger={false}
                        />
                    </div>

                    <TransactionModal
                        open={modalOpen}
                        onClose={() => { setModalOpen(false); setEditData(null); }}
                        onSave={handleSave}
                        editData={editData}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default TransactionsPage; 