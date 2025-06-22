import axios from '../configs/axios';

export const chatService = {
    chatAi: async (monthlyIncome, monthlyExpenses, financialGoal, message) => {
        try {
            const response = await axios.post('/Chat/financial-advice', {
                monthlyIncome,
                monthlyExpenses,
                financialGoal,
                message
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to fetch chat' };
        }
    }
}
