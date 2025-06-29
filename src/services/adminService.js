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