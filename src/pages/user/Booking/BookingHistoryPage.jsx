import React, { useState, useEffect } from "react";

import {
  Calendar,
  User,
  Phone,
  Mail,
  Timer,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Search,
} from "lucide-react";
import DashboardLayout from "../../../components/layout/user/DashboardLayout";
import { bookingService } from "../../../services/bookingService";
import { authService } from "../../../services/authService";
import packageService from "../../../services/packageService";
import { useAuth } from "../../../components/auth/useAuthHook";

const ConsultationManagement = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("history");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Thêm userId vào API call
        const bookings = await bookingService.getAllBookings(null, user.userID);

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
  }, [user.userId]); // Thêm user.userId vào dependency array để re-fetch khi user.userId thay đổi

  // Lọc appointments theo status và search
  const filteredAppointments = appointments.filter((apt) => {
    const matchesFilter = filter === "all" || apt.status === filter;
    const matchesSearch =
      (apt.slotScheduledTime &&
        new Date(apt.slotScheduledTime)
          .toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .includes(searchTerm)) ||
      (apt.slotScheduledTime &&
        new Date(apt.slotScheduledTime)
          .toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
          .includes(searchTerm));

    return matchesFilter && matchesSearch;
  });

 
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

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 rounded-2xl">
        {/* Header */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-blue-600" />
                <h1 className="ml-2 text-2xl font-bold text-gray-900">
                  Lịch hẹn của tôi
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-6">
            <button
              onClick={() => setActiveTab("appointments")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "appointments"
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Danh dách lịch hẹn
            </button>
          </div>

          {/* Dashboard Tab */}

          {/* Appointments Management Tab */}
          {activeTab === "history" && (
            <div className="space-y-6">
              {/* Filters and Search */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Tìm kiếm theo ngày (dd/mm/yyyy) hoặc giờ (hh:mm)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-400" />
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
                                Phản hồi của Consultant:
                              </p>
                              <p className="text-sm text-gray-600 bg-blue-50 rounded-lg p-3 border-l-4 border-blue-400">
                                {appointment.responseText}
                              </p>
                            </div>
                          )}
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
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ConsultationManagement;
