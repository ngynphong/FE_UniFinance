import React, { useState } from "react";
import DashboardLayout from '../../../components/layout/user/DashboardLayout';
import BudgetSummary from "../../../components/budget/BudgetSummary";
import CreateBudgetModal from "../../../components/budget/CreateBudgetModal";
import UpdateBudgetModal from "../../../components/budget/UpdateBudgetModal";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const BudgetManagement = () => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedBudget, setSelectedBudget] = useState(null);
    const [budgetRefresh, setBudgetRefresh] = useState(false);
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

    return (
        <DashboardLayout>
            <div className="space-y-4 md:space-y-6 p-3 md:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800">Budget Management</h1>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setShowCreateModal(true)}
                        className="w-full sm:w-auto"
                    >
                        Create New Budget
                    </Button>
                </div>

                <div className="mt-4 md:mt-6">
                    <BudgetSummary
                        onEdit={handleEditBudget}
                        onRefresh={setBudgetRefresh}
                        refresh={budgetRefresh}
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