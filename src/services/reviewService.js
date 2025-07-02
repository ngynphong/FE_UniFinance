import axios from "../configs/axios";

export const reviewService = {
  async getAllReviews() {
    try {
      const response = await axios.get("/Review");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch reviews" };
    }
  },

  async createReview(reviewData) {
    try {
      const response = await axios.post("/Review", {
        userID: reviewData.userID,
        userPackageUserId: reviewData.userPackageUserId,
        userPackagePackageId: reviewData.userPackagePackageId,
        rating: reviewData.rating,
        comment: reviewData.comment,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to create review" };
    }
  },
};
