import axios from '../configs/axios';

export const goalService = {
    async getAllGoals() {
        try {

            const response = await axios.get('/Goal/GetAllByUserId');
            return response.data;
        } catch (error) {

            console.error('Fetch goals error:', error);
            throw error.response?.data || { message: 'Failed to fetch goals' };
        }
    },

    async createGoal(goalData) {
        try {

            const response = await axios.post('/Goal', goalData);
            return response.data;
        } catch (error) {

            console.error('Create goal error:', error);
            throw error.response?.data || { message: 'Failed to create goal' };
        }
    },

    async updateGoal(id, goalData) {
        try {

            const response = await axios.put(`/Goal/${id}`, goalData);
            return response.data;
        } catch (error) {

            console.error('Update goal error:', error);
            throw error.response?.data || { message: 'Failed to update goal' };
        }
    },

    async deleteGoal(id) {
        try {
            const response = await axios.delete(`/Goal/${id}`);
            return response.data;
        } catch (error) {
            console.error('Delete goal error:', error);
            throw error.response?.data || { message: 'Failed to delete goal' };
        }
    },

    async getGoalById(id) {
        try {
            const response = await axios.get(`/Goal/${id}`);
            return response.data;
        } catch (error) {
            console.error('Fetch goal by ID error:', error);
            throw error.response?.data || { message: 'Failed to fetch goal' };
        }
    }
};