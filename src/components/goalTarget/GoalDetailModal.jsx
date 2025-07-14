import React, { useEffect, useState } from 'react';
import { Modal, Descriptions, Progress, Table, Tag, Spin, Alert } from 'antd';
import { goalService } from '../../services/goalService';

const GoalDetailModal = ({ goalId, visible, onClose }) => {
    const [goalDetails, setGoalDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (visible && goalId) {
            const fetchGoalDetails = async () => {
                setLoading(true);
                setError(null);
                try {
                    const data = await goalService.getGoalById(goalId);
                    setGoalDetails(data);
                } catch (err) {
                    setError('Không thể tải chi tiết mục tiêu. Vui lòng thử lại.');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchGoalDetails();
        }
    }, [goalId, visible]);

    const columns = [
        {
            title: 'Ngày',
            dataIndex: 'dateCreate',
            key: 'dateCreate',
            render: (text) => new Date(text).toLocaleDateString('vi-VN'),
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Số tiền',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => `${amount.toLocaleString()} đ`,
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
            render: (type) => (
                <Tag color={type === 'income' ? 'green' : 'red'}>
                    {type === 'income' ? 'Thu nhập' : 'Chi tiêu'}
                </Tag>
            ),
        },
    ];

    const renderContent = () => {
        if (loading) {
            return <Spin tip="Đang tải..." />;
        }
        if (error) {
            return <Alert message={error} type="error" />;
        }
        if (!goalDetails) {
            return null;
        }

        const [current, total] = goalDetails.progress.split(' ')[0].split('/');
        const percent = (parseFloat(current) / parseFloat(total)) * 100;

        return (
            <div>
                <Descriptions title="Chi tiết mục tiêu" bordered column={1}>
                    <Descriptions.Item label="Tên mục tiêu">{goalDetails.goal}</Descriptions.Item>
                    <Descriptions.Item label="Số tiền mục tiêu">{Number(goalDetails.amount).toLocaleString()} đ</Descriptions.Item>
                    <Descriptions.Item label="Đã đạt được">{Number(goalDetails.currentSpending).toLocaleString()} đ</Descriptions.Item>
                    <Descriptions.Item label="Ngày hết hạn">{new Date(goalDetails.targetDate).toLocaleDateString('vi-VN')}</Descriptions.Item>
                    <Descriptions.Item label="Tiến độ">
                        <Progress percent={parseFloat(percent.toFixed(2))} status="active" />
                    </Descriptions.Item>
                </Descriptions>

                <h3 className="text-lg font-semibold mt-6 mb-4">Lịch sử giao dịch</h3>
                <Table
                    columns={columns}
                    dataSource={goalDetails.goalTransactions}
                    rowKey="transactionId"
                    pagination={false}
                />
            </div>
        );
    };

    return (
        <Modal
            title={goalDetails ? `Mục tiêu: ${goalDetails.goal}` : 'Chi tiết mục tiêu'}
            visible={visible}
            onCancel={onClose}
            footer={null}
            width={800}
        >
            {renderContent()}
        </Modal>
    );
};

export default GoalDetailModal;
