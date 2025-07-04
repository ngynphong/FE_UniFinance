import { useState, useEffect } from "react";
import { useAuth } from "../../../components/auth/useAuthHook";
import packageService from "../../../services/packageService"; // Import packageService
import { bookingService } from "../../../services/bookingService"; // Import bookingService
import { authService } from "../../../services/authService";
import { NumericFormat } from "react-number-format";
import DashboardLayout from '../../../components/layout/user/DashboardLayout';

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
        const [pkg] = await packageService.getUserPackage(user.userID);
        setUserPackage(pkg);
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
    } catch (err) {
      console.error(err);
      alert(err.message || "Đặt lịch thất bại");
    }
  }

  const packageName = userPackage?.packageName || "Unknown package";

  function formatSlotLabel(isoTime, duration) {
    const dt = new Date(isoTime);
    const day = dt.toLocaleDateString("vi-VN", { weekday: "short" }); // “Th 2”, “Th 3”, …
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

  return (
    <DashboardLayout>
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
        <h2>📅 Đặt lịch tư vấn tài chính</h2>

        {/* A. Thông tin người dùng */}
        <section
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <h3>👤 Thông tin tài khoản</h3>
          <p>
            <strong>Tên:</strong> {userProfile?.name}
          </p>
          <p>
            <strong>Email:</strong> {userProfile?.email}
          </p>
          <p>
            <strong>Gói:</strong> {userPackage?.packageName}
          </p>
          {packageName === "Free" && (
            <p style={{ color: "red" }}>
              Bạn được tư vấn miễn phí 15 phút đầu.
            </p>
          )}
          {packageName === "Plus" && (
            <p style={{ color: "red" }}>
              {" "}
              Bạn được tư vấn miễn phí 60 phút/buổi.
            </p>
          )}
          {packageName === "Premium" && (
            <p style={{ color: "red" }}>
              {" "}
              Bạn được tư vấn miễn phí 120 phút/buổi.
            </p>
          )}
        </section>

        {/* B. Chọn lịch khả dụng */}
        <section
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <h3>📅 Chọn lịch khả dụng</h3>

          {availableSlots.length === 0 && <p>Đang tải slot...</p>}

          <div
  style={{
    maxHeight: 220,             // chiều cao cố định ~6-7 dòng
    overflowY: "auto",
    border: "1px solid #eee",
    padding: 8,
    borderRadius: 4,
  }}
>
  {availableSlots.map((slot) => (
    <label key={slot.slotId} style={{ display: "block", marginBottom: 4 }}>
      <input
        type="radio"
        name="slot"
        value={slot.slotId}
        checked={selectedSlotId === slot.slotId}
        onChange={() => setSelectedSlotId(slot.slotId)}
      />
      {slot.label}
    </label>
  ))}
</div>

{errors.slot && (
  <p style={{ color: "red", marginTop: 6 }}>Vui lòng chọn một slot.</p>
)}
        </section>

        {/* C. Thông tin tài chính */}
        <section
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <h3>📝 Thông tin tài chính</h3>
          <label>
            Thu nhập hàng tháng (VND):
            <NumericFormat
              thousandSeparator="."
              decimalSeparator=","
              allowNegative={false}
              value={income}
              onValueChange={(values) => setIncome(values.value)}
              style={{ width: "100%", marginBottom: "0.5rem" }}
            />
          </label>
          {errors.income && (
            <p style={{ color: "red", margin: "2px 0 6px" }}>
              Vui lòng nhập thu nhập.
            </p>
          )}
          <label>
            Chi tiêu hàng tháng (VND):
            <NumericFormat
              thousandSeparator="."
              decimalSeparator=","
              allowNegative={false}
              value={expense}
              onValueChange={(values) => setExpense(values.value)}
              style={{ width: "100%", marginBottom: "0.5rem" }}
            />
          </label>
          {errors.expense && (
            <p style={{ color: "red", margin: "2px 0 6px" }}>
              Vui lòng nhập chi tiêu.
            </p>
          )}
          <label>
            Mục tiêu tài chính:
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              style={{ width: "100%", height: "80px" }}
            />
          </label>
          {errors.goal && (
            <p style={{ color: "red", margin: "2px 0 6px" }}>
              Vui lòng nhập mục tiêu tài chính.
            </p>
          )}
        </section>

        {/* D. Xem trước thông tin đặt */}
        <section
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <h3>✅ Xem trước thông tin đặt</h3>
          <p>
            <strong>Tên:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {userProfile?.email}
          </p>
          <p>
            <strong>Gói:</strong> {packageName}
          </p>
          <p>
            <p>
              <strong>Slot đã chọn:</strong> {selectedSlotLabel || "Chưa chọn"}
            </p>
          </p>
          <p>
            <strong>Thu nhập:</strong>{" "}
            {income ? nf.format(Number(income)) + " VND" : "Chưa nhập"}
          </p>
          <p>
            <strong>Chi tiêu:</strong>{" "}
            {expense ? nf.format(Number(expense)) + " VND" : "Chưa nhập"}
          </p>
          <p>
            <strong>Mục tiêu:</strong> {goal || "Chưa nhập"}
          </p>
        </section>

        {/* E. Nút xác nhận */}
        <button onClick={handleSubmit}>Đặt lịch ngay</button>

        {confirmed && <p style={{ color: "green" }}>✅ Đặt lịch thành công!</p>}
      </div>
    </DashboardLayout>
  );
}
