import axios from "../configs/axios";
// Tạo blog mới
export const createBlog = async (blogData) => {
  try {
    const response = await axios.post("/Blog", blogData);
    return response.data;
  } catch (error) {
    console.error("Failed to create blog:", error);
    throw error;
  }
};

// Lấy danh sách blog (tùy chọn có search và userId)
export const getBlogs = async (search = "", userId = "") => {
  try {
    const response = await axios.get("/Blog", {
      params: { search, userId },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    throw error;
  }
};

// Lấy chi tiết blog theo ID
export const getBlogById = async (id) => {
  try {
    const response = await axios.get(`/Blog/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to get blog with ID ${id}:`, error);
    throw error;
  }
};

// Cập nhật blog theo ID
export const updateBlog = async (id, updatedData) => {
  try {
    const response = await axios.put(`/Blog/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Failed to update blog with ID ${id}:`, error);
    throw error;
  }
};

//  Xoá blog theo ID
export const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(`/Blog/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete blog with ID ${id}:`, error);
    throw error;
  }
};
