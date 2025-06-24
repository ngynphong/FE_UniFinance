import axios from '../configs/axios';

export const chatService = {
    chatAi: async (monthlyIncome, monthlyExpenses, financialGoal, message, history = []) => {
        try {
            const response = await axios.post('/Chat/financial-advice', {
                monthlyIncome,
                monthlyExpenses,
                financialGoal,
                message,
                history
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to fetch chat' };
        }
    }
}