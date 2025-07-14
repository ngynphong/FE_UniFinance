import React, { useState, useEffect } from "react";
import { Modal, Button, Select, Input, message, Popconfirm, Table, Form, Spin } from "antd";
import { Edit, Trash2 } from "lucide-react";
import { getBlogs, createBlog, updateBlog, deleteBlog } from "../../services/blogService";
import BlogModal from "../../components/blog/BlogModal";
import StaffLayout from "../../components/layout/staff/StaffLayout";

const { Option } = Select;
const { TextArea } = Input;

export default function BlogManagement() {
    const [blogs, setBlogs] = useState([]);
    const [filter, setFilter] = useState("all");
    const [showModal, setShowModal] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch blogs from API
    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const data = await getBlogs();
            setBlogs(data);
        } catch (err) {
            message.error("Không thể tải danh sách blog", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const filteredBlogs = blogs.filter(
        (b) => filter === "all" || b.status === filter
    );

    const handleEdit = (blog) => {
        setEditingBlog(blog);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await deleteBlog(id);
            message.success("Đã xóa bài viết");
            fetchBlogs();
        } catch {
            message.error("Xóa thất bại");
        }
        setLoading(false);
    };

    const handleApprove = async (id) => {
        setLoading(true);
        try {
            const blog = blogs.find((b) => b.id === id);
            await updateBlog(id, { ...blog, status: "approved" });
            message.success("Đã duyệt bài viết");
            fetchBlogs();
        } catch {
            message.error("Duyệt thất bại");
        }
        setLoading(false);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setEditingBlog(null);
    };

    const handleModalSave = async (blog) => {
        setLoading(true);
        try {
            if (blog.blogId) {
                await updateBlog(blog.blogId, blog);
                message.success("Đã cập nhật bài viết");
            } else {
                await createBlog(blog);
                message.success("Đã tạo bài viết mới");
            }
            fetchBlogs();
        } catch {
            message.error("Lưu thất bại");
        }
        setLoading(false);
        handleModalClose();
    };

    // Cấu hình cột cho Table antd
    const columns = [
        {
            title: "Tiêu đề",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Tác giả",
            dataIndex: "author",
            key: "author",
        },
        {
            title: "Ảnh",
            dataIndex: "blogImages",
            key: "blogImages",
            render: (images) =>
                images && images.length > 0 ? (
                    <img src={images[0].imageUrl} alt="blog" className="w-32 h-32 object-contain rounded" />
                ) : (
                    <span className="text-gray-400">Không có</span>
                ),
        },
        {
            title: "Ngày tạo",
            dataIndex: "uploadDate",
            key: "uploadDate",
            render: (date) => new Date(date).toLocaleDateString("vi-VN"),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) =>
                status === "pending" ? (
                    <span className="text-yellow-600">Chờ duyệt</span>
                ) : (
                    <span className="text-green-600">Đã duyệt</span>
                ),
            filters: [
                { text: "Chờ duyệt", value: "pending" },
                { text: "Đã duyệt", value: "approved" },
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, blog) => (
                <div className="flex gap-2">
                    <Button
                        size="small"
                        type="link"
                        onClick={() => handleEdit(blog)}
                    >
                        <Edit size={16} />
                    </Button>
                    <Popconfirm
                        title="Bạn chắc chắn muốn xóa?"
                        onConfirm={() => handleDelete(blog.blogId)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button
                            size="small"
                            type="link"
                            danger
                        >
                            <Trash2 size={16} />
                        </Button>
                    </Popconfirm>
                    {blog.status === "pending" && (
                        <Button
                            size="small"
                            type="link"
                            style={{ color: "#16a34a" }}
                            onClick={() => handleApprove(blog.id)}
                        >
                            Duyệt
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <StaffLayout>
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Quản lý bài viết Blog</h1>
                    <Button
                        type="primary"
                        onClick={() => setShowModal(true)}
                    >
                        + Tạo bài viết
                    </Button>
                </div>
                <div className="mb-4 flex items-center gap-2">
                    <span>Lọc trạng thái:</span>
                    <Select
                        value={filter}
                        onChange={setFilter}
                        className="w-40"
                    >
                        <Option value="all">Tất cả</Option>
                        <Option value="pending">Chờ duyệt</Option>
                        <Option value="approved">Đã duyệt</Option>
                    </Select>
                </div>
                <Spin spinning={loading}>
                    <Table
                        columns={columns}
                        dataSource={filteredBlogs}
                        rowKey={record => record.blogId || record._id}
                        pagination={{ pageSize: 5 }}
                        className="bg-white shadow rounded"
                    />
                </Spin>
                <BlogModal
                    open={showModal}
                    blog={editingBlog}
                    onClose={handleModalClose}
                    onSave={handleModalSave}
                />
            </div>
        </StaffLayout>
    );
}

