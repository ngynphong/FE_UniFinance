import axios from "../configs/axios";

const debtService = {
    getAllDebts: async () => {
        const response = await axios.get("/Debt/GetAllByUser");
        return response.data;
    },

    addDebt: async (debtData) => {
        const response = await axios.post("/Debt/AddDebt", debtData);
        return response.data;
    },

    calculateDebtInterest: async (data) => {
        const response = await axios.post("/Debt/CalculateDebtInterest", data);
        return response.data;
    },

    addDebtContribution: async (id, contributionData) => {
        const response = await axios.post(`/Debt/AddDebtContribution/${id}`, contributionData);
        return response.data;
    },
};

export default debtService;