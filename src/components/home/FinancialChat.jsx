import React, { useState, useRef, useEffect } from "react";
import {
    MessageCircle,
    X,
    Send,
    DollarSign,
    Target,
    TrendingUp,
    Calculator,
} from "lucide-react";
import { chatService } from "../../services/chatService";

// Chat Bubble Component
const ChatBubble = ({ onClick, isOpen }) => {
    return (
        <div
            className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isOpen ? "scale-0" : "scale-100"
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
        <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
            <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${isUser
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-gray-100 text-gray-800 rounded-bl-sm border"
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
        monthlyIncome: "",
        monthlyExpenses: "",
        financialGoal: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const submitData = {
            monthlyIncome: parseFloat(formData.monthlyIncome) || 0,
            monthlyExpenses: parseFloat(formData.monthlyExpenses) || 0,
            financialGoal: formData.financialGoal,
            message: formData.message,
        };
        onSubmit(submitData);
    };

    const isFormValid =
        formData.monthlyIncome &&
        formData.monthlyExpenses &&
        formData.financialGoal;

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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                />
            </div>

            <button
                onClick={handleSubmit}
                disabled={!isFormValid || isLoading}
                className={`w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2
    ${!isFormValid || isLoading
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
                    }
  `}
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

// ChatInput Component mới
const ChatInput = ({ onSubmit, isLoading }) => {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (!message.trim()) return;
        onSubmit(message);
        setMessage("");
    };

    return (
        <div className="flex space-x-2">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Nhập câu hỏi..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
            />
            <button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
                <Send className="w-4 h-4" />
            </button>
        </div>
    );
};

// Main Chat Window Component
const ChatWindow = ({ isOpen, onClose }) => {
    const [pendingQuestion, setPendingQuestion] = useState(null);

    const buildHistory = () => {
        return messages
            .filter((m) => m.isUser !== null) // bỏ hệ thống hoặc lỗi
            .map((m) => ({
                role: m.isUser ? "user" : "assistant",
                content: m.text,
            }));
    };
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Xin chào! Tôi là trợ lý tài chính AI của bạn. Hãy chia sẻ thông tin tài chính để tôi có thể đưa ra lời khuyên phù hợp nhất.",
            isUser: false,
        },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [financialInfo, setFinancialInfo] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleFormSubmit = async (formData) => {
        setIsLoading(true);
        setFinancialInfo({
            monthlyIncome: formData.monthlyIncome,
            monthlyExpenses: formData.monthlyExpenses,
            financialGoal: formData.financialGoal,
        });

        const userMessage = {
            id: Date.now(),
            text: `Thu nhập: ${formData.monthlyIncome.toLocaleString(
                "vi-VN"
            )} VNĐ/tháng\nChi tiêu: ${formData.monthlyExpenses.toLocaleString(
                "vi-VN"
            )} VNĐ/tháng\nMục tiêu: ${formData.financialGoal}\nCâu hỏi: ${formData.message
                }`,
            isUser: true,
        };
        setMessages((prev) => [...prev, userMessage]);

        try {
            const data = await chatService.chatAi(
                formData.monthlyIncome,
                formData.monthlyExpenses,
                formData.financialGoal,
                formData.message
            );

            const botReply =
                typeof data === "object" && data.reply ? data.reply : data;
            const botMessage = {
                id: Date.now() + 1,
                text: botReply,
                isUser: false,
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error calling API:", error);
            const errorMessage = {
                id: Date.now() + 1,
                text: "Xin lỗi, đã có lỗi xảy ra khi kết nối với máy chủ.",
                isUser: false,
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const shortYesNo = [
        "có",
        "không",
        "ok",
        "oke",
        "okay",
        "ừ",
        "dạ",
        "uh",
        "ừm",
        "không đâu",
        "không nhé",
    ];
    const handleChatMessageSubmit = async (messageText) => {
        setIsLoading(true);

        let messageToSend = messageText.trim();

        // Nếu là trả lời ngắn (có/không...) và có câu hỏi trước
        if (
            shortYesNo.includes(messageToSend.toLowerCase()) &&
            pendingQuestion &&
            messageToSend.trim().split(/\s+/).length === 1
        ) {
            messageToSend = `Câu hỏi trước: "${pendingQuestion}"\nNgười dùng trả lời: ${messageText}`;
            setPendingQuestion(null);
        }

        const userMessage = {
            id: Date.now(),
            text: messageText,
            isUser: true,
        };
        setMessages((prev) => [...prev, userMessage]);

        try {
            const data = await chatService.chatAi(
                financialInfo.monthlyIncome,
                financialInfo.monthlyExpenses,
                financialInfo.financialGoal,
                messageToSend,
                buildHistory()
            );

            const botReply =
                typeof data === "object" && data.reply ? data.reply : data;
            const botMessage = {
                id: Date.now() + 1,
                text: botReply,
                isUser: false,
            };
            setMessages((prev) => [...prev, botMessage]);

            // Nếu bot trả lời có vẻ là câu hỏi yes/no → lưu lại
            if (/bạn.*(có|muốn|sẵn sàng|đồng ý).*không[?？]?/i.test(botReply)) {
                setPendingQuestion(botReply);
            } else {
                setPendingQuestion(null);
            }
        } catch (error) {
            console.error("Error calling API:", error);
            const errorMessage = {
                id: Date.now() + 1,
                text: "Xin lỗi, đã có lỗi xảy ra khi kết nối với máy chủ.",
                isUser: false,
            };
            setMessages((prev) => [...prev, errorMessage]);
            setPendingQuestion(null);
        } finally {
            setIsLoading(false);
        }
    };

    const resetConversation = () => {
        if (window.confirm("Bạn có chắc muốn xoá toàn bộ cuộc trò chuyện?")) {
            setMessages([
                {
                    id: 1,
                    text: "Xin chào! Tôi là trợ lý tài chính AI của bạn. Hãy chia sẻ thông tin tài chính để tôi có thể đưa ra lời khuyên phù hợp nhất.",
                    isUser: false,
                },
            ]);
            setFinancialInfo(null);
        }
    };

    return (
        <div
            className={`fixed bottom-6 right-6 w-96 h-[600px] flex flex-col bg-white rounded-lg shadow-2xl z-50 transition-all duration-300 ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
        >
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
                    className="hover:bg-white/20 p-1 rounded-full"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {messages.map((message) => (
                    <Message
                        key={message.id}
                        message={message.text}
                        isUser={message.isUser}
                    />
                ))}
                {isLoading && (
                    <div className="flex justify-start mb-4">
                        <div className="bg-gray-100 border rounded-lg px-4 py-2">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div
                                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.1s" }}
                                ></div>
                                <div
                                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.2s" }}
                                ></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t">
                {financialInfo ? (
                    <div className="space-y-3">
                        <ChatInput
                            onSubmit={handleChatMessageSubmit}
                            isLoading={isLoading}
                        />
                        <div className="flex justify-between text-sm">
                            <button
                                onClick={() => setFinancialInfo(null)}
                                className="text-blue-600 underline hover:text-blue-800 transition"
                            >
                                Thay đổi thông tin tài chính
                            </button>
                            <button
                                onClick={resetConversation}
                                className="text-red-600 underline hover:text-red-800 transition"
                            >
                                Xoá cuộc trò chuyện
                            </button>
                        </div>
                    </div>
                ) : (
                    <FinancialForm onSubmit={handleFormSubmit} isLoading={isLoading} />
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
        <div>
            <ChatBubble onClick={openChat} isOpen={isChatOpen} />
            <ChatWindow isOpen={isChatOpen} onClose={closeChat} />
        </div>
    );
};

export default FinancialChatApp;
