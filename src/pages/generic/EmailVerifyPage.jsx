import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/authService';
import { Spin, Result, Button, message as antdMessage } from 'antd';

const EmailVerifyPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [status, setStatus] = useState('loading'); // loading | success | error
    const [message, setMessage] = useState('');
    const [resendLoading, setResendLoading] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const email = params.get('email');
        const token = params.get('token');
        console.log('Email xác thực:', email);
        console.log('Token xác thực:', token);
        if (!email || !token) {
            setStatus('error');
            setMessage('Thiếu thông tin xác thực.');
            return;
        }
        authService.verifyEmail(email, token)
            .then(() => {
                setStatus('success');
                setMessage('Xác thực email thành công! Đang chuyển hướng đến trang đăng nhập...');
                setTimeout(() => navigate('/login'), 3000);
            })
            .catch((err) => {
                setStatus('error');
                setMessage(typeof err === 'string' ? err : 'Xác thực thất bại.');
            });
    }, [location, navigate]);

    const handleResend = async () => {
        const params = new URLSearchParams(location.search);
        const email = params.get('email');
        if (!email) return;
        setResendLoading(true);
        setResendSuccess(false);
        try {
            await authService.resendVerificationEmail(email);
            setResendSuccess(true);
            antdMessage.success('Đã gửi lại email xác thực! Vui lòng kiểm tra hộp thư.');
        } catch (err) {
            antdMessage.error(typeof err === 'string' ? err : 'Gửi lại email thất bại.');
        } finally {
            setResendLoading(false);
        }
    };

    if (status === 'loading') {
        return <div className="flex justify-center items-center min-h-[60vh]"><Spin size="large" tip="Đang xác thực email..." /></div>;
    }

    return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <Result
                status={status === 'success' ? 'success' : 'error'}
                title={status === 'success' ? 'Xác thực thành công!' : 'Xác thực thất bại'}
                subTitle={message}
                extra={status === 'error' && (
                    <div className="flex flex-col gap-2 items-center">
                        <Button type="primary" onClick={() => navigate('/login')}>Về trang đăng nhập</Button>
                        <Button loading={resendLoading} onClick={handleResend} disabled={resendSuccess} type="default">
                            {resendSuccess ? 'Đã gửi lại email xác thực' : 'Gửi lại email xác thực'}
                        </Button>
                    </div>
                )}
            />
        </div>
    );
};

export default EmailVerifyPage; 