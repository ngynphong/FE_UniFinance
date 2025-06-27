import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, MessageCircle, CheckCircle, XCircle, AlertCircle, Filter, Search, Plus, Edit3, Eye, TrendingUp, Users, Bell, Settings, BarChart3, PieChart, Activity, DollarSign, FileText, Star, ArrowUp, ArrowDown, ChevronRight, MapPin, Globe } from 'lucide-react';
import StaffLayout from '../../components/layout/staff/StaffLayout';

const StaffConsultationManager = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    // const [selectedAppointment, setSelectedAppointment] = useState(null);
    // const [filter, setFilter] = useState('all');
    // const [searchTerm, setSearchTerm] = useState('');
    // const [showResponseModal, setShowResponseModal] = useState(false);
    // const [responseText, setResponseText] = useState('');
    // const [currentTime, setCurrentTime] = useState(new Date());

    // // Update time every minute
    // useEffect(() => {
    //     const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    //     return () => clearInterval(timer);
    // }, []);

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
            confirmedTime: '',
            priority: 'high',
            location: 'Hồ Chí Minh',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
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
            confirmedTime: '14:00',
            priority: 'medium',
            location: 'Hà Nội',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
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
            confirmedTime: '',
            priority: 'low',
            location: 'Đà Nẵng',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
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
            confirmedTime: '',
            priority: 'medium',
            location: 'Cần Thơ',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
        }
    ]);

    // Weekly performance data
    const weeklyData = [
        { day: 'T2', appointments: 12, completed: 10 },
        { day: 'T3', appointments: 15, completed: 13 },
        { day: 'T4', appointments: 8, completed: 8 },
        { day: 'T5', appointments: 18, completed: 15 },
        { day: 'T6', appointments: 22, completed: 20 },
        { day: 'T7', appointments: 14, completed: 12 },
        { day: 'CN', appointments: 6, completed: 5 }
    ];

    // Service statistics
    const serviceStats = [
        { name: 'Tư vấn đầu tư', count: 45, percentage: 35, color: 'bg-blue-500' },
        { name: 'Kế hoạch tài chính', count: 32, percentage: 25, color: 'bg-green-500' },
        { name: 'Tư vấn bảo hiểm', count: 28, percentage: 22, color: 'bg-purple-500' },
        { name: 'Vay mua nhà', count: 23, percentage: 18, color: 'bg-orange-500' }
    ];

    // Lọc appointments theo status và search
    // const filteredAppointments = appointments.filter(apt => {
    //     const matchesFilter = filter === 'all' || apt.status === filter;
    //     const matchesSearch = apt.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         apt.phone.includes(searchTerm) ||
    //         apt.service.toLowerCase().includes(searchTerm.toLowerCase());
    //     return matchesFilter && matchesSearch;
    // });

    // Thống kê dashboard
    const stats = {
        total: appointments.length,
        pending: appointments.filter(apt => apt.status === 'pending').length,
        confirmed: appointments.filter(apt => apt.status === 'confirmed').length,
        cancelled: appointments.filter(apt => apt.status === 'cancelled').length
    };

    // const handleStatusChange = (appointmentId, newStatus, response = '') => {
    //     setAppointments(prev => prev.map(apt =>
    //         apt.id === appointmentId
    //             ? { ...apt, status: newStatus, response: response }
    //             : apt
    //     ));
    // };

    // const handleSendResponse = (appointmentId) => {
    //     if (responseText.trim()) {
    //         handleStatusChange(appointmentId, 'confirmed', responseText);
    //         setResponseText('');
    //         setShowResponseModal(false);
    //         setSelectedAppointment(null);
    //     }
    // };

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

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'bg-red-500';
            case 'medium': return 'bg-yellow-500';
            case 'low': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <StaffLayout>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                {/* Modern Header */}

                {/* Enhanced Navigation */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex space-x-1 bg-white/60 backdrop-blur-sm rounded-2xl p-1 shadow-lg mb-8 border border-white/20">
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${activeTab === 'dashboard'
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                                }`}
                        >
                            <BarChart3 className="w-4 h-4" />
                            <span>Tổng quan</span>
                        </button>

                    </div>

                    {/* Enhanced Dashboard Tab */}
                    {activeTab === 'dashboard' && (
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
                                                <ArrowUp className="w-4 h-4 mr-1" />
                                                +12%
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</p>
                                        <p className="text-sm text-gray-600">Tổng lịch hẹn</p>
                                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full w-3/4"></div>
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
                                                <ArrowUp className="w-4 h-4 mr-1" />
                                                +5%
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-gray-900 mb-1">{stats.pending}</p>
                                        <p className="text-sm text-gray-600">Chờ xử lý</p>
                                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full w-1/2"></div>
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
                                                <ArrowUp className="w-4 h-4 mr-1" />
                                                +8%
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-gray-900 mb-1">{stats.confirmed}</p>
                                        <p className="text-sm text-gray-600">Đã xác nhận</p>
                                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full w-1/4"></div>
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
                                                <ArrowDown className="w-4 h-4 mr-1" />
                                                -3%
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-gray-900 mb-1">{stats.cancelled}</p>
                                        <p className="text-sm text-gray-600">Đã hủy</p>
                                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full w-1/4"></div>
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
                                            <h3 className="text-xl font-semibold text-gray-900">Hiệu suất tuần này</h3>
                                            <p className="text-sm text-gray-600">Theo dõi lịch hẹn và hoàn thành</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="flex items-center">
                                                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                                                <span className="text-sm text-gray-600">Lịch hẹn</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                                <span className="text-sm text-gray-600">Hoàn thành</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-end justify-between h-64 space-x-2">
                                        {weeklyData.map((data, index) => (
                                            <div key={data.day} className="flex flex-col items-center flex-1">
                                                <div className="flex flex-col items-center justify-end h-48 space-y-1">
                                                    <div
                                                        className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-500 hover:shadow-lg"
                                                        style={{ height: `${(data.appointments / 25) * 100}%` }}
                                                    ></div>
                                                    <div
                                                        className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-500 hover:shadow-lg"
                                                        style={{ height: `${(data.completed / 25) * 100}%` }}
                                                    ></div>
                                                </div>
                                                <div className="mt-2 text-center">
                                                    <p className="text-xs font-medium text-gray-900">{data.day}</p>
                                                    <p className="text-xs text-gray-500">{data.appointments}/{data.completed}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Service Distribution */}
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">Phân bố dịch vụ</h3>
                                            <p className="text-sm text-gray-600">Tỷ lệ theo loại tư vấn</p>
                                        </div>
                                        <PieChart className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <div className="space-y-4">
                                        {serviceStats.map((service, index) => (
                                            <div key={service.name} className="group">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-900">{service.name}</span>
                                                    <span className="text-sm text-gray-600">{service.count}</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                                    <div
                                                        className={`h-3 rounded-full ${service.color} transition-all duration-700 group-hover:shadow-lg`}
                                                        style={{ width: `${service.percentage}%` }}
                                                    ></div>
                                                </div>
                                                <div className="text-right mt-1">
                                                    <span className="text-xs text-gray-500">{service.percentage}%</span>
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
                                            <h3 className="text-xl font-semibold text-gray-900">Hoạt động gần đây</h3>
                                        </div>
                                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                                            Xem tất cả
                                            <ChevronRight className="w-4 h-4 ml-1" />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {appointments.slice(0, 4).map((appointment) => (
                                            <div key={appointment.id} className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 border border-transparent hover:border-blue-200">
                                                <div className="relative">
                                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                                                        <User className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getPriorityColor(appointment.priority)} rounded-full border-2 border-white`}></div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <p className="text-sm font-semibold text-gray-900 truncate">{appointment.clientName}</p>
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                                                            {getStatusIcon(appointment.status)}
                                                            <span className="ml-1">{getStatusText(appointment.status)}</span>
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-2">{appointment.service}</p>
                                                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                        <div className="flex items-center">
                                                            <Calendar className="w-3 h-3 mr-1" />
                                                            {appointment.preferredDate}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <MapPin className="w-3 h-3 mr-1" />
                                                            {appointment.location}
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        // setSelectedAppointment(appointment);
                                                        setActiveTab('appointments');
                                                    }}
                                                    className="opacity-0 group-hover:opacity-100 p-2 text-blue-600 hover:text-blue-800 transition-opacity duration-200"
                                                >
                                                    <ChevronRight className="w-4 h-4" />
                                                </button>
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