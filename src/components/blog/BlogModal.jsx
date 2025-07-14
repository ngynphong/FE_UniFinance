import { Form, Input, Modal, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React from "react";
import { uploadToCloudinary } from "../utils/uploadImage"; // đường dẫn đúng

function BlogModal({ open, blog, onClose, onSave }) {
  const [form] = Form.useForm();
  const [uploading, setUploading] = React.useState(false);

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

  const handleUpload = async ({ file }) => {
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      form.setFieldsValue({ imageUrl: url });
      message.success("Tải ảnh thành công");
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      message.error("Tải ảnh thất bại");
    }
    setUploading(false);
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
          <Input.TextArea rows={4} placeholder="Nhập nội dung bài viết" />
        </Form.Item>
        <Form.Item
          label="Tác giả"
          name="author"
          rules={[{ required: true, message: "Vui lòng nhập tên tác giả" }]}
        >
          <Input placeholder="Nhập tên tác giả" />
        </Form.Item>
        <Form.Item label="Tải ảnh lên">
          <Upload
            customRequest={handleUpload}
            showUploadList={false}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />} loading={uploading}>
              Chọn ảnh từ máy
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Link ảnh (tự động cập nhật sau khi upload)" name="imageUrl">
          <Input placeholder="https://..." readOnly />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default BlogModal;
