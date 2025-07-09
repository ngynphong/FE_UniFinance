import React, { useEffect, useState } from 'react';
import { Card, Timeline, Progress, Table, message, Spin, Modal, Input, InputNumber } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import debtService from '../../services/debtService';
import DashboardLayout from '../layout/user/DashboardLayout';

const RepaymentProgress = () => {

    const [debts, setDebts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDebt, setSelectedDebt] = useState(null);
    const [contributionModalOpen, setContributionModalOpen] = useState(false);
    const [contribution, setContribution] = useState({ name: '', description: '', amount: 0 });
    const [contributing, setContributing] = useState(false);

    useEffect(() => {
        fetchDebts();
    }, []);

    const fetchDebts = async () => {
        try {
            setLoading(true);
            const response = await debtService.getAllDebts();
            setDebts(response);
        } catch (error) {
            message.error('Chưa có nợ');
            console.error('Lỗi:', error);
        } finally {
            setLoading(false);
        }
    };

    const timelineItems = debts.map((debt) => ({
        dot: debt.isPaid
            ? <CheckCircleOutlined className="text-green-500" />
            : <ClockCircleOutlined className="text-orange-500" />,
        color: debt.isPaid ? 'green' : 'blue',
        children: (
            <div>
                <p className="font-semibold">{debt.debtName}</p>
                <p>Số tiền: {debt.currentAmount?.toLocaleString('vi-VN')} VNĐ</p>
                <p>Đã trả: {debt.paidAmount?.toLocaleString('vi-VN')} VNĐ</p>
                <p>Hạn trả: {new Date(debt.dueDate).toLocaleDateString()}</p>
            </div>
        )
    }));

    const columns = [
        {
            title: 'Ngày thanh toán',
            dataIndex: 'paymentDate',
            key: 'paymentDate',
        },
        {
            title: 'Số tiền hiện tại',
            dataIndex: 'currentAmount',
            key: 'currentAmount',
            render: (currentAmount) => `${currentAmount?.toLocaleString('vi-VN')} VNĐ`,
        },
        {
            title: 'Đã trả',
            dataIndex: 'paidAmount',
            key: 'paidAmount',
            render: (paidAmount) => `${paidAmount?.toLocaleString('vi-VN')} VNĐ`,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isPaid',
            key: 'isPaid',
            render: (isPaid) => (
                <span className={isPaid ? 'text-green-500' : 'text-orange-500'}>
                    {isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                </span>
            ),
        },
    ];

    const openContributionModal = (debt) => {
        setSelectedDebt(debt);
        setContribution({ name: '', description: '', amount: 0 });
        setContributionModalOpen(true);
    };

    const handleContribution = async () => {
        if (!selectedDebt) return;
        setContributing(true);
        try {
            await debtService.addDebtContribution(selectedDebt.debtId, contribution);
            message.success('Đóng góp trả nợ thành công!');
            setContributionModalOpen(false);
            fetchDebts();
        } catch {
            message.error('Lỗi khi đóng góp trả nợ');
        } finally {
            setContributing(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <DashboardLayout>
            <h2 className="text-2xl font-bold mb-6">Tiến trình trả nợ</h2>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <Card>
                    <h3 className="text-lg font-semibold mb-4">Dòng thời gian thanh toán</h3>
                    <Timeline
                        items={timelineItems}
                    />
                </Card>

                <Card>
                    <h3 className="text-lg font-semibold mb-4">Lịch sử thanh toán</h3>
                    <Table
                        dataSource={debts.map((debt, index) => ({
                            key: debt.debtId || index,
                            paymentDate: new Date(debt.dueDate).toLocaleDateString(),
                            currentAmount: debt.currentAmount,
                            paidAmount: debt.paidAmount,
                            isPaid: debt.isPaid,
                            debtObj: debt
                        }))}
                        columns={[
                            ...columns,
                            {
                                title: 'Hành động',
                                key: 'action',
                                render: (_, record) => (
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                                        onClick={() => openContributionModal(record.debtObj)}
                                        disabled={record.isPaid}
                                    >
                                        Đóng góp trả nợ
                                    </button>
                                )
                            }
                        ]}
                        pagination={false}
                        scroll={{ y: 400 }}
                    />
                </Card>
            </div>

            <Modal
                open={contributionModalOpen}
                onCancel={() => setContributionModalOpen(false)}
                title={`Đóng góp trả nợ: ${selectedDebt?.debtName || ''}`}
                onOk={handleContribution}
                okText="Xác nhận đóng góp"
                confirmLoading={contributing}
            >
                <div className="space-y-3">
                    <Input
                        placeholder="Tên đóng góp"
                        value={contribution.name}
                        onChange={e => setContribution({ ...contribution, name: e.target.value })}
                    />
                    <Input.TextArea
                        placeholder="Mô tả (tuỳ chọn)"
                        value={contribution.description}
                        onChange={e => setContribution({ ...contribution, description: e.target.value })}
                    />
                    <InputNumber
                        className="w-full"
                        min={1}
                        placeholder="Số tiền đóng góp"
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        value={contribution.amount}
                        onChange={val => setContribution({ ...contribution, amount: val })}
                    />
                </div>
            </Modal>
        </DashboardLayout>
    );
};

export default RepaymentProgress;
