import { Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

function BlogFormModal({ isOpen, onClose, onSubmit, editingBlog = null }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    blogImages: [{ imageUrl: '' }]
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingBlog) {
      setFormData({
        title: editingBlog.title || '',
        content: editingBlog.content || '',
        author: editingBlog.author || '',
        blogImages: editingBlog.blogImages || [{ imageUrl: '' }]
      });
    } else {
      setFormData({
        title: '',
        content: '',
        author: '',
        blogImages: [{ imageUrl: '' }]
      });
    }
  }, [editingBlog, isOpen]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSubmit(formData);
      setFormData({
        title: '',
        content: '',
        author: '',
        blogImages: [{ imageUrl: '' }]
      });
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUrlChange = (index, value) => {
    const newImages = [...formData.blogImages];
    newImages[index] = { imageUrl: value };
    setFormData({ ...formData, blogImages: newImages });
  };

  // const addImageField = () => {
  //   setFormData({
  //     ...formData,
  //     blogImages: [...formData.blogImages, { imageUrl: '' }]
  //   });
  // };

  const removeImageField = (index) => {
    const newImages = formData.blogImages.filter((_, i) => i !== index);
    setFormData({ ...formData, blogImages: newImages });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {editingBlog ? 'Chỉnh sửa Blog' : 'Tạo Blog Mới'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tiêu đề
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nội dung
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tác giả
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hình ảnh Blog
            </label>
            {formData.blogImages.map((image, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="url"
                  value={image.imageUrl}
                  onChange={(e) => handleImageUrlChange(index, e.target.value)}
                  placeholder="URL hình ảnh"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formData.blogImages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
            {/* <button
              type="button"
              onClick={addImageField}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center gap-2"
            >
              <Plus size={16} />
              Thêm hình ảnh
            </button> */}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Đang xử lý...' : (editingBlog ? 'Cập nhật' : 'Tạo mới')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogFormModal;
