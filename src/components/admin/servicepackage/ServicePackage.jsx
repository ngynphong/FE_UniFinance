import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Tag,
  Space,
  Spin,
  Modal,
  message,
  Form,
  Input,
  InputNumber,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import AdminLayout from '../../layout/admin/AdminLayout';
import {
  getAllPackages,
  saveOrUpdatePackage,
  // deletePackage, // nếu có API delete thì bỏ comment
} from '../../../services/packageService';

const ServicePackage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const res = await getAllPackages();
      setPackages(res);
    } catch (err) {
      message.error('Lỗi khi tải danh sách gói dịch vụ');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (pkg = null) => {
    setEditingPackage(pkg);
    form.setFieldsValue(
      pkg || {
        name: '',
        description: '',
        price: 0,
        duration: 1,
        status: 'active',
      }
    );
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      await saveOrUpdatePackage(editingPackage?.id || '', values);
      message.success(editingPackage ? 'Cập nhật thành công' : 'Tạo mới thành công');
      setIsModalOpen(false);
      fetchPackages();
    } catch (err) {
      message.error('Lỗi khi lưu dữ liệu');
    }
  };

  const confirmDelete = (record) => {
    Modal.confirm({
      title: `Bạn có chắc muốn xoá gói "${record.name}"?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Xoá',
      okType: 'danger',
      cancelText: 'Huỷ',
      onOk: async () => {
        try {
          // await deletePackage(record.id); // nếu có API delete
          message.success('Đã xoá thành công (mô phỏng)');
          fetchPackages();
        } catch {
          message.error('Không thể xoá gói dịch vụ');
        }
      },
    });
  };

  const columns = [
    {
      title: 'Tên gói',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (text) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price) => <span>{price.toLocaleString('vi-VN')} ₫</span>,
    },
    {
      title: 'Thời hạn (ngày)',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) =>
        status === 'active' ? <Tag color="green">Kích hoạt</Tag> : <Tag color="red">Ẩn</Tag>,
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <EditOutlined
            className="text-blue-500 cursor-pointer"
            onClick={() => openModal(record)}
          />
          <DeleteOutlined
            className="text-red-500 cursor-pointer"
            onClick={() => confirmDelete(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 p-4 md:p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Quản lý gói dịch vụ</h1>
            <p className="text-sm text-gray-500">
              Tạo/sửa/xoá gói dịch vụ, thay đổi quyền truy cập theo gói.
            </p>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => openModal()}
          >
            Thêm gói mới
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={packages}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showTotal: (total) => `Tổng ${total} gói dịch vụ`,
            }}
          />
        )}

        <Modal
          title={editingPackage ? 'Chỉnh sửa gói' : 'Thêm gói dịch vụ'}
          open={isModalOpen}
          onOk={handleSave}
          onCancel={() => setIsModalOpen(false)}
          okText="Lưu"
          cancelText="Huỷ"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Tên gói"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên gói' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Mô tả" name="description">
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item
              label="Giá (VNĐ)"
              name="price"
              rules={[{ required: true }]}
            >
              <InputNumber min={0} className="w-full" />
            </Form.Item>
            <Form.Item
              label="Thời hạn (ngày)"
              name="duration"
              rules={[{ required: true }]}
            >
              <InputNumber min={1} className="w-full" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default ServicePackage;
