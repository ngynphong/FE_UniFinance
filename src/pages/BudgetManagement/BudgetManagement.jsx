import React, { useState } from "react";
import BudgetSummary from "../../components/budget/BudgetSummary";
import BudgetCategories from "./BudgetCategories";
import BudgetNotifications from "../../components/budget/BudgetNotifications";
import UpdateBudgetModal from "../../components/budget/UpdateBudgetModal";
import CreateCategoryModal from "../../components/budget/CreateCategoryModal";
import DashboardLayout from '../../components/layout/user/DashboardLayout';
import { Button } from "antd";

const BudgetManagement = () => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    return (
        <DashboardLayout>
            <div className="space-y-6 sm:px-2 px-0 sm:w-full w-[95%]">
                <h1 className="text-2xl font-bold text-gray-800">Budget Management</h1>
                <div className="mx-auto p-4 md:p-6 bg-white rounded-lg shadow-md mt-6 mb-10">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
                        <Button
                            type="primary"
                            onClick={() => setShowUpdateModal(true)}
                        >
                            Update Budget
                        </Button>
                    </div>
                    <BudgetSummary />
                    <div className="my-8">
                        <BudgetCategories onAddCategory={() => setShowCreateModal(true)} />
                    </div>
                    <BudgetNotifications />
                    <UpdateBudgetModal open={showUpdateModal} onClose={() => setShowUpdateModal(false)} />
                    <CreateCategoryModal open={showCreateModal} onClose={() => setShowCreateModal(false)} />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default BudgetManagement; 