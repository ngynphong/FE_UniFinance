import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import SlotModal from "../../components/slot/SlotModal";
import { Button, Popconfirm, Table, Spin, message } from "antd";
import {
  Calendar,
  User,
  Phone,
  Mail,
  Timer,
  MessageCircle,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Search,
  Edit,
  Edit3,
  Trash2,
  Eye,
  Clock,
  RotateCcw,
} from "lucide-react";
import StaffLayout from "../../components/layout/staff/StaffLayout";
import { bookingService } from "../../services/bookingService";
import { authService } from "../../services/authService";
import packageService from "../../services/packageService";

const ConsultationManagement = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [filter, setFilter] = useState("all");
  const [filteredAppointments, setFilteredAppointments] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [startTime, setStartTime] = useState("");
  const [packageName, setPackageName] = useState("");
  const [packages, setPackages] = useState([]);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedAppointmentStr = queryParams.get("selectedAppointment");

  useEffect(() => {
    const activeTabParam = queryParams.get("activeTab");

    if (activeTabParam) {
      setActiveTab(activeTabParam);
    }

    if (selectedAppointmentStr) {
      try {
        const selectedAppointment = JSON.parse(
          decodeURIComponent(selectedAppointmentStr)
        );
        setSelectedAppointment(selectedAppointment);
      } catch (error) {
        console.error("Error parsing selectedAppointment:", error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookings = await bookingService.getAllBookings();

        // Lấy thông tin người dùng và thông tin slot cho mỗi booking
        const bookingsWithUserInfoAndSlot = await Promise.all(
          bookings.map(async (booking) => {
            // Lấy thông tin người dùng
            const userInfor = await authService.getUserProfile(booking.userId);

            // Lấy thông tin slot
            const slotInfor = await bookingService.getSlotById(booking.slotId);

            // Lấy thông tin phản hồi
            const bookingResponseInfor =
              await bookingService.getResponsesByBookingId(booking.bookingId);

            // Lấy thông tin gói
            const packageInfor = await packageService.getUserPackage(
              booking.userId
            );

            const responseText =
              bookingResponseInfor && bookingResponseInfor.length > 0
                ? bookingResponseInfor[0].responseText
                : null;

            const packageName =
              packageInfor && packageInfor.length > 0
                ? packageInfor[0].packageName
                : "Không có gói";
            return {
              ...booking,
              name: userInfor.name,
              phone: userInfor.phone,
              email: userInfor.email,
              avatar: userInfor.avatar,
              responseText: responseText,
              slotScheduledTime: slotInfor.scheduledTime,
              durationMinutes: slotInfor.durationMinutes,
              packageName: packageName,
            };
          })
        );

        setAppointments(bookingsWithUserInfoAndSlot);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const fetchAllSlots = async () => {
    setLoading(true);
    try {
      const response = await bookingService.getAllSlots();
      setSlots(response);
    } catch (error) {
      console.error("Error fetching all slots:", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchAllSlots();
  }, []);

  const handleSlotEdit = (slot) => {
    setSelectedSlot(slot);
    setEditModalOpen(true);
  };

  const handleModalClose = () => {
    setEditModalOpen(false);
    setSelectedSlot(null);
  };

  const handleModalSave = async (slot) => {
    setLoading(true);
    try {
      if (slot.slotId) {
        await bookingService.updateSlot(slot.slotId, slot);
        message.success("Đã cập nhật lịch hẹn");
      }
      fetchAllSlots();
    } catch {
      message.error("Lưu thất bại");
    }
    setLoading(false);
    handleModalClose();
  };

  const handleDeleteSlot = async (slotId) => {
    setLoading(true);
    try {
      await bookingService.deleteSlot(slotId);
      setSlots((prev) => prev.filter((pkg) => pkg.slotId !== slotId));
      toast.success("Lịch hẹn đã được xóa thành công.");
    } catch (error) {
      console.error("Error deleting slot:", error);
      toast.error("Có lỗi xảy ra khi xóa lịch hẹn.");
    }
    setLoading(false);
  };

  // Lọc appointments theo status và search
  useEffect(() => {
    const filtered = selectedAppointment
      ? [selectedAppointment] // Chỉ hiển thị cuộc hẹn đã chọn
      : appointments.filter((apt) => {
          const matchesFilter = filter === "all" || apt.status === filter;
          const matchesSearch =
            (apt.name &&
              apt.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (apt.email &&
              apt.email.toLowerCase().includes(searchTerm.toLowerCase()));
          return matchesFilter && matchesSearch;
        });

    setFilteredAppointments(filtered); // Cập nhật lại filteredAppointments
  }, [appointments, selectedAppointment, filter, searchTerm]);

  const filteredSlots = slots
    .filter((s) => filter === "all" || s.approvalStatus === filter)
    .sort(
      (a, b) =>
        new Date(a.scheduledTime).getTime() -
        new Date(b.scheduledTime).getTime()
    );

  // Thống kê dashboard
  const stats = {
    total: appointments.length,
    pending: appointments.filter((apt) => apt.status === "Chờ xử lý").length,
    confirmed: appointments.filter((apt) => apt.status === "Đã xác nhận")
      .length,
    cancelled: appointments.filter((apt) => apt.status === "Đã hủy").length,
  };

  const handleStatusChange = async (appointment, appointmentId, newStatus) => {
    let responseMessage = "";

    if (newStatus === "Đã hủy") {
      if (!appointment.responseText || !appointment.responseText.trim()) {
        toast.warning("Vui lòng nhập lý do hủy lịch hẹn.");
        setSelectedAppointment(appointment);
        setShowResponseModal(true);
        return;
      }
    }

    const confirmMessage =
      newStatus === "Đã xác nhận"
        ? "Bạn có chắc chắn muốn xác nhận lịch hẹn này không?"
        : "Bạn có chắc chắn muốn hủy lịch hẹn này không?";

    const isConfirmed = window.confirm(confirmMessage);

    if (isConfirmed) {
      try {
        const updatedBooking = await bookingService.updateBookingStatus(
          appointmentId,
          newStatus
        );

        if (newStatus === "Đã xác nhận" && !appointment.responseText) {
          responseMessage = `Chào bạn ${
            appointment.name
          }, chúng tôi đã xác nhận lịch tư vấn vào ${new Date(
            appointment.slotScheduledTime
          ).toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          })} ngày ${new Date(appointment.slotScheduledTime).toLocaleDateString(
            "vi-VN"
          )}`;

          await bookingService.addBookingResponse(
            appointmentId,
            responseMessage
          );
          setAppointments((prev) =>
            prev.map((apt) =>
              apt.bookingId === appointmentId
                ? { ...apt, responseText: responseMessage }
                : apt
            )
          );
        }

        setAppointments((prev) =>
          prev.map((apt) =>
            apt.bookingId === appointmentId
              ? { ...apt, ...updatedBooking, status: newStatus }
              : apt
          )
        );

        setSelectedAppointment(null);
        setFilter("all");
        toast.success(
          `Lịch hẹn đã được ${newStatus === "Đã xác nhận" ? "xác nhận" : "hủy"}`
        );
      } catch (error) {
        console.error("Error updating booking status:", error);
      }
    }
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await packageService.getPackage();
        setPackages(response);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);

  const handleCreateSlot = async () => {
    if (!startTime || !packageName) {
      toast.error("Vui lòng chọn thời gian và gói dịch vụ.");
      return;
    }

    try {
      const slotData = {
        startTime,
        packageName,
      };

      const response = await bookingService.createSlot(slotData);
      toast.success(
        `Lịch hẹn vào lúc ${new Date(
          response.scheduledTime
        ).toLocaleTimeString()} đã được tạo!`
      );

      setSlots((prevSlots) => [response, ...prevSlots]);

      setStartTime(null);
      setPackageName("");
    } catch (error) {
      console.error(error);
    }
  };
  const handleSendResponse = async (appointmentId) => {
    if (responseText.trim()) {
      try {
        if (selectedAppointment?.responseText) {
          const updatedResponse = await bookingService.updateBookingResponse(
            appointmentId,
            responseText
          );

          setAppointments((prev) =>
            prev.map((apt) =>
              apt.bookingId === appointmentId
                ? { ...apt, responseText: updatedResponse.responseText }
                : apt
            )
          );

          toast.success("Phản hồi đã được cập nhật thành công.");
        } else {
          const response = await bookingService.addBookingResponse(
            appointmentId,
            responseText
          );

          setAppointments((prev) =>
            prev.map((apt) =>
              apt.bookingId === appointmentId
                ? { ...apt, responseText: response.responseText }
                : apt
            )
          );

          toast.success("Phản hồi đã được gửi thành công.");
        }

        setResponseText("");
        setShowResponseModal(false);
        setSelectedAppointment(null);
      } catch (error) {
        console.error("Error sending response:", error);
        toast.error("Có lỗi xảy ra khi gửi phản hồi.");
      }
    } else {
      toast.warning("Vui lòng nhập nội dung phản hồi.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Chờ xử lý":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Đã xác nhận":
        return "bg-green-100 text-green-800 border-green-200";
      case "Đã hủy":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Chờ xử lý":
        return <AlertCircle className="w-4 h-4" />;
      case "Đã xác nhận":
        return <CheckCircle className="w-4 h-4" />;
      case "Đã hủy":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "Chờ xử lý":
        return "Chờ xử lý";
      case "Đã xác nhận":
        return "Đã xác nhận";
      case "Đã hủy":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const nf = new Intl.NumberFormat("vi-VN");

  const columns = [
    {
      title: "Thời gian",
      dataIndex: "scheduledTime",
      key: "scheduledTime",
      render: (date) => {
        // Tạo đối tượng Date từ dữ liệu
        const formattedDate = new Date(date);

        // Chuyển đổi thành định dạng "DD/MM/YYYY hh:mm A"
        const options = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true, // Đảm bảo sử dụng định dạng 12 giờ (AM/PM)
        };

        // Trả về thời gian định dạng theo "vi-VN"
        return formattedDate.toLocaleString("vi-VN", options);
      },
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
          {slot.approvalStatus !== "Approved" &&
            slot.approvalStatus !== "Rejected" && (
              <Button
                size="small"
                type="link"
                onClick={() => handleSlotEdit(slot)}
              >
                <Edit size={16} />
              </Button>
            )}
          <Popconfirm
            title="Bạn chắc chắn muốn xóa?"
            onConfirm={() => handleDeleteSlot(slot.slotId)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button size="small" type="link" danger>
              <Trash2 size={16} />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <StaffLayout>
      <div className="min-h-screen bg-gray-50 rounded-2xl">
        {/* Header */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-blue-600" />
                <h1 className="ml-2 text-2xl font-bold text-gray-900">
                  Quản lý Lịch Tư vấn
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-6">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "dashboard"
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Tổng quan
            </button>
            <button
              onClick={() => setActiveTab("appointments")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "appointments"
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Quản lý Lịch hẹn
            </button>
            <button
              onClick={() => setActiveTab("schedules")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "schedules"
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Tạo Lịch hẹn
            </button>
          </div>

          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Tổng lịch hẹn
                      </p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {stats.total}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <AlertCircle className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Chờ xử lý
                      </p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {stats.pending}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Đã xác nhận
                      </p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {stats.confirmed}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <XCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Đã hủy
                      </p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {stats.cancelled}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Appointments */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Lịch hẹn gần đây
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Khách hàng
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Mục tiêu
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ngày gửi
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trạng thái
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thao tác
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[...appointments]
                        .sort(
                          (a, b) =>
                            new Date(a.scheduledTime).getTime() -
                            new Date(b.scheduledTime).getTime()
                        )
                        .slice(0, 5)
                        .map((appointment) => (
                          <tr
                            key={appointment.bookingId}
                            className="hover:bg-gray-50"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  {appointment.avatar ? (
                                    <img
                                      src={appointment.avatar}
                                      alt={appointment.name}
                                      className="w-4 h-4 rounded-full"
                                    />
                                  ) : (
                                    <User className="w-4 h-4 text-blue-600" />
                                  )}
                                </div>
                                <div className="ml-3">
                                  <div className="text-sm font-medium text-gray-900">
                                    {appointment.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {appointment.phone}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {appointment.goalNote}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(appointment.createdAt).toLocaleString(
                                "vi-VN",
                                {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                }
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                                  appointment.status
                                )}`}
                              >
                                {getStatusIcon(appointment.status)}
                                <span className="ml-1">
                                  {getStatusText(appointment.status)}
                                </span>
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button
                                onClick={() => {
                                  setSelectedAppointment(appointment);
                                  setActiveTab("appointments");
                                }}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Appointments Management Tab */}
          {activeTab === "appointments" && (
            <div className="space-y-6">
              {/* Filters and Search */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Tìm kiếm theo tên, email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedAppointment ? (
                      <button
                        onClick={() => {
                          setSelectedAppointment(null);
                          setActiveTab("appointments");
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <RotateCcw className="w-5 h-5 text-gray-400" />
                      </button>
                    ) : (
                      <Filter className="w-5 h-5 text-gray-400" />
                    )}
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">Tất cả trạng thái</option>
                      <option value="Chờ xử lý">Chờ xử lý</option>
                      <option value="Đã xác nhận">Đã xác nhận</option>
                      <option value="Đã hủy">Đã hủy</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Appointments List */}
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <div
                    key={appointment.bookingId}
                    className="bg-white rounded-lg shadow-sm border border-gray-200"
                  >
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="text-lg font-medium text-gray-900">
                                  {appointment.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  ID: #{appointment.bookingId}
                                </p>
                              </div>
                            </div>
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                                appointment.status
                              )}`}
                            >
                              {getStatusIcon(appointment.status)}
                              <span className="ml-1">
                                {getStatusText(appointment.status)}
                              </span>
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <Mail className="w-4 h-4 mr-2" />
                              {appointment.email}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="w-4 h-4 mr-2" />
                              {new Date(
                                appointment.slotScheduledTime
                              ).toLocaleDateString("vi-VN", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              })}
                              {" lúc "}
                              {new Date(
                                appointment.slotScheduledTime
                              ).toLocaleTimeString("vi-VN", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="w-4 h-4 mr-2" />
                              {appointment.phone}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Timer className="w-4 h-4 mr-2" />
                              {appointment.durationMinutes} Phút
                            </div>
                          </div>

                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">
                              Mục đích tư vấn:
                            </p>
                            <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                              {appointment.goalNote}
                            </p>
                          </div>

                          {appointment.responseText && (
                            <div className="mb-4">
                              <p className="text-sm font-medium text-gray-700 mb-2">
                                Phản hồi của bạn:
                              </p>
                              <p className="text-sm text-gray-600 bg-blue-50 rounded-lg p-3 border-l-4 border-blue-400">
                                {appointment.responseText}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="mt-4 lg:mt-0 lg:ml-6 lg:flex-shrink-0">
                          <div className="flex flex-col space-y-2">
                            {new Date(appointment.slotScheduledTime) <=
                            new Date() ? (
                              // Nếu thời gian lịch hẹn đã qua
                              <>
                                {/* Nếu có phản hồi, hiển thị nút Chỉnh sửa phản hồi */}
                                {appointment.responseText != null &&
                                appointment.responseText !== "" ? (
                                  <button
                                    onClick={() => {
                                      setSelectedAppointment(appointment);
                                      setResponseText(
                                        appointment.responseText || ""
                                      );
                                      setShowResponseModal(true);
                                    }}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                  >
                                    <Edit3 className="w-4 h-4 mr-2" />
                                    Chỉnh sửa phản hồi
                                  </button>
                                ) : (
                                  // Nếu không có phản hồi, hiển thị nút Phản hồi
                                  <button
                                    onClick={() => {
                                      setSelectedAppointment(appointment);
                                      setResponseText("");
                                      setShowResponseModal(true);
                                    }}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                  >
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Phản hồi
                                  </button>
                                )}

                                {/* Nút Lịch hẹn quá hạn */}
                                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                                  <Clock className="w-4 h-4 mr-2" />
                                  Lịch hẹn quá hạn
                                </button>
                              </>
                            ) : (
                              // Nếu lịch hẹn chưa qua
                              <>
                                {appointment.status === "Chờ xử lý" && (
                                  <>
                                    <button
                                      onClick={() => {
                                        handleStatusChange(
                                          appointment,
                                          appointment.bookingId,
                                          "Đã xác nhận"
                                        );
                                      }}
                                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Xác nhận
                                    </button>
                                    <button
                                      onClick={() => {
                                        setSelectedAppointment(appointment);
                                        setResponseText("");
                                        setShowResponseModal(true);
                                      }}
                                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                      <MessageCircle className="w-4 h-4 mr-2" />
                                      Phản hồi
                                    </button>
                                    <button
                                      onClick={() => {
                                        handleStatusChange(
                                          appointment,
                                          appointment.bookingId,
                                          "Đã hủy"
                                        );
                                      }}
                                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                      <XCircle className="w-4 h-4 mr-2" />
                                      Hủy
                                    </button>
                                  </>
                                )}
                                {(appointment.status === "Đã xác nhận" ||
                                  appointment.status === "Đã hủy") && (
                                  <button
                                    onClick={() => {
                                      setSelectedAppointment(appointment);
                                      setResponseText(
                                        appointment.responseText || ""
                                      );
                                      setShowResponseModal(true);
                                    }}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                  >
                                    <Edit3 className="w-4 h-4 mr-2" />
                                    Chỉnh sửa phản hồi
                                  </button>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredAppointments.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    Không có lịch hẹn nào
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Không tìm thấy lịch hẹn phù hợp với bộ lọc hiện tại.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Scheduled Time Management Tab */}
          {activeTab === "schedules" && (
            <div className="space-y-6">
              {/* Form to create a new slot */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Tạo Lịch hẹn
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Date and Time Picker */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thời gian bắt đầu
                    </label>
                    <input
                      type="datetime-local"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>

                  {/* Package Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gói Dịch Vụ
                    </label>
                    <select
                      value={packageName}
                      onChange={(e) => setPackageName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    >
                      <option value="">Chọn gói dịch vụ</option>
                      {packages.map((pkg) => {
                        // Append the appropriate time based on pkg.name
                        let displayName = pkg.name;
                        if (pkg.name === "Free") {
                          displayName = `${pkg.name} - 15 Phút`;
                        } else if (pkg.name === "Plus") {
                          displayName = `${pkg.name} - 60 Phút`;
                        } else if (pkg.name === "Premium") {
                          displayName = `${pkg.name} - 120 Phút`;
                        }

                        return (
                          <option key={pkg.id} value={pkg.name}>
                            {displayName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    onClick={handleCreateSlot}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Tạo Lịch
                  </button>
                </div>
              </div>

              {/* List of created slots */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Danh Sách Lịch Hẹn
                </h3>
                {slots.length === 0 ? (
                  <p className="text-gray-500">
                    Chưa có lịch hẹn nào được tạo.
                  </p>
                ) : (
                  <Spin spinning={loading}>
                    <Table
                      columns={columns}
                      dataSource={filteredSlots}
                      rowKey={(record) => record.slotId || record._id}
                      pagination={{ pageSize: 4 }}
                      className="bg-white shadow rounded"
                      size="middle"
                    />
                  </Spin>
                )}
              </div>
            </div>
          )}
        </div>
        {/* The modal for editing slot */}
        <SlotModal
          open={editModalOpen}
          slot={selectedSlot}
          onClose={handleModalClose}
          onSave={handleModalSave}
        />
        {/* Response Modal */}
        {showResponseModal && selectedAppointment && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Phản hồi lịch hẹn - {selectedAppointment.name}
                  </h3>
                  <button
                    onClick={() => {
                      setShowResponseModal(false);
                      setResponseText("");
                      setSelectedAppointment(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Thông tin tư vấn:
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Thu nhập hàng tháng:</strong>{" "}
                    {nf.format(Number(selectedAppointment.incomeNote)) + " VND"}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Chi tiêu hàng tháng:</strong>{" "}
                    {nf.format(Number(selectedAppointment.expenseNote)) +
                      " VND"}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Mục tiêu:</strong> {selectedAppointment.goalNote}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Gói dịch vụ:</strong>{" "}
                    {selectedAppointment.packageName}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Lịch hẹn:</strong>{" "}
                    {new Date(
                      selectedAppointment.slotScheduledTime
                    ).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                    {" lúc "}
                    {new Date(
                      selectedAppointment.slotScheduledTime
                    ).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Thời gian tư vấn:</strong>{" "}
                    {selectedAppointment.durationMinutes} Phút
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nội dung phản hồi:
                  </label>
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    rows={6}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập nội dung phản hồi cho khách hàng..."
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowResponseModal(false);
                      setResponseText("");
                      setSelectedAppointment(null);
                    }}
                    className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={() =>
                      handleSendResponse(selectedAppointment.bookingId)
                    }
                    disabled={!responseText.trim()}
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Gửi phản hồi
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </StaffLayout>
  );
};

export default ConsultationManagement;
