import React from 'react';
import AdminSidebar from './AdminSidebar';


const AdminLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-gray-200">
            <AdminSidebar />
            <main className="flex-1 sm:p-8 p-4">{children}</main>
        </div>
    );
};

export default AdminLayout; 