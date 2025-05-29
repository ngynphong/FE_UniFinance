import React, { useState } from 'react';
import { Table, Button, Popconfirm, Progress } from 'antd';
import GoalTargetModal from './GoalTargetModal';
import { FaTrash, FaEdit } from "react-icons/fa";

const initialGoals = [
    { id: 1, name: 'Buy a Laptop', amount: 1000, current: 200, deadline: '2024-12-31' },
    { id: 2, name: 'Travel Fund', amount: 2000, current: 500, deadline: '2025-06-01' },
];

const GoalTarget = () => {
    const [goals, setGoals] = useState(initialGoals);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingGoal, setEditingGoal] = useState(null);

    const handleAdd = () => {
        setEditingGoal(null);
        setModalOpen(true);
    };

    const handleEdit = (goal) => {
        setEditingGoal(goal);
        setModalOpen(true);
    };

    const handleDelete = (id) => {
        setGoals(goals.filter(g => g.id !== id));
    };

    const handleSave = (goal) => {
        if (goal.id) {
            setGoals(goals.map(g => (g.id === goal.id ? goal : g)));
        } else {
            setGoals([...goals, { ...goal, id: Date.now() }]);
        }
        setModalOpen(false);
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Target Amount', dataIndex: 'amount', key: 'amount', render: v => `$${v}` },
        { title: 'Current', dataIndex: 'current', key: 'current', render: v => `$${v}` },
        { title: 'Deadline', dataIndex: 'deadline', key: 'deadline' },
        {
            title: 'Progress',
            key: 'progress',
            render: (_, record) => {
                const percent = record.amount > 0 ? Math.min(100, Math.round((record.current / record.amount) * 100)) : 0;
                return <Progress percent={percent} size="small" />;
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <div className="flex gap-2">
                    <Button size="small" onClick={() => handleEdit(record)}><FaEdit /></Button>
                    <Popconfirm title="Delete this goal?" onConfirm={() => handleDelete(record.id)}>
                        <Button size="small" danger><FaTrash /></Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div className="bg-white rounded-xl p-6 shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Goal Target</h2>
                <Button type="primary" onClick={handleAdd}>Add Goal Target</Button>
            </div>
            <Table
                columns={columns}
                dataSource={goals}
                rowKey="id"
                pagination={false}
                className="bg-white rounded"
            />
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