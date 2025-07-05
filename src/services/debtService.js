import axios from "../configs/axios";

const debtService = {
    getAllDebts: async () => {
        try {
            const response = await axios.get("/Debt/GetAllByUser");
            return response.data;
        } catch (error) {
            console.log(error)
        }

    },

    addDebt: async (debtData) => {
        const response = await axios.post("/Debt/AddDebt", debtData);
        return response.data;
    },

    calculateDebtInterest: async (data) => {
        const response = await axios.post("/Debt/CalculateDebtInterest", data);
        return response.data;
    },
};

export default debtService;