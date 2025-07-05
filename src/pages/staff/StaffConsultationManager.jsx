import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MessageCircle,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Search,
  Plus,
  Edit3,
  Eye,
  TrendingUp,
  Users,
  Bell,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  DollarSign,
  FileText,
  Star,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  MapPin,
  Globe,
} from "lucide-react";
import StaffLayout from "../../components/layout/staff/StaffLayout";
import { Link } from "react-router-dom";
import { bookingService } from "../../services/bookingService";
const StaffConsultationManager = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [appointments, setAppointments] = useState([]);
  const [previousStats, setPreviousStats] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchBookings = async () => {
    try {
      const bookings = await bookingService.getAllDetailed(); // API mới gộp hết data
      const formatted = bookings.map(booking => ({
  ...booking,
  name: booking.name,
  phone: booking.phone,
  email: booking.email,
  avatar: booking.avatar,
  slotScheduledTime: booking.slotScheduledTime,
  durationMinutes: booking.slotDurationMinutes,
  packageName: booking.packageName || "Không có gói"
}));;
      setAppointments(formatted);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  fetchBookings();
}, []);

  const packageStats = appointments.reduce((acc, apt) => {
    const rawName = apt.packageName?.toLowerCase().trim();

    let key;
    if (!rawName || rawName === "không có gói") {
      key = "Không có gói";
    } else if (rawName.includes("plus")) {
      key = "Plus";
    } else if (rawName.includes("premium")) {
      key = "Premium";
    } else if (rawName.includes("free")) {
      key = "Free";
    } else {
      key = "Khác";
    }

    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const totalPackages = Object.values(packageStats).reduce(
    (sum, count) => sum + count,
    0
  );

  const packageDistribution = Object.entries(packageStats).map(
    ([name, count]) => {
      const percentage =
        totalPackages > 0 ? Math.round((count / totalPackages) * 100) : 0;
      const colorMap = {
        Free: "bg-blue-500",
        Plus: "bg-green-500",
        Premium: "bg-purple-500",
        Khác: "bg-orange-500",
      };
      return {
        name,
        count,
        percentage,
        color: colorMap[name] || "bg-gray-400",
      };
    }
  );

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await bookingService.getPreviousStats();
        console.log("Dữ liệu thống kê trước:", data);
        setPreviousStats(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const response = await bookingService.getWeeklyPerformance();
        setWeeklyData(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weekly performance data", error);
        setLoading(false);
      }
    };

    fetchWeeklyData();
  }, []);

  if (loading) return <div>Loading...</div>;

  const currentstats = {
    total: appointments.length,
    pending: appointments.filter((apt) => apt.status === "Chờ xử lý").length,
    confirmed: appointments.filter((apt) => apt.status === "Đã xác nhận")
      .length,
    canceled: appointments.filter((apt) => apt.status === "Đã hủy").length,
  };

  // Tính toán phần trăm thay đổi
  const calculatePercentage = (current, previous) => {
    if (previous === 0 || previous === undefined || previous === null) return 0;
    return ((current - previous) / previous) * 100;
  };

  // Tính phần trăm thay đổi
  const totalPercentageChange =
    previousStats && previousStats.totalBookings !== undefined
      ? calculatePercentage(currentstats.total, previousStats.totalBookings)
      : 0;

  const pendingPercentageChange =
    previousStats && previousStats.totalPending !== undefined
      ? calculatePercentage(currentstats.pending, previousStats.totalPending)
      : 0;

  const confirmedPercentageChange =
    previousStats && previousStats.totalConfirmed !== undefined
      ? calculatePercentage(
          currentstats.confirmed,
          previousStats.totalConfirmed
        )
      : 0;

  const canceledPercentageChange =
    previousStats && previousStats.totalCancelled !== undefined
      ? calculatePercentage(currentstats.canceled, previousStats.totalCancelled)
      : 0;

  // Service statistics
  const serviceStats = packageDistribution;

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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Chờ xử lý":
        return "bg-yellow-500";
      case "Đã xác nhận":
        return "bg-green-500";
      case "Đã hủy":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const maxValue = Math.max(
    ...weeklyData.map((d) => Math.max(d.appointments, d.completed)),
    1
  );

  return (
    <StaffLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Modern Header */}

        {/* Enhanced Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex space-x-1 bg-white/60 backdrop-blur-sm rounded-2xl p-1 shadow-lg mb-8 border border-white/20">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                activeTab === "dashboard"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Tổng quan</span>
            </button>
          </div>

          {/* Enhanced Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Stats Cards with Animations */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:shadow-blue-200 transition-shadow duration-300">
                      <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-green-600 text-sm font-medium">
                        {totalPercentageChange >= 0 ? (
                          <ArrowUp className="w-4 h-4 mr-1" />
                        ) : (
                          <ArrowDown className="w-4 h-4 mr-1" />
                        )}
                        {totalPercentageChange >= 0
                          ? `+${totalPercentageChange.toFixed(2)}%`
                          : `-${Math.abs(totalPercentageChange).toFixed(2)}%`}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">
                      {currentstats.total}
                    </p>
                    <p className="text-sm text-gray-600">Tổng lịch hẹn</p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                        style={{ width: `${totalPercentageChange}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-lg group-hover:shadow-yellow-200 transition-shadow duration-300">
                      <AlertCircle className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-orange-600 text-sm font-medium">
                        {pendingPercentageChange >= 0 ? (
                          <ArrowUp className="w-4 h-4 mr-1" />
                        ) : (
                          <ArrowDown className="w-4 h-4 mr-1" />
                        )}
                        {pendingPercentageChange >= 0
                          ? `+${pendingPercentageChange.toFixed(2)}%`
                          : `-${Math.abs(pendingPercentageChange).toFixed(2)}%`}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">
                      {currentstats.pending}
                    </p>
                    <p className="text-sm text-gray-600">Chờ xử lý</p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full"
                        style={{ width: `${pendingPercentageChange}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg group-hover:shadow-green-200 transition-shadow duration-300">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-green-600 text-sm font-medium">
                        {confirmedPercentageChange >= 0 ? (
                          <ArrowUp className="w-4 h-4 mr-1" />
                        ) : (
                          <ArrowDown className="w-4 h-4 mr-1" />
                        )}
                        {confirmedPercentageChange >= 0
                          ? `+${confirmedPercentageChange.toFixed(2)}%`
                          : `-${Math.abs(confirmedPercentageChange).toFixed(
                              2
                            )}%`}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">
                      {currentstats.confirmed}
                    </p>
                    <p className="text-sm text-gray-600">Đã xác nhận</p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                        style={{ width: `${confirmedPercentageChange}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl shadow-lg group-hover:shadow-red-200 transition-shadow duration-300">
                      <XCircle className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-red-600 text-sm font-medium">
                        {canceledPercentageChange >= 0 ? (
                          <ArrowUp className="w-4 h-4 mr-1" />
                        ) : (
                          <ArrowDown className="w-4 h-4 mr-1" />
                        )}
                        {canceledPercentageChange >= 0
                          ? `+${canceledPercentageChange.toFixed(2)}%`
                          : `-${Math.abs(canceledPercentageChange).toFixed(
                              2
                            )}%`}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">
                      {currentstats.canceled}
                    </p>
                    <p className="text-sm text-gray-600">Đã hủy</p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full"
                        style={{ width: `${canceledPercentageChange}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Weekly Performance Chart */}
                <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        Hiệu suất tuần này
                      </h3>
                      <p className="text-sm text-gray-600">
                        Theo dõi lịch hẹn và hoàn thành
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">Lịch hẹn</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">
                          Hoàn thành
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end justify-between h-64 space-x-2">
                    {weeklyData.map((data) => (
                      <div
                        key={data.day}
                        className="flex flex-col items-center flex-1"
                      >
                        <div className="w-full h-48 flex flex-col justify-end relative">
                          <div
                            className="w-full bg-blue-500"
                            style={{
                              height: `${
                                ((data.appointments - data.completed) /
                                  maxValue) *
                                100
                              }%`,
                            }}
                          ></div>
                          <div
                            className="w-full bg-green-500"
                            style={{
                              height: `${(data.completed / maxValue) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <div className="mt-2 text-center">
                          <p className="text-xs font-medium text-gray-900">
                            {data.day}
                          </p>
                          <p className="text-xs text-gray-500">
                            {data.appointments}/{data.completed}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Distribution */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        Phân bố gói dịch vụ
                      </h3>
                      <p className="text-sm text-gray-600">
                        Tỷ lệ theo loại gói người dùng sử dụng
                      </p>
                    </div>
                    <PieChart className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="space-y-4">
                    {serviceStats.map((service) => (
                      <div key={service.name} className="group">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">
                            {service.name}
                          </span>
                          <span className="text-sm text-gray-600">
                            {service.count}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className={`h-3 rounded-full ${service.color} transition-all duration-700 group-hover:shadow-lg`}
                            style={{ width: `${service.percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-right mt-1">
                          <span className="text-xs text-gray-500">
                            {service.percentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
                <div className="px-6 py-4 border-b border-gray-200/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Activity className="w-6 h-6 text-blue-600" />
                      <h3 className="text-xl font-semibold text-gray-900">
                        Hoạt động gần đây
                      </h3>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                      <Link
                        to="/staff/dashboard/consultations?activeTab=appointments"
                        className="flex items-center"
                      >
                        Xem tất cả
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {appointments.slice(0, 4).map((appointment) => (
                      <div
                        key={appointment.bookingId}
                        className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 border border-transparent hover:border-blue-200"
                      >
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div
                            className={`absolute -bottom-1 -right-1 w-4 h-4 ${getPriorityColor(
                              appointment.status
                            )} rounded-full border-2 border-white`}
                          ></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {appointment.name}
                            </p>
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                appointment.status
                              )}`}
                            >
                              {getStatusIcon(appointment.status)}
                              <span className="ml-1">{appointment.status}</span>
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {appointment.issue}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center">
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
                          </div>
                        </div>
                        <Link
                          to={{
                            pathname: "/staff/dashboard/consultations",
                            search: `?activeTab=appointments&selectedAppointment=${encodeURIComponent(
                              JSON.stringify(appointment)
                            )}`,
                          }}
                        >
                          <button className="opacity-0 group-hover:opacity-100 p-2 text-blue-600 hover:text-blue-800 transition-opacity duration-200">
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </StaffLayout>
  );
};

export default StaffConsultationManager;
