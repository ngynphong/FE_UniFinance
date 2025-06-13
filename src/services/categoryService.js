import axios from '../configs/axios';

export const categoryService = {
    async getUserCategories() {
        try {
            const response = await axios.get('/Category');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to fetch categories' };
        }
    },

    async createCategory(categoryData) {
        try {
            const response = await axios.post('/Category', categoryData);
            return response.data;
        } catch (error) {

            throw error.response?.data || { message: 'Failed to create category' };
        }
    }
};