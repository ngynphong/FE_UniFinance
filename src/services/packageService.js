import axios from '../configs/axios';

const packageService = {
    getPackage: async () => {
        const response = await axios.get('/Package');
        return response.data;
    },
    paymentPackage: async (packageId, userId) => {
        const response = await axios.post('/Package/payment', { packageId, userId });
        return response.data;
    },
    createPayment: async (orderCode, amount, description) => {
        const response = await axios.post('/Payment/create', { orderCode, amount, description });
        return response.data;
    },
}

export default packageService;
