import React, { useState } from "react";
import BudgetSummary from "../../components/budget/BudgetSummary";
import BudgetCategories from "./BudgetCategories";
import BudgetNotifications from "../../components/budget/BudgetNotifications";
import UpdateBudgetModal from "../../components/budget/UpdateBudgetModal";
import CreateCategoryModal from "../../components/budget/CreateCategoryModal";

const BudgetManagement = () => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6 mb-10">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Budget Management</h2>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    onClick={() => setShowUpdateModal(true)}
                >
                    Update Budget
                </button>
            </div>
            <BudgetSummary />
            <div className="my-8">
                <BudgetCategories onAddCategory={() => setShowCreateModal(true)} />
            </div>
            <BudgetNotifications />
            <UpdateBudgetModal open={showUpdateModal} onClose={() => setShowUpdateModal(false)} />
            <CreateCategoryModal open={showCreateModal} onClose={() => setShowCreateModal(false)} />
        </div>
    );
};

export default BudgetManagement; 