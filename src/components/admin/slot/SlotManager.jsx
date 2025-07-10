import { useState, useEffect } from "react";
import { Button, Select, message, Table, Spin } from "antd";
import { bookingService } from "../../../services/bookingService";
import AdminLayout from "../../layout/admin/AdminLayout";

const { Option } = Select;

export default function SlotManager() {
  const [slots, setSlots] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  // Fetch slots from API
  const fetchSlots = async () => {
    setLoading(true);
    try {
      const data = await bookingService.getAllSlots();
      setSlots(data);
    } catch (err) {
      message.error("Không thể tải danh sách slot", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const filteredSlots = slots
    .filter((s) => filter === "all" || s.approvalStatus === filter)
    .sort(
      (a, b) =>
        new Date(a.scheduledTime).getTime() -
        new Date(b.scheduledTime).getTime()
    );

  const handleApprove = async (id) => {
    setLoading(true);
    try {
      const slot = slots.find((s) => s.slotId === id);
      console.log("slot", slot.slotId);
      await bookingService.updateApprovalStatus(slot.slotId, "Approved"); // Gửi chuỗi "Approved"
      message.success("Đã duyệt slot");
      fetchSlots();
    } catch {
      message.error("Duyệt thất bại");
    }
    setLoading(false);
  };

  // Handle Rejection
  const handleReject = async (id) => {
    setLoading(true);
    try {
      const slot = slots.find((s) => s.slotId === id);
      await bookingService.updateApprovalStatus(slot.slotId, "Rejected"); // Gửi chuỗi "Rejected"
      message.success("Slot đã bị từ chối");
      fetchSlots();
    } catch {
      message.error("Từ chối thất bại");
    }
    setLoading(false);
  };

  // Cấu hình cột cho Table antd
  const columns = [
    {
      title: "Thời gian",
      dataIndex: "scheduledTime",
      key: "scheduledTime",
      render: (date) =>
        new Date(date).toLocaleString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    {
      title: "Thời lượng",
      dataIndex: "durationMinutes",
      key: "durationMinutes",
      render: (duration) => `${duration} Phút`,
    },
    {
      title: "Trạng thái",
      dataIndex: "approvalStatus",
      key: "approvalStatus",
      render: (status) =>
        status === "Approved" ? (
          <span className="text-green-600">Đã phê duyệt</span>
        ) : status === "Rejected" ? (
          <span className="text-red-600">Đã từ chối</span>
        ) : (
          <span className="text-yellow-600">Chưa phê duyệt</span>
        ),
      filters: [
        { text: "Đã phê duyệt", value: "Approved" },
        { text: "Chưa phê duyệt", value: "Pending" },
        { text: "Đã từ chối", value: "Rejected" },
      ],
      onFilter: (value, record) => record.approvalStatus === value,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, slot) => (
        <div className="flex gap-2">
          {slot.approvalStatus === "Pending" && (
            <>
              <Button
                size="small"
                type="link"
                style={{ color: "#16a34a" }}
                onClick={() => handleApprove(slot.slotId)}
              >
                Duyệt
              </Button>
              <Button
                size="small"
                type="link"
                style={{ color: "#e11d48" }}
                onClick={() => handleReject(slot.slotId)}
              >
                Từ chối
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Quản lý Lịch hẹn</h1>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <span>Lọc trạng thái:</span>
          <Select value={filter} onChange={setFilter} className="w-40">
            <Option value="all">Tất cả</Option>
            <Option value="Pending">Chờ duyệt</Option>
            <Option value="Approved">Đã duyệt</Option>
            <Option value="Rejected">Đã từ chối</Option>
          </Select>
        </div>
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={filteredSlots}
            rowKey={(record) => record.slotId || record._id}
            pagination={{ pageSize: 5 }}
            className="bg-white shadow rounded"
          />
        </Spin>
      </div>
    </AdminLayout>
  );
}
