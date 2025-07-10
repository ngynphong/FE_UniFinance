import React, { useState, useEffect } from "react";
import DashboardLayout from '../../../components/layout/user/DashboardLayout';
import BudgetSummary from "../../../components/budget/BudgetSummary";
import CreateBudgetModal from "../../../components/budget/CreateBudgetModal";
import UpdateBudgetModal from "../../../components/budget/UpdateBudgetModal";
import { Button, Card, message, Progress } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../components/auth/useAuthHook";
import { categoryService } from "../../../services/categoryService";
import { budgetService } from "../../../services/budgetService";
import { transactionService } from "../../../services/transactionService";

const BudgetManagement = () => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryType, setNewCategoryType] = useState('expense');
    const { user } = useAuth();
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedBudget, setSelectedBudget] = useState(null);
    const [budgetRefresh, setBudgetRefresh] = useState(false);
    const navigate = useNavigate();
    const [budgets, setBudgets] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!user?.userID) return;
            setLoading(true);
            try {
                const [budgetsData, transactionsData] = await Promise.all([
                    budgetService.getBudgets(),
                    transactionService.getAllTransactions()
                ]);
                const userTransactions = transactionsData.filter(t => t.userId === user.userID);
                setBudgets(budgetsData);
                setTransactions(userTransactions);
            } catch {
                message.error("Lỗi tải dữ liệu tổng quan ngân sách.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user, budgetRefresh]);

    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const currentBudget = budgets.length > 0 ? budgets[0] : { limitAmount: 0 };

    const handleBudgetCreated = () => {
        setShowCreateModal(false);
        setBudgetRefresh(prev => !prev);
    };

    const handleEditBudget = (budget) => {
        setSelectedBudget(budget);
        setShowUpdateModal(true);
    };

    const handleBudgetUpdated = () => {
        setShowUpdateModal(false);
        setSelectedBudget(null);
        setBudgetRefresh(prev => !prev);
    };

    const handleBudgetClick = (budget) => {
        navigate(`/dashboard/budget-management/${budget.id}`);
    };

    const handleAddCategory = async () => {
        try {
            if (!newCategoryName) return;
            await categoryService.createCategory({
                userId: user.userID,
                categoryName: newCategoryName,
                type: newCategoryType,
                description: ''
            });
            setNewCategoryName('');
            setNewCategoryType('expense');
            message.success('Tạo loại giao dịch thành công')
        } catch {
            // Có thể show message lỗi nếu muốn
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-4 md:space-y-6 p-3 md:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800">Quản lý ngân sách</h1>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setShowCreateModal(true)}
                        className="w-full sm:w-auto"
                    >
                        Tạo ngân sách mới
                    </Button>
                </div>
                <Card className="mb-4">
                    <div className="flex flex-col md:flex-row items-center gap-2">
                        <input
                            className="border rounded px-2 py-1 w-48"
                            placeholder="Tên loại ngân sách mới"
                            value={newCategoryName}
                            onChange={e => setNewCategoryName(e.target.value)}
                        />
                        <select
                            className="border rounded px-2 py-1"
                            value={newCategoryType}
                            onChange={e => setNewCategoryType(e.target.value)}
                        >
                            <option value="income">Thu nhập</option>
                            <option value="expense">Chi phí</option>
                        </select>
                        <Button type="primary" onClick={handleAddCategory} disabled={!newCategoryName}>
                            Thêm loại ngân sách
                        </Button>
                    </div>
                </Card>

                <Card title="Tổng quan về ngân sách" loading={loading} className="mb-4">
                    <div className="space-y-2">
                        <div className="flex justify-between flex-wrap">
                            <span>Ngân sách hàng tháng:</span>
                            <span className="font-semibold">{Number(currentBudget.limitAmount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                        </div>
                        <div className="flex justify-between flex-wrap">
                            <span>Đã tiêu:</span>
                            <span className="font-semibold text-red-600">{Number(totalExpense).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                        </div>
                        <div className="flex justify-between flex-wrap">
                            <span>Còn lại:</span>
                            <span className="font-semibold text-green-600">
                                {Number(currentBudget.limitAmount - totalExpense).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </span>
                        </div>
                        <Progress
                            percent={currentBudget.limitAmount > 0 ? Math.round((totalExpense / currentBudget.limitAmount) * 100) : 0}
                            status={totalExpense > currentBudget.limitAmount ? 'exception' : 'active'}
                        />
                    </div>
                </Card>



                <div className="mt-4 md:mt-6">
                    <BudgetSummary
                        onEdit={handleEditBudget}
                        onRefresh={setBudgetRefresh}
                        refresh={budgetRefresh}
                        onClickBudget={handleBudgetClick}
                    />
                </div>

                <CreateBudgetModal
                    open={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    onSuccess={handleBudgetCreated}
                />

                <UpdateBudgetModal
                    open={showUpdateModal}
                    onClose={() => setShowUpdateModal(false)}
                    budget={selectedBudget}
                    onSuccess={handleBudgetUpdated}
                />
            </div>
        </DashboardLayout>
    );
};

export default BudgetManagement;
