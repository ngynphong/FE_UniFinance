import axios from "../configs/axios";

export const getUserStatistics = async () => {
  const response = await axios.get("/Admin/user-statistics");
  return response.data;
};

export const getAllUsers = async (role) => {
  const response = await axios.get("/User/GetAll", {
    params: role ? { role } : {},
  });
  return response.data;
};
// export const updateUserStatus = async (id, isActive) => {
//   const response = await axios.put(`/Admin/users/${id}/status`, null, {
//     params: { isActive },
//   });
//   return response.data;
// };
export const getQuickStats = async () => {
  const response = await axios.get('/Admin/quick-stats');
  return response.data;
};

export const getFinanceDashboardData = async () => {
  const response = await axios.get('/Admin/finance-dashboard');
  return response.data;
};

export const getRecentSubscriptions = async () => {
  const response = await axios.get('/Admin/recent-subscriptions');
  return response.data;
};

export const getAllTransactions = async () => {
  const response = await axios.get('/Admin/all-subscriptions');
  return response.data;
};