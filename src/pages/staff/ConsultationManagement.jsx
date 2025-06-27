import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, MessageCircle, CheckCircle, XCircle, AlertCircle, Filter, Search, Plus, Edit3, Eye } from 'lucide-react';
import StaffLayout from '../../components/layout/staff/StaffLayout';

const ConsultationManagement = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseText, setResponseText] = useState('');

  // Dữ liệu mẫu cho lịch tư vấn
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      clientName: 'Nguyễn Văn An',
      phone: '0901234567',
      email: 'nguyenvanan@email.com',
      service: 'Tư vấn đầu tư',
      preferredDate: '2025-07-01',
      preferredTime: '09:00',
      status: 'pending',
      message: 'Tôi muốn tư vấn về đầu tư chứng khoán cho người mới bắt đầu. Hiện tại tôi có 100 triệu VND muốn đầu tư.',
      submittedAt: '2025-06-26 14:30',
      response: '',
      confirmedDate: '',
      confirmedTime: ''
    },
    {
      id: 2,
      clientName: 'Trần Thị Mai',
      phone: '0909876543',
      email: 'tranthimai@email.com',
      service: 'Lập kế hoạch tài chính',
      preferredDate: '2025-06-30',
      preferredTime: '14:00',
      status: 'confirmed',
      message: 'Tôi cần lập kế hoạch tài chính cho gia đình, có 2 con nhỏ và muốn tiết kiệm cho việc học của các con.',
      submittedAt: '2025-06-25 10:15',
      response: 'Chào chị Mai, chúng tôi đã xác nhận lịch tư vấn vào 14:00 ngày 30/06/2025. Vui lòng chuẩn bị các thông tin về thu nhập và chi tiêu hiện tại.',
      confirmedDate: '2025-06-30',
      confirmedTime: '14:00'
    },
    {
      id: 3,
      clientName: 'Lê Minh Tuấn',
      phone: '0912345678',
      email: 'leminhtan@email.com',
      service: 'Tư vấn bảo hiểm',
      preferredDate: '2025-07-02',
      preferredTime: '10:30',
      status: 'pending',
      message: 'Tôi muốn tìm hiểu về các loại bảo hiểm phù hợp cho doanh nghiệp nhỏ của mình.',
      submittedAt: '2025-06-26 16:45',
      response: '',
      confirmedDate: '',
      confirmedTime: ''
    },
    {
      id: 4,
      clientName: 'Phạm Thị Lan',
      phone: '0933456789',
      email: 'phamthilan@email.com',
      service: 'Tư vấn vay mua nhà',
      preferredDate: '2025-06-29',
      preferredTime: '15:30',
      status: 'cancelled',
      message: 'Tôi muốn tư vấn về các gói vay mua nhà ưu đãi hiện tại.',
      submittedAt: '2025-06-24 09:20',
      response: 'Rất tiếc, chúng tôi cần hoãn lịch hẹn do chuyên gia có việc đột xuất. Chúng tôi sẽ sắp xếp lại thời gian khác.',
      confirmedDate: '',
      confirmedTime: ''
    }
  ]);

  // Lọc appointments theo status và search
  const filteredAppointments = appointments.filter(apt => {
    const matchesFilter = filter === 'all' || apt.status === filter;
    const matchesSearch = apt.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.phone.includes(searchTerm) ||
      apt.service.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Thống kê dashboard
  const stats = {
    total: appointments.length,
    pending: appointments.filter(apt => apt.status === 'pending').length,
    confirmed: appointments.filter(apt => apt.status === 'confirmed').length,
    cancelled: appointments.filter(apt => apt.status === 'cancelled').length
  };

  const handleStatusChange = (appointmentId, newStatus, response = '') => {
    setAppointments(prev => prev.map(apt =>
      apt.id === appointmentId
        ? { ...apt, status: newStatus, response: response }
        : apt
    ));
  };

  const handleSendResponse = (appointmentId) => {
    if (responseText.trim()) {
      handleStatusChange(appointmentId, 'confirmed', responseText);
      setResponseText('');
      setShowResponseModal(false);
      setSelectedAppointment(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Chờ xử lý';
      case 'confirmed': return 'Đã xác nhận';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

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
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'dashboard'
                ? 'bg-blue-600 text-white'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              Tổng quan
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'appointments'
                ? 'bg-blue-600 text-white'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              Quản lý Lịch hẹn
            </button>
          </div>

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Tổng lịch hẹn</p>
                      <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <AlertCircle className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Chờ xử lý</p>
                      <p className="text-2xl font-semibold text-gray-900">{stats.pending}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Đã xác nhận</p>
                      <p className="text-2xl font-semibold text-gray-900">{stats.confirmed}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <XCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Đã hủy</p>
                      <p className="text-2xl font-semibold text-gray-900">{stats.cancelled}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Appointments */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Lịch hẹn gần đây</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Khách hàng
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Dịch vụ
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
                      {appointments.slice(0, 5).map((appointment) => (
                        <tr key={appointment.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-blue-600" />
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">
                                  {appointment.clientName}
                                </div>
                                <div className="text-sm text-gray-500">{appointment.phone}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {appointment.service}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {appointment.submittedAt}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                              {getStatusIcon(appointment.status)}
                              <span className="ml-1">{getStatusText(appointment.status)}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button
                              onClick={() => {
                                setSelectedAppointment(appointment);
                                setActiveTab('appointments');
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
          {activeTab === 'appointments' && (
            <div className="space-y-6">
              {/* Filters and Search */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Tìm kiếm theo tên, số điện thoại, dịch vụ..."
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
                      <option value="pending">Chờ xử lý</option>
                      <option value="confirmed">Đã xác nhận</option>
                      <option value="cancelled">Đã hủy</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Appointments List */}
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <div key={appointment.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="text-lg font-medium text-gray-900">{appointment.clientName}</h3>
                                <p className="text-sm text-gray-500">ID: #{appointment.id}</p>
                              </div>
                            </div>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(appointment.status)}`}>
                              {getStatusIcon(appointment.status)}
                              <span className="ml-1">{getStatusText(appointment.status)}</span>
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="w-4 h-4 mr-2" />
                              {appointment.phone}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Mail className="w-4 h-4 mr-2" />
                              {appointment.email}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="w-4 h-4 mr-2" />
                              {appointment.preferredDate} lúc {appointment.preferredTime}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <MessageCircle className="w-4 h-4 mr-2" />
                              {appointment.service}
                            </div>
                          </div>

                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Nội dung yêu cầu:</p>
                            <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                              {appointment.message}
                            </p>
                          </div>

                          {appointment.response && (
                            <div className="mb-4">
                              <p className="text-sm font-medium text-gray-700 mb-2">Phản hồi của bạn:</p>
                              <p className="text-sm text-gray-600 bg-blue-50 rounded-lg p-3 border-l-4 border-blue-400">
                                {appointment.response}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="mt-4 lg:mt-0 lg:ml-6 lg:flex-shrink-0">
                          <div className="flex flex-col space-y-2">
                            {appointment.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => {
                                    setSelectedAppointment(appointment);
                                    setShowResponseModal(true);
                                  }}
                                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Xác nhận
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedAppointment(appointment);
                                    setResponseText('');
                                    setShowResponseModal(true);
                                  }}
                                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                  <MessageCircle className="w-4 h-4 mr-2" />
                                  Phản hồi
                                </button>
                                <button
                                  onClick={() => handleStatusChange(appointment.id, 'cancelled', 'Lịch hẹn đã được hủy theo yêu cầu.')}
                                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Hủy
                                </button>
                              </>
                            )}
                            {appointment.status === 'confirmed' && (
                              <button
                                onClick={() => {
                                  setSelectedAppointment(appointment);
                                  setResponseText(appointment.response);
                                  setShowResponseModal(true);
                                }}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                <Edit3 className="w-4 h-4 mr-2" />
                                Chỉnh sửa phản hồi
                              </button>
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
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Không có lịch hẹn nào</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Không tìm thấy lịch hẹn phù hợp với bộ lọc hiện tại.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Response Modal */}
        {showResponseModal && selectedAppointment && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Phản hồi lịch hẹn - {selectedAppointment.clientName}
                  </h3>
                  <button
                    onClick={() => {
                      setShowResponseModal(false);
                      setResponseText('');
                      setSelectedAppointment(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">Thông tin yêu cầu:</p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Dịch vụ:</strong> {selectedAppointment.service}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Thời gian mong muốn:</strong> {selectedAppointment.preferredDate} lúc {selectedAppointment.preferredTime}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Nội dung:</strong> {selectedAppointment.message}
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
                      setResponseText('');
                      setSelectedAppointment(null);
                    }}
                    className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={() => handleSendResponse(selectedAppointment.id)}
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
