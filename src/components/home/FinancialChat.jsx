import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, DollarSign, Target, TrendingUp, Calculator } from 'lucide-react';
import { chatService } from '../../services/chatService';

// Chat Bubble Component
const ChatBubble = ({ onClick, isOpen }) => {
    return (
        <div
            className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isOpen ? 'scale-0' : 'scale-100'
                }`}
        >
            <button
                onClick={onClick}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
                <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    !
                </div>
            </button>
        </div>
    );
};

// Message Component
const Message = ({ message, isUser }) => {
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
            <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${isUser
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-800 rounded-bl-sm border'
                    }`}
            >
                <p className="text-sm whitespace-pre-wrap">{message}</p>
            </div>
        </div>
    );
};

// Financial Form Component
const FinancialForm = ({ onSubmit, isLoading }) => {
    const [formData, setFormData] = useState({
        monthlyIncome: '',
        monthlyExpenses: '',
        financialGoal: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        const submitData = {
            monthlyIncome: parseFloat(formData.monthlyIncome) || 0,
            monthlyExpenses: parseFloat(formData.monthlyExpenses) || 0,
            financialGoal: formData.financialGoal,
            message: formData.message
        };
        onSubmit(submitData);
    };

    const isFormValid = formData.monthlyIncome && formData.monthlyExpenses && formData.financialGoal && formData.message;

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <DollarSign className="w-4 h-4 inline mr-1" />
                        Thu nhập hàng tháng
                    </label>
                    <input
                        type="number"
                        name="monthlyIncome"
                        value={formData.monthlyIncome}
                        onChange={handleChange}
                        placeholder="VD: 15000000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <TrendingUp className="w-4 h-4 inline mr-1" />
                        Chi tiêu hàng tháng
                    </label>
                    <input
                        type="number"
                        name="monthlyExpenses"
                        value={formData.monthlyExpenses}
                        onChange={handleChange}
                        placeholder="VD: 10000000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Target className="w-4 h-4 inline mr-1" />
                    Mục tiêu tài chính
                </label>
                <select
                    name="financialGoal"
                    value={formData.financialGoal}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="">Chọn mục tiêu của bạn</option>
                    <option value="saving">Tiết kiệm</option>
                    <option value="investment">Đầu tư</option>
                    <option value="debt_payment">Trả nợ</option>
                    <option value="emergency_fund">Quỹ khẩn cấp</option>
                    <option value="retirement">Nghỉ hưu</option>
                    <option value="house_purchase">Mua nhà</option>
                    <option value="education">Giáo dục</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageCircle className="w-4 h-4 inline mr-1" />
                    Câu hỏi cụ thể
                </label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hãy mô tả tình hình tài chính và câu hỏi cụ thể của bạn..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
            </div>

            <button
                onClick={handleSubmit}
                disabled={!isFormValid || isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
            >
                {isLoading ? (
                    <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        <span>Đang phân tích...</span>
                    </>
                ) : (
                    <>
                        <Calculator className="w-4 h-4" />
                        <span>Nhận tư vấn tài chính</span>
                    </>
                )}
            </button>
        </div>
    );
};

// Main Chat Window Component
const ChatWindow = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Xin chào! Tôi là trợ lý tài chính AI của bạn. Hãy chia sẻ thông tin tài chính để tôi có thể đưa ra lời khuyên phù hợp nhất.",
            isUser: false
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleFormSubmit = async (formData) => {
        setIsLoading(true);
        setShowForm(false);

        // Add user message
        const userMessage = {
            id: Date.now(),
            text: `Thu nhập: ${formData.monthlyIncome.toLocaleString('vi-VN')} VNĐ/tháng
Chi tiêu: ${formData.monthlyExpenses.toLocaleString('vi-VN')} VNĐ/tháng
Mục tiêu: ${formData.financialGoal}
Câu hỏi: ${formData.message}`,
            isUser: true
        };

        setMessages(prev => [...prev, userMessage]);

        try {
            // Gọi API, nhận về data (không phải response)
            const data = await chatService.chatAi(
                formData.monthlyIncome,
                formData.monthlyExpenses,
                formData.financialGoal,
                formData.message
            );

            let botReply = "Cảm ơn bạn đã chia sẻ thông tin. Đã có lỗi xảy ra khi xử lý phản hồi.";

            if (typeof data === 'object' && data.reply) {
                botReply = data.reply;
            } else if (typeof data === 'string') {
                botReply = data;
            }

            const botMessage = {
                id: Date.now() + 1,
                text: botReply,
                isUser: false
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error calling API:', error);
            const errorMessage = {
                id: Date.now() + 1,
                text: "Xin lỗi, đã có lỗi xảy ra khi kết nối với máy chủ. Vui lòng kiểm tra kết nối mạng và thử lại sau.",
                isUser: false
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNewConsultation = () => {
        setShowForm(true);
        setMessages([
            {
                id: 1,
                text: "Hãy chia sẻ thông tin tài chính mới để tôi có thể đưa ra lời khuyên cập nhật.",
                isUser: false
            }
        ]);
    };

    return (
        <div
            className={`fixed bottom-6 right-6 w-96 h-max bg-white rounded-lg shadow-2xl z-50 transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
        >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="bg-white/20 p-2 rounded-full">
                        <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Tư vấn tài chính AI</h3>
                        <p className="text-xs opacity-90">Trực tuyến</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="hover:bg-white/20 p-1 rounded-full transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 bg-gray-50">
                {messages.map((message) => (
                    <Message key={message.id} message={message.text} isUser={message.isUser} />
                ))}
                {isLoading && (
                    <div className="flex justify-start mb-4">
                        <div className="bg-gray-100 border rounded-lg rounded-bl-sm px-4 py-2">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Form or New Consultation Button */}
            <div className="p-4 border-t">
                {showForm ? (
                    <FinancialForm onSubmit={handleFormSubmit} isLoading={isLoading} />
                ) : (
                    <button
                        onClick={handleNewConsultation}
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                        <MessageCircle className="w-4 h-4" />
                        <span>Tư vấn mới</span>
                    </button>
                )}
            </div>
        </div>
    );
};

// Main App Component
const FinancialChatApp = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const openChat = () => setIsChatOpen(true);
    const closeChat = () => setIsChatOpen(false);

    return (
        <div className="">
            {/* Chat Components */}
            <ChatBubble onClick={openChat} isOpen={isChatOpen} />
            <ChatWindow isOpen={isChatOpen} onClose={closeChat} />
        </div>
    );
};

export default FinancialChatApp;