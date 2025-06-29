import { Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

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

export default BlogModal;