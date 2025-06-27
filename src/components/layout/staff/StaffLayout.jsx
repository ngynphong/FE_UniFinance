import React from 'react';
import StaffSidebar from './StaffSidebar';
import { Outlet } from "react-router-dom";
import StaffConsultationManager from '../../../pages/staff/StaffConsultationManager';

const StaffLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-gray-200">
            <StaffSidebar />
            <main className="flex-1 sm:p-8 p-4">
                {children}
            </main>
        </div>
    );
};

export default StaffLayout;