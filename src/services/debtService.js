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
};

export default debtService;