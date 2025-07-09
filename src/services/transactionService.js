import axios from '../configs/axios';

export const transactionService = {
    async getAllTransactions() {
        try {
            const response = await axios.get('/Transaction/GetAll');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to fetch transactions' };
        }
    },

    async getTransactionById(id) {
        try {
            const response = await axios.get(`/Transaction/${id}`);
            return response.data;
        } catch (error) {

            throw error.response?.data || { message: 'Failed to fetch transaction' };
        }
    },

    async createTransaction(transactionData) {
        try {
            const response = await axios.post('/Transaction', {
                userId: transactionData.userId,
                amount: transactionData.amount,
                description: transactionData.description,
                categoryId: transactionData.categoryId,
                budgetId: transactionData.budgetId,
                debtId: transactionData.debtId,
                goalTargetId: transactionData.goalTargetId,
                dateCreate: transactionData.dateCreate,
                type: transactionData.type,
                isDeleted: transactionData.isDeleted ?? false
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to create transaction' };
        }
    },

    async updateTransaction(id, transactionData) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Unauthorized - Please login first');
            }
            const response = await axios.put(`/Transaction/${id}`, {
                amount: transactionData.amount,
                description: transactionData.description,
                categoryId: transactionData.categoryId,
                budgetId: transactionData.budgetId
            });
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                throw new Error('Unauthorized - Please login again');
            }
            throw error.response?.data || { message: 'Failed to update transaction' };
        }
    },

    async deleteTransaction(id) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Unauthorized - Please login first');
            }
            const response = await axios.delete(`/Transaction/${id}`);
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                throw new Error('Unauthorized - Please login again');
            }
            throw error.response?.data || { message: 'Failed to delete transaction' };
        }
    },

    async getTransactionRecent(userId){
        try{
            const response = await axios.get(`/Transaction/recent/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed get transaction recent' };
        }
    },
    
    async getTransactionSumary(userId) {
        try {
            const response = await axios.get(`/Transaction/summary/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed get transaction summary' };
        }
    },
}