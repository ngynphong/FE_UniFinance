import React, { useState, useEffect } from "react";
import { Table, Button, Input, Modal, message, Tag } from "antd";
import StaffLayout from "../../components/layout/staff/StaffLayout";
import { contactService } from "../../services/contactService"; 

export default function SupportDashboard() {
  const [customers, setCustomers] = useState([]);
  // const [noteModal, setNoteModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false); 
  // const [selectedCustomer, setSelectedCustomer] = useState(null);
  // const [note, setNote] = useState("");
  const [selectedMessage, setSelectedMessage] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await contactService.getAllContacts();
        setCustomers(data); 
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        message.error("Không thể tải danh sách khách hàng.");
      }
    };

    fetchCustomers();
  }, []);

  // const handleUpgradeSuggest = (customer) => {
  //   message.success(`Đã gửi gợi ý nâng cấp gói cho ${customer.name}`);
  // };

  // const handleOpenNote = (customer) => {
  //   setSelectedCustomer(customer);
  //   setNote(customer.note || "");
  //   setNoteModal(true);
  // };

  // const handleSaveNote = () => {
  //   setCustomers((prev) =>
  //     prev.map((c) =>
  //       c.id === selectedCustomer.id ? { ...c, note } : c
  //     )
  //   );
  //   setNoteModal(false);
  //   message.success("Đã lưu ghi chú hỗ trợ");
  // };

  const handleOpenMessage = (messageContent) => {
    setSelectedMessage(messageContent);
    setMessageModal(true);
  };

  const handleChangeStatus = async (customer) => {
  try {
    const updatedResolvedStatus = !customer.resolved;

    // Gọi API với contactId và resolved
    const response = await contactService.updateStatus(customer.contactId, updatedResolvedStatus);

    if (response?.message === "Cập nhật trạng thái thành công.") {
      // Cập nhật danh sách khách hàng sau khi thay đổi trạng thái
      setCustomers((prev) =>
        prev.map((c) =>
          c.contactId === customer.contactId ? { ...c, resolved: updatedResolvedStatus } : c
        )
      );
      message.success("Trạng thái đã được thay đổi");
    }
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    message.error("Không thể thay đổi trạng thái.");
  }
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
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (message) => (
        <Button size="small" onClick={() => handleOpenMessage(message)}>
          Xem chi tiết
        </Button>
      ),
    },
    {
      title: "Ngày gửi", 
      dataIndex: "dateSent",
      key: "dateSent",
      render: (dateSent) => {
        const date = new Date(dateSent);
        return <span>{date.toLocaleDateString()}</span>; 
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "resolved",
      key: "resolved",
      render: (resolved, customer) => (
        <div>
          <Tag
            color={resolved ? "green" : "orange"}
            onClick={() => handleChangeStatus(customer)} // Thay đổi trạng thái khi nhấn vào tag
            style={{ cursor: "pointer" }}
          >
            {resolved ? "Đã xử lý" : "Đang chờ"}
          </Tag>
        </div>
      ),
    },
    // {
    //   title: "Hành động",
    //   key: "action",
    //   render: (_, customer) => (
    //     <div className="flex gap-2">
    //       <Button
    //         size="small"
    //         onClick={() => handleUpgradeSuggest(customer)}
    //       >
    //         Gợi ý nâng cấp gói
    //       </Button>
    //       <Button
    //         size="small"
    //         onClick={() => handleOpenNote(customer)}
    //       >
    //         Ghi chú hỗ trợ
    //       </Button>
    //     </div>
    //   ),
    // },
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
        
        {/* Modal để hiển thị ghi chú */}
        {/* <Modal
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
        </Modal> */}

        {/* Modal để hiển thị Message */}
        <Modal
          open={messageModal}
          title="Chi tiết vấn đề"
          onCancel={() => setMessageModal(false)}
          footer={[
            <Button key="close" onClick={() => setMessageModal(false)}>
              Đóng
            </Button>,
          ]}
        >
          <p>{selectedMessage}</p>
        </Modal>
      </div>
    </StaffLayout>
  );
}
