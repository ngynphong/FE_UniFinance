import { useEffect, useState } from "react";
import { createBlog, deleteBlog, getBlogs, updateBlog } from "../../services/blogService";
import { Plus, Search } from "lucide-react";
import BlogTable from "../../components/user/BlogTable";
import BlogFormModal from "../../components/user/BlogFormModal";
import Dashboard from "./Dashboard/Dashboard";
import DashboardLayout from "../../components/layout/user/DashboardLayout";

const BlogManagerPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const userId = localStorage.getItem("userId"); // Lấy userId từ localStorage

  // Load blogs
  const loadBlogs = async (search = '') => {
    setLoading(true);
    try {
      const data = await getBlogs(search, userId); // truyền userId vào đây
      setBlogs(data);
    } catch (error) {
      console.error('Error loading blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  // Search handler
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    loadBlogs(value);
  };

  // Create or update blog
  const handleSubmit = async (blogData) => {
    try {
      if (editingBlog) {
        await updateBlog(editingBlog.id, blogData);
      } else {
        await createBlog(blogData);
      }
      await loadBlogs(searchTerm);
      setEditingBlog(null);
    } catch (error) {
      console.error('Error submitting blog:', error);
      throw error;
    }
  };

  // Edit blog
  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setIsModalOpen(true);
  };

  // Delete blog
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa blog này?')) {
      try {
        await deleteBlog(id);
        await loadBlogs(searchTerm);
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  // View blog details
  const handleView = (blog) => {
    alert(`Xem chi tiết blog: ${blog.title}\n\nNội dung: ${blog.content}\nTác giả: ${blog.author}`);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBlog(null);
  };

  return (
    <DashboardLayout>
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Quản lý Blog</h1>
          
          {/* Search and Add Button */}
          <div className="flex justify-between items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Tìm kiếm blog..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Plus size={20} />
              Tạo Blog Mới
            </button>
          </div>
        </div>

        {/* Blog Table */}
        <BlogTable
          blogs={blogs}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          loading={loading}
        />

        {/* Blog Form Modal */}
        <BlogFormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          editingBlog={editingBlog}
        />
      </div>
    </div>
    </DashboardLayout>
  );
};

export default BlogManagerPage;