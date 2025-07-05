import axios from "../configs/axios";

export const contactService = {
  async getAllContacts() {
    try {
      const response = await axios.get("/Contact/GetAll");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch contact" };
    }
  },

  async getContactById(id) {
    try {
      const response = await axios.get(`/Contact/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch contact" };
    }
  },

  async createContact(contactData) {
    try {
      const response = await axios.post("/Contact", {
        name: contactData.Name,
        email: contactData.Email,
        issue: contactData.Issue,
        message: contactData.Message,
        dateSent: contactData.DateSent,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to create contact" };
    }
  },

  async updateStatus(contactId, resolved) {
    try {
      const response = await axios.put(
        `/Contact/updateStatus/${contactId}`,
        resolved,
        {
    headers: {
      'Content-Type': 'application/json' // Đảm bảo header này được thiết lập
    }
  }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to update status" };
    }
  },

  // async getPreviousStats() {
  //   try {
  //     const response = await axios.get("/Contact/GetPreviousStats");
  //     return response.data;
  //   } catch (error) {
  //     throw (
  //       error.response?.data || { message: "Failed to fetch previous stats" }
  //     );
  //   }
  // },
};
