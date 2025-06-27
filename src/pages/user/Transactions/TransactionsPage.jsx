import React, { useState, useEffect } from "react";
import TransactionList from "../../../components/transaction/TransactionList";
import TransactionFilter from "../../../components/transaction/TransactionFilter";
import TransactionModal from "../../../components/transaction/TransactionModal";
import { Button, Pagination, Spin } from "antd";
import DashboardLayout from '../../../components/layout/user/DashboardLayout';
import { transactionService } from "../../../services/transactionService";
import { message } from "antd";
import dayjs from "dayjs";
import { useAuth } from "../../../contexts/useAuth";

const PAGE_SIZE = 5;

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [filter, setFilter] = useState({
        type: "all",
        month: dayjs().format("YYYY-MM")
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = PAGE_SIZE;
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    // Lọc giao dịch theo filter và userId
    const filteredTransactions = transactions.filter(tran => {
        const matchType = filter.type === "all" || tran.type === filter.type;
        const matchMonth = tran.dateCreate ? tran.dateCreate.startsWith(filter.month) : false;
        const matchUserId = tran.userId === user?.userID;
        return matchType && matchMonth && matchUserId;
    });

    // Phân trang
    const startIdx = (currentPage - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    const pagedTransactions = filteredTransactions.slice(startIdx, endIdx);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const data = await transactionService.getAllTransactions();
            setTransactions(data);
        } catch (error) {
            console.error('Fetch transactions error:', error);
            message.error('Failed to fetch transactions');
        } finally {
            setLoading(false);
        }
    };
    // Thêm/sửa giao dịch
    const handleSave = async (data) => {
        try {
            if (data.id) {
                // Update existing transaction
                await transactionService.updateTransaction(data.id, data);
                message.success('Transaction updated successfully');
                setTransactions(prev =>
                    prev.map(t => t.id === data.id ? data : t)
                );
            } else {
                // Create new transaction
                const response = await transactionService.createTransaction({
                    ...data,
                    dateCreate: new Date().toISOString()
                });
                message.success('Transaction created successfully');
                setTransactions(prev => [...prev, response]);
            }
            setModalOpen(false);
            setEditData(null);
        } catch (error) {
            console.error('Save transaction error:', error);
            message.error(error.message || 'Failed to save transaction');
        }
    };

    // Xóa giao dịch
    const handleDelete = async (transactionId) => {
        try {
            await transactionService.deleteTransaction(transactionId);
            message.success('Transaction deleted successfully');
            setTransactions(prev => prev.filter(t => t.transactionId !== transactionId));
        } catch (error) {
            console.error('Delete transaction error:', error);
            message.error('Failed to delete transaction');
        }
    };

    loading && <Spin size="large" />
    // Khi filter thay đổi, reset về trang 1
    React.useEffect(() => {
        setCurrentPage(1);
    }, [filter]);

    return (
        <DashboardLayout>
            <div className="space-y-6 px-2 md:px-0">
                <h1 className="text-2xl font-bold text-gray-800">Giao dịch</h1>
                <div className="mx-auto p-4 md:p-6 bg-white rounded-lg shadow-md mt-6 mb-10">

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
                        <Button
                            type="primary"
                            onClick={() => { setModalOpen(true); setEditData(null); }}
                        >
                            + Thêm giao dịch
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