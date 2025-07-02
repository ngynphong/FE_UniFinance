import axios from '../configs/axios';

const packageService = {
    getPackage: async () => {
        const response = await axios.get('/Package');
        return response.data;
    },
    getUserPackage: async (userId) => {
        const response = await axios.get(`/Package/user-packages/${userId}`);
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
// Lấy tất cả gói dịch vụ
export const getAllPackages = async () => {
  const response = await axios.get('/Package');
  return response.data;
};

// Tạo hoặc cập nhật gói dịch vụ
export const saveOrUpdatePackage = async (packageId, data) => {
  const response = await axios.post(`/Package/${packageId}`, data);
  return response.data;
};

// Gia hạn gói dịch vụ
export const renewPackage = async (packageId, data) => {
  const response = await axios.post(`/Package/Renew/${packageId}`, data);
  return response.data;
};

// Test API 1
export const testPackage1 = async (data) => {
  const response = await axios.post('/Package/test1', data);
  return response.data;
};

// Test API 2
export const testPackage2 = async (data) => {
  const response = await axios.post('/Package/test2', data);
  return response.data;
};
