import axios from "../configs/axios";

export const bookingService = {
  async getAllBookings() {
    try {
      const response = await axios.get("/Booking/GetAll");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch booking" };
    }
  },

  async getbookingById(id) {
    try {
      const response = await axios.get(`/Booking/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch booking" };
    }
  },

  async createBooking(bookingData) {
    try {
      const response = await axios.post("/Booking", {
        slotId: bookingData.slotId,
        incomeNote: bookingData.incomeNote,
        expenseNote: bookingData.expenseNote,
        goalNote: bookingData.goalNote,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to create booking" };
    }
  },

  /** LẤY SLOT TRỐNG
   * options = { consultantId?, weekOffset?, date? }
   *  - Nếu chỉ date      → lấy slot ngày đó
   *  - Nếu có weekOffset → lấy slot tuần (0=this,1=next,-1=prev)
   *  - Nếu cả hai null   → mặc định tuần hiện tại
   */
  async getAvailableSlots(options = {}) {
    const params = new URLSearchParams();

    if (options.consultantId)
      params.append("consultantId", options.consultantId);
    if (options.weekOffset !== undefined && options.weekOffset !== null)
      params.append("weekOffset", options.weekOffset);
    if (options.date) params.append("date", options.date); // ISO string: yyyy-MM-dd

    try {
      const res = await axios.get(
        `/Booking/AvailableSlots?${params.toString()}`
      );
      return res.data; 
    } catch (err) {
      throw err.response?.data || { message: "Failed to fetch slots" };
    }
  },
};
