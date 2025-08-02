import { useState, useEffect } from "react";
import { useAuth } from "../../../components/auth/useAuthHook";
import packageService from "../../../services/packageService"; // Import packageService
import { bookingService } from "../../../services/bookingService"; // Import bookingService
import { authService } from "../../../services/authService";
import { NumericFormat } from "react-number-format";
import DashboardLayout from '../../../components/layout/user/DashboardLayout';
import { Card, Button, Input, Typography, Divider, message } from 'antd';

const { Title, Text } = Typography;

export default function BookingForm() {
  const { user } = useAuth();
  const [availableSlots, setAvailableSlots] = useState([]); // [{slotId, label, scheduledTime}]
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [goal, setGoal] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const [userPackage, setUserPackage] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [errors, setErrors] = useState({
    slot: false,
    income: false,
    expense: false,
    goal: false,
  });
  // const availableSlots = [
  //   { label: "Thứ 3, 10:00 - 10:15", value: "2025-07-04T10:00:00" },
  //   { label: "Thứ 4, 14:00 - 14:30", value: "2025-07-05T14:00:00" },
  //   { label: "Thứ 5, 9:00 - 9:15", value: "2025-07-06T09:00:00" },
  // ];

  // A1. Thông tin gói và profile
  useEffect(() => {
    (async () => {
      try {
        const pkg = await packageService.getUserPackage(user.userID);
        setUserPackage(pkg[1]);
        const profile = await authService.getUserProfile(user.userID);
        setUserProfile(profile);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [user]);


  // A2. Slot khả dụng – tuần hiện tại (weekOffset=0) / hoặc truyền thêm date
  useEffect(() => {
    (async () => {
      try {
        const slots = await bookingService.getAvailableSlots(); // mặc định tuần hiện tại
        const display = slots.map((s) => ({
          slotId: s.slotId,
          scheduledTime: s.scheduledTime,
          label: formatSlotLabel(s.scheduledTime, s.durationMinutes),
        }));
        setAvailableSlots(display);
      } catch (err) {
        console.error("Error fetching slots:", err);
      }
    })();
  }, []);

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {
      slot: !selectedSlotId,
      income: !income,
      expense: !expense,
      goal: !goal,
    };
    setErrors(newErrors);

    // Nếu có lỗi, dừng lại
    if (Object.values(newErrors).some(Boolean)) return;

    setConfirmed(false);

    try {
      const newBooking = await bookingService.createBooking({
        slotId: selectedSlotId,
        incomeNote: income,
        expenseNote: expense,
        goalNote: goal,
      });
      console.log("Booking created:", newBooking);
      setConfirmed(true);
      message.success('Đặt lịch thành công!');
    } catch (err) {
      console.error(err);
      message.error(err.message || "Đặt lịch thất bại");
    }
  }

  const packageName = userPackage?.packageName || "Unknown package";

  function formatSlotLabel(isoTime, duration) {
    const dt = new Date(isoTime);
    const day = dt.toLocaleDateString("vi-VN", { weekday: "short" }); // "Th 2", "Th 3", ...
    const time = dt.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const end = new Date(dt.getTime() + duration * 60000).toLocaleTimeString(
      "vi-VN",
      { hour: "2-digit", minute: "2-digit" }
    );
    return `${day}, ${time} - ${end}`;
  }

  const selectedSlotLabel = availableSlots.find(
    (s) => s.slotId === selectedSlotId
  )?.label;

  const nf = new Intl.NumberFormat("vi-VN");

  if (userPackage === null) {
    return (
      <DashboardLayout>
        <div className="max-w-xl mx-auto p-8 text-center">
          <div className="text-2xl text-red-500 font-bold mb-4">Bạn chưa đăng ký gói dịch vụ nào!</div>
          <div className="text-gray-700 mb-4">Vui lòng mua hoặc đăng ký gói dịch vụ để sử dụng chức năng đặt lịch tư vấn tài chính.</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <Title level={2} className="text-center">📅 Đặt lịch tư vấn tài chính</Title>
        {/* Thông tin người dùng */}
        <Card bordered className="mb-2 shadow">
          <Title level={4}>👤 Thông tin tài khoản</Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div><Text strong>Tên:</Text> {userProfile?.name}</div>
            <div><Text strong>Email:</Text> {userProfile?.email}</div>
            <div><Text strong>Gói:</Text> {userPackage?.packageName}</div>
          </div>
          {packageName === "Free" && (
            <Text type="danger">Bạn được tư vấn miễn phí 15 phút đầu.</Text>
          )}
          {packageName === "Plus" && (
            <Text type="danger">Bạn được tư vấn miễn phí 60 phút/buổi.</Text>
          )}
          {packageName === "Premium" && (
            <Text type="danger">Bạn được tư vấn miễn phí 120 phút/buổi.</Text>
          )}
        </Card>

        {/* Chọn lịch khả dụng */}
        <Card bordered className="mb-2 shadow">
          <Title level={4}>📅 Chọn lịch khả dụng</Title>
          {availableSlots.length === 0 && <p>Đang tải slot...</p>}
          <div className="max-h-56 overflow-y-auto border border-gray-200 rounded p-2 bg-gray-50">
            {availableSlots.map((slot) => (
              <label
                key={slot.slotId}
                className={`block mb-2 p-2 rounded cursor-pointer transition border ${selectedSlotId === slot.slotId ? 'bg-blue-100 border-blue-400' : 'hover:bg-blue-50 border-transparent'}`}
              >
                <input
                  type="radio"
                  name="slot"
                  value={slot.slotId}
                  checked={selectedSlotId === slot.slotId}
                  onChange={() => setSelectedSlotId(slot.slotId)}
                  className="mr-2 accent-blue-500"
                />
                {slot.label}
              </label>
            ))}
          </div>
          {errors.slot && (
            <Text type="danger">Vui lòng chọn một slot.</Text>
          )}
        </Card>

        {/* Thông tin tài chính */}
        <Card bordered className="mb-2 shadow">
          <Title level={4}>📝 Thông tin tài chính</Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Thu nhập hàng tháng (VND):</label>
              <NumericFormat
                thousandSeparator="."
                decimalSeparator=","
                allowNegative={false}
                value={income}
                onValueChange={(values) => setIncome(values.value)}
                className="w-full border rounded px-2 py-1"
              />
              {errors.income && (
                <Text type="danger">Vui lòng nhập thu nhập.</Text>
              )}
            </div>
            <div>
              <label>Chi tiêu hàng tháng (VND):</label>
              <NumericFormat
                thousandSeparator="."
                decimalSeparator=","
                allowNegative={false}
                value={expense}
                onValueChange={(values) => setExpense(values.value)}
                className="w-full border rounded px-2 py-1"
              />
              {errors.expense && (
                <Text type="danger">Vui lòng nhập chi tiêu.</Text>
              )}
            </div>
            <div className="md:col-span-2">
              <label>Mục tiêu tài chính:</label>
              <Input.TextArea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full border rounded px-2 py-1"
                rows={3}
              />
              {errors.goal && (
                <Text type="danger">Vui lòng nhập mục tiêu tài chính.</Text>
              )}
            </div>
          </div>
        </Card>

        {/* Xem trước thông tin đặt */}
        <Card bordered className="mb-2 shadow bg-blue-50">
          <Title level={4}>✅ Xem trước thông tin đặt</Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div><Text strong>Tên:</Text> {user.name}</div>
            <div><Text strong>Email:</Text> {userProfile?.email}</div>
            <div><Text strong>Gói:</Text> {packageName}</div>
            <div><Text strong>Slot đã chọn:</Text> {selectedSlotLabel || "Chưa chọn"}</div>
            <div><Text strong>Thu nhập:</Text> {income ? nf.format(Number(income)) + " VND" : "Chưa nhập"}</div>
            <div><Text strong>Chi tiêu:</Text> {expense ? nf.format(Number(expense)) + " VND" : "Chưa nhập"}</div>
            <div className="md:col-span-2"><Text strong>Mục tiêu:</Text> {goal || "Chưa nhập"}</div>
          </div>
        </Card>

        {/* Nút xác nhận */}
        <div className="flex justify-center">
          <Button
            type="primary"
            size="large"
            className="px-8 py-2 rounded shadow-lg bg-blue-500 hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Đặt lịch ngay
          </Button>
        </div>
        {confirmed && <p className="text-green-600 text-center mt-4">✅ Đặt lịch thành công!</p>}
      </div>
    </DashboardLayout>
  );
}
