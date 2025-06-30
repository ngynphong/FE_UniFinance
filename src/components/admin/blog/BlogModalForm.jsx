import React, { useEffect } from "react";
import { Modal, Form, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const BlogModalForm = ({
  visible,
  onCancel,
  onOk,
  initialValues,
  isEditMode,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isEditMode) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [visible, isEditMode, initialValues, form]);


const handleSubmit = () => {
  form
    .validateFields()
    .then((values) => {
      let blogImages = values.blogImages;
      if (typeof blogImages === 'string' && blogImages.trim() !== '') {
        blogImages = blogImages
          .split(',')
          .map(url => url.trim())
          .filter(url => url)
          .map(url => ({ imageUrl: url }));
      } else if (!blogImages) {
        blogImages = [];
      }
      onOk({ ...initialValues, ...values, blogImages });
      form.resetFields();
    })
    .catch((info) => console.log('Validate Failed:', info));
};

  return (
    <Modal
      open={visible}
      title={isEditMode ? "Chỉnh sửa blog" : "Tạo blog mới"}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText={isEditMode ? "Lưu" : "Tạo"}
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Tiêu đề"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="content"
          label="Nội dung"
          rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="author"
          label="Tác giả"
          rules={[{ required: true, message: "Vui lòng nhập tên tác giả" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="blogImages" label="Hình ảnh (URL)">
          <Input placeholder="https://a.jpg, https://b.jpg" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BlogModalForm;
