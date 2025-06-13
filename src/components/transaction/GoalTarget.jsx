import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, Progress, message } from 'antd';
import GoalTargetModal from './GoalTargetModal';
import { FaTrash, FaEdit } from "react-icons/fa";
import { goalService } from '../../services/goalService';
import { useAuth } from '../auth/useAuthHook';


const GoalTarget = () => {
    const [goals, setGoals] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingGoal, setEditingGoal] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        try {
            setLoading(true);
            const data = await goalService.getAllGoals();
            setGoals(data);
        } catch (error) {
            message.error('Failed to fetch goals', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingGoal(null);
        setModalOpen(true);
    };

    const handleEdit = (goal) => {
        setEditingGoal(goal);
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await goalService.deleteGoal(id);
            message.success('Goal deleted successfully');
            fetchGoals();
        } catch (error) {
            message.error('Failed to delete goal', error);
        }
    };

    const handleSave = async (goalData) => {
        try {
            if (goalData.id) {
                await goalService.updateGoal(goalData.id, goalData);
                message.success('Goal updated successfully');
            } else {
                await goalService.createGoal({
                    goal: goalData.goal,
                    amount: goalData.amount,
                    targetDate: goalData.targetDate,
                    userId: user?.userID
                });
                message.success('Goal created successfully');
            }
            setModalOpen(false);
            fetchGoals();
        } catch (error) {
            message.error('Failed to save goal', error);
        }
    };

    const columns = [
        { title: 'Name', dataIndex: 'goal', key: 'goal' },
        { title: 'Amount', dataIndex: 'amount', key: 'amount', render: v => `$${v}` },
        { title: 'Current', dataIndex: 'currentSpending', key: 'currentSpending', render: v => `$${v.toLocaleString()}` },
        { title: 'Target Date', dataIndex: 'targetDate', key: 'targetDate' },
        {
            title: 'Progress',
            key: 'progress',
            render: (_, record) => {
                // Nếu backend chưa trả về progress, tự tính:
                const percent = record.amount > 0 ? Math.min(100, Math.round((record.currentSpending / record.amount) * 100)) : 0;
                return <Progress percent={percent} size="small" />;
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <div className="flex gap-2">
                    <Button size="small" className='text-blue-500' onClick={() => handleEdit(record)}><FaEdit /></Button>
                    <Popconfirm title="Delete this goal?" onConfirm={() => handleDelete(record.id)}>
                        <Button size="small" danger><FaTrash /></Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <h2 className="text-lg font-semibold">Goal Target</h2>
                <Button type="primary" onClick={handleAdd}>Add Goal Target</Button>
            </div>
            <div className="overflow-x-auto">
                <Table
                    columns={columns}
                    dataSource={goals}
                    rowKey="id"
                    pagination={false}
                    loading={loading}
                    className="bg-white rounded min-w-[500px]"
                />
            </div>
            <GoalTargetModal
                open={modalOpen}
                goal={editingGoal}
                onClose={() => setModalOpen(false)}
                onSave={handleSave}
            />
        </div>
    );
};

export default GoalTarget;