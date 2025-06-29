import React from 'react';
import DashboardLayout from '../../../components/layout/user/DashboardLayout';
import GoalTarget from '../../../components/goalTarget/GoalTarget';

const GoalTargetPage = () => {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">Mục tiêu hướng tới</h1>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <GoalTarget />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default GoalTargetPage; 