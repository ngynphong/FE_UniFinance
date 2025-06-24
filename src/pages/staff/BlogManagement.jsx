import React, { useState } from "react";
import { Modal, Button, Select, Input, message, Popconfirm, Table, Form } from "antd";
import { Edit, Trash2 } from "lucide-react";

const { Option } = Select;
const { TextArea } = Input;

const mockBlogs = [
    { id: 1, title: "Bài viết 1", content: "Tôi muốn tư vấn tài chính", author: "Staff A", status: "pending", blogImages: [{ imageUrl: "https://placehold.co/100x60" }] },
    { id: 2, title: "Bài viết 2", content: "Nội dung khác", author: "Staff B", status: "approved", blogImages: [{ imageUrl: "https://placehold.co/100x60" }] },
];

export default function BlogManagement() {
    const [blogs, setBlogs] = useState(mockBlogs);
    const [filter, setFilter] = useState("all");
    const [showModal, setShowModal] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);

    const filteredBlogs = blogs.filter(
        (b) => filter === "all" || b.status === filter
    );

    const handleEdit = (blog) => {
        setEditingBlog(blog);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        setBlogs(blogs.filter((b) => b.id !== id));
        message.success("Đã xóa bài viết");
    };

    const handleApprove = (id) => {
        setBlogs(
            blogs.map((b) =>
                b.id === id ? { ...b, status: "approved" } : b
            )
        );
        message.success("Đã duyệt bài viết");
    };

    const handleModalClose = () => {
        setShowModal(false);
        setEditingBlog(null);
    };

    const handleModalSave = (blog) => {
        if (blog.id) {
            setBlogs(
                blogs.map((b) => (b.id === blog.id ? blog : b))
            );
            message.success("Đã cập nhật bài viết");
        } else {
            setBlogs([
                ...blogs,
                { ...blog, id: Date.now(), status: "pending" },
            ]);
            message.success("Đã tạo bài viết mới");
        }
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
                    <img src={images[0].imageUrl} alt="blog" className="w-16 h-10 object-cover rounded" />
                ) : (
                    <span className="text-gray-400">Không có</span>
                ),
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
                        onConfirm={() => handleDelete(blog.id)}
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
            <Table
                columns={columns}
                dataSource={filteredBlogs}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                className="bg-white shadow rounded"
            />
            <BlogModal
                open={showModal}
                blog={editingBlog}
                onClose={handleModalClose}
                onSave={handleModalSave}
            />
        </div>
    );
}

function BlogModal({ open, blog, onClose, onSave }) {
    const [form] = Form.useForm();

    React.useEffect(() => {
        if (blog) {
            form.setFieldsValue({
                title: blog.title || "",
                content: blog.content || "",
                author: blog.author || "",
                imageUrl: blog.blogImages?.[0]?.imageUrl || "",
            });
        } else {
            form.resetFields();
        }
    }, [blog, form]);

    const handleOk = () => {
        form.validateFields().then(values => {
            const blogData = {
                ...blog,
                title: values.title,
                content: values.content,
                author: values.author,
                blogImages: values.imageUrl ? [{ imageUrl: values.imageUrl }] : [],
            };
            onSave(blogData);
        }).catch(() => { });
    };

    return (
        <Modal
            open={open}
            title={blog ? "Sửa bài viết" : "Tạo bài viết"}
            onCancel={onClose}
            onOk={handleOk}
            okText="Lưu"
            cancelText="Hủy"
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    title: "",
                    content: "",
                    author: "",
                    imageUrl: "",
                }}
            >
                <Form.Item
                    label="Tiêu đề"
                    name="title"
                    rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
                >
                    <Input placeholder="Nhập tiêu đề" />
                </Form.Item>
                <Form.Item
                    label="Nội dung"
                    name="content"
                    rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
                >
                    <TextArea rows={4} placeholder="Nhập nội dung bài viết" />
                </Form.Item>
                <Form.Item
                    label="Tác giả"
                    name="author"
                    rules={[{ required: true, message: "Vui lòng nhập tên tác giả" }]}
                >
                    <Input placeholder="Nhập tên tác giả" />
                </Form.Item>
                <Form.Item
                    label="Ảnh blog (URL)"
                    name="imageUrl"
                    rules={[{ required: false }]}
                >
                    <Input placeholder="Dán link ảnh (nếu có)" />
                </Form.Item>
            </Form>
        </Modal>
    );
}