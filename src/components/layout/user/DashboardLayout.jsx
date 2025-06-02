import React from 'react';
import Sidebar from './Sidebar';


const DashboardLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-gray-200">
            <Sidebar />
            <main className="flex-1 sm:p-8 p-4">{children}</main>
        </div>
    );
};

export default DashboardLayout; 