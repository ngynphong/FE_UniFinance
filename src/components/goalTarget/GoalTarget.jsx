import React, { useEffect, useState } from 'react';
import { Button, message, Spin } from 'antd';
import GoalTargetModal from './GoalTargetModal';
import { goalService } from '../../services/goalService';
import { useAuth } from '../auth/useAuthHook';
import GoalCard from './GoalCard';


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

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
                <h2 className="text-lg font-semibold">Goal Target</h2>
                <Button type="primary" onClick={handleAdd}>
                    Add Goal Target
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {goals.map(goal => (
                    <GoalCard
                        key={goal.id}
                        goal={goal}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
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