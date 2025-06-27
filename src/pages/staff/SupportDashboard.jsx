import React, { useState } from "react";
import { Table, Button, Input, Modal, message, Tag } from "antd";
import StaffLayout from "../../components/layout/staff/StaffLayout";

const mockCustomers = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "a@gmail.com",
    issue: "Không đăng nhập được",
    status: "pending",
    note: "",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "b@gmail.com",
    issue: "Cần tư vấn nâng cấp gói",
    status: "pending",
    note: "",
  },
];

export default function SupportDashboard() {
  const [customers, setCustomers] = useState(mockCustomers);
  const [noteModal, setNoteModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [note, setNote] = useState("");

  const handleUpgradeSuggest = (customer) => {
    message.success(`Đã gửi gợi ý nâng cấp gói cho ${customer.name}`);
    // Gọi API gửi notification/email ở đây nếu có
  };

  const handleOpenNote = (customer) => {
    setSelectedCustomer(customer);
    setNote(customer.note || "");
    setNoteModal(true);
  };

  const handleSaveNote = () => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === selectedCustomer.id ? { ...c, note } : c
      )
    );
    setNoteModal(false);
    message.success("Đã lưu ghi chú hỗ trợ");
  };

  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vấn đề",
      dataIndex: "issue",
      key: "issue",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status === "pending" ? (
          <Tag color="orange">Đang chờ</Tag>
        ) : (
          <Tag color="green">Đã xử lý</Tag>
        ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, customer) => (
        <div className="flex gap-2">
          <Button
            size="small"
            onClick={() => handleUpgradeSuggest(customer)}
          >
            Gợi ý nâng cấp gói
          </Button>
          <Button
            size="small"
            onClick={() => handleOpenNote(customer)}
          >
            Ghi chú hỗ trợ
          </Button>
        </div>
      ),
    },
  ];

  return (
    <StaffLayout>
      <div>
        <h1 className="text-2xl font-bold mb-4">Hỗ trợ khách hàng</h1>
        <Table
          columns={columns}
          dataSource={customers}
          rowKey="id"
          pagination={false}
          className="bg-white shadow rounded"
        />
        <Modal
          open={noteModal}
          title={`Ghi chú hỗ trợ: ${selectedCustomer?.name}`}
          onCancel={() => setNoteModal(false)}
          onOk={handleSaveNote}
          okText="Lưu"
          cancelText="Hủy"
        >
          <Input.TextArea
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Nhập ghi chú hỗ trợ kỹ thuật"
          />
        </Modal>
      </div>
    </StaffLayout>
  );
}