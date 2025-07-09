import axios from "../configs/axios";
import { toast } from "react-toastify";

export const bookingService = {
  async getAllBookings(bookId = null, userId = null) {
    try {
      const params = new URLSearchParams();

      if (bookId !== null) params.append("bookId", bookId);
      if (userId !== null) params.append("userId", userId);

      const url = `/Booking/GetAll${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch booking" };
    }
  },

  async getBookingById(id) {
    try {
      const response = await axios.get(`/Booking/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch booking" };
    }
  },

  async getSlotById(id) {
    try {
      const response = await axios.get(`/Booking/GetSlotBySlotId/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch slot" };
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

  async updateBookingStatus(id, newStatus) {
    try {
      const response = await axios.put(
        `/Booking/${id}/UpdateStatus`,
        newStatus,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "Failed to update booking status" }
      );
    }
  },

  async getBookingStatistics() {
    try {
      const response = await axios.get("/Booking/GetBookingStatistics");
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Failed to fetch booking statistics",
        }
      );
    }
  },

  /** LẤY SLOT TRỐNG
   * options = { consultantId?, weekOffset?, date? }
   */
  async getAvailableSlots(options = {}) {
    const params = new URLSearchParams();

    if (options.consultantId)
      params.append("consultantId", options.consultantId);
    if (options.weekOffset !== undefined && options.weekOffset !== null)
      params.append("weekOffset", options.weekOffset);
    if (options.date) params.append("date", options.date); // yyyy-MM-dd

    try {
      const res = await axios.get(
        `/Booking/AvailableSlots?${params.toString()}`
      );
      return res.data;
    } catch (err) {
      throw err.response?.data || { message: "Failed to fetch slots" };
    }
  },

  async createSlot(slotData) {
    try {
      const res = await axios.post("/Booking/CreateConsultantSlot", {
        startTime: slotData.startTime,
        packageName: slotData.packageName, 
      });

      return res.data; 
    } catch (err) {
      // Display the error message from the backend
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message); // Show error message to user
      } else {
        toast.error("Failed to create slot"); // Generic error message
      }
      throw err.response?.data || { message: "Failed to create slot" }; // Handle errors
    }
  },
  async addBookingResponse(appointmentId, responseText) {
    try {
      const res = await axios.post(`/Booking/${appointmentId}/AddResponse`, {
        responseText,
      });
      return res.data;
    } catch (err) {
      throw err.response?.data || { message: "Failed to add booking response" };
    }
  },

  async getResponsesByBookingId(bookingId) {
    try {
      const res = await axios.get(
        `/Booking/GetResponsesByBookingId?bookingId=${bookingId}`
      );
      return res.data;
    } catch (error) {
      throw error.res?.data || { message: "Failed to fetch booking responses" };
    }
  },

  async updateBookingResponse(bookingId, responseText) {
    try {
      const res = await axios.put(`/Booking/${bookingId}/UpdateResponse`, {
        responseText,
      });
      return res.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "Failed to update booking response" }
      );
    }
  },

  async getPreviousStats() {
    try {
      const response = await axios.get("/Booking/GetYesterdayBookingStats");
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "Failed to fetch previous stats" }
      );
    }
  },

  async getWeeklyPerformance() {
    try {
      const response = await axios.get("/Booking/GetWeeklyPerformance");
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "Failed to fetch weekly performance" }
      );
    }
  },

  async getAllDetailed() {
    try {
      const response = await axios.get("/Booking/GetAllDetailed");
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "Failed to fetch all detailed" }
      );
    }
  },
};
