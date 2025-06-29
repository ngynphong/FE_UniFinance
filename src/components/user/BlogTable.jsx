import { Table, Button, Space, Tag } from "antd";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";

function BlogTable({ blogs, onEdit, onDelete,loading }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateText = (text, maxLength = 100) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
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
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      render: (text) => truncateText(text, 80),
    },
    {
      title: "Ngày tạo",
      dataIndex: "uploadDate",
      key: "uploadDate",
      render: (date) => (date ? formatDate(date) : "N/A"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => onDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white p-4 rounded-md shadow">
      <Table
        rowKey="id"
        columns={columns}
        dataSource={blogs}
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default BlogTable;
