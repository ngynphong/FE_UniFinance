import React, { useEffect, useState } from 'react';
import { Card, Timeline, Progress, Table, message, Spin } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import debtService from '../../services/debtService';
import DashboardLayout from '../layout/user/DashboardLayout';

const RepaymentProgress = () => {

    const [debts, setDebts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDebts();
    }, []);

    const fetchDebts = async () => {
        try {
            setLoading(true);
            const response = await debtService.getAllDebts();
            setDebts(response);
        } catch (error) {
            message.error('Failed to fetch debts data');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };
    // Create timeline items from debts
    const timelineItems = debts.map((debt) => ({
        dot: debt.status === 'Paid'
            ? <CheckCircleOutlined className="text-green-500" />
            : <ClockCircleOutlined className="text-orange-500" />,
        color: debt.status === 'Paid' ? 'green' : 'blue',
        children: (
            <div>
                <p className="font-semibold">{debt.debtName}</p>
                <p>Amount: ${debt.amount}</p>
                <p>Due Date: {new Date(debt.dueDate).toLocaleDateString()}</p>
            </div>
        )
    }));
    const columns = [
        {
            title: 'Payment Date',
            dataIndex: 'paymentDate',
            key: 'paymentDate',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => `$${amount.toFixed(2)}`,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span className={status === 'Paid' ? 'text-green-500' : 'text-orange-500'}>
                    {status}
                </span>
            ),
        },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <DashboardLayout>
            <h2 className="text-2xl font-bold mb-6">Repayment Progress</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <h3 className="text-lg font-semibold mb-4">Payment Timeline</h3>
                    <Timeline
                        items={timelineItems}
                    />
                </Card>

                <Card>
                    <h3 className="text-lg font-semibold mb-4">Payment History</h3>
                    <Table
                        dataSource={debts.map((debt, index) => ({
                            key: debt.id || index,
                            paymentDate: new Date(debt.dueDate).toLocaleDateString(),
                            amount: debt.amount,
                            status: debt.status,
                        }))}
                        columns={columns}
                        pagination={false}
                        scroll={{ y: 400 }}
                    />
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default RepaymentProgress;