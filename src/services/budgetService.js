import axios from '../configs/axios';
export const budgetService = {
    getBudgets: async () => {
        try {
            const response = await axios.get('/Budget');
            return response.data;
        } catch (error) {
            console.error('Get budgets error:', error);
            throw error.response?.data || { message: 'Failed to fetch budgets' };
        }
    },

    async createBudget(budgetData) {
        try {
            const response = await axios.post('/Budget', budgetData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to create budget' };
        }
    },

    async updateBudget(id, budgetData) {
        try {
            const response = await axios.put(`/Budget/${id}`, budgetData); // Remove the extra object wrapping
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to update budget' };
        }
    },

    async deleteBudget(id) {
        try {
            const response = await axios.delete(`/Budget/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to delete budget' };
        }
    },

    async getBudgetById(id) {
        try {
            const response = await axios.get(`/Bdget/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed get budget' };
        }
    },

    async getBudgetDetails(id) {
        try {
            const response = await axios.get(`/Budget/${id}/detail`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed get budget' };
        }
    },

    async getBudgetCategories(id) {
        try {
            const response = await axios.get(`/Budget/${id}/categories`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed get budget' };
        }
    },

    async getBudgetSummary(month, year) {
        try {
            const response = await axios.get('/Budget/summary', {
                params: { month, year }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to fetch budget summary' };
        }
    },

    async getBudgetAlert(threshold) {
        try {
            const response = await axios.get('/Budget/alerts', {
                params: { threshold }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to alert' };
        }
    },
};