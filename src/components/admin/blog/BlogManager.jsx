import React, { useEffect, useState } from 'react';
import { Table, Button, message, Tag, Space, Popconfirm, Spin } from 'antd';
import { Plus } from 'lucide-react';
import AdminLayout from '../../layout/admin/AdminLayout';
import BlogModalForm from './BlogModalForm';
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import {
  getBlogs,
  deleteBlog,
  createBlog,
  updateBlog
} from '../../../services/blogService';

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await getBlogs();
      setBlogs(res);
    } catch (err) {
      message.error('Không thể tải danh sách blog', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      message.success('Xóa blog thành công');
      fetchBlogs();
    } catch {
      message.error('Xóa blog thất bại');
    }
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setIsEditMode(true);
    setModalVisible(true);
  };

  const handleAdd = () => {
    setSelectedBlog(null);
    setIsEditMode(false);
    setModalVisible(true);
  };

  const handleSubmit = async (data) => {
    try {
      if (isEditMode) {
        await updateBlog(data.blogId, data);
        message.success('Cập nhật blog thành công');
      } else {
        await createBlog(data);
        message.success('Tạo blog mới thành công');
      }
      setModalVisible(false);
      fetchBlogs();
    } catch {
      message.error('Có lỗi xảy ra');
    }
  };

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <span className="font-medium text-gray-800">{text}</span>,
    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'uploadDate',
      key: 'uploadDate',
      render: (date) => new Date(date).toLocaleDateString('vi-VN')
    },
    {
      title: 'Lượt xem',
      dataIndex: 'view',
      key: 'view',
    },
    {
      title: 'Lượt thích',
      dataIndex: 'like',
      key: 'like',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      render: (deleted) => <Tag color={deleted ? 'red' : 'green'}>{deleted ? 'Ẩn' : 'Hiển thị'}</Tag>
    },
    {
      title:"Hình ảnh",
      dataIndex: "blogImages",
      key: "blogImages",
      render: (images) =>
                images && images.length > 0 ? (
                    <img src={images[0].imageUrl} alt="blog" className="w-16 h-10 object-cover rounded" />
                ) : (
                    <span className="text-gray-400">Không có</span>
                ),
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <Space>
          
          <EditOutlined className="text-blue-500 cursor-pointer" onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Bạn có chắc muốn xoá blog này?"
            onConfirm={() => handleDelete(record.blogId)}
            okText="Xoá"
            cancelText="Huỷ"
            okButtonProps={{ danger: true }}
          >
            <DeleteOutlined className="text-red-500 cursor-pointer" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Quản lý blog</h1>
          <Button icon={<Plus />} type="primary" onClick={handleAdd}>
            Thêm blog
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={blogs}
            rowKey="blogId"
            pagination={{ pageSize: 10, showTotal: (total) => `Tổng ${total} blog` }}
          />
        )}

        <BlogModalForm
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onOk={handleSubmit}
          initialValues={selectedBlog}
          isEditMode={isEditMode}
        />
      </div>
    </AdminLayout>
  );
};

export default BlogManager;
