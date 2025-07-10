import { Modal, Form, Input, Select } from "antd";
import React, { useEffect } from "react";

function SlotModal({ open, slot, onClose, onSave }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (slot) {
      form.setFieldsValue({
        startTime: slot.scheduledTime || "",
        durationMinutes: slot.durationMinutes || 15,
      });
    } else {
      form.resetFields(); 
    }
  }, [slot, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const updatedSlot = {
          ...slot,
          startTime: values.startTime,
          durationMinutes: values.durationMinutes,
        };
        onSave(updatedSlot);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      open={open}
      title={slot ? "Sửa lịch hẹn" : "Tạo lịch hẹn"}
      onCancel={onClose}
      onOk={handleOk}
      okText="Lưu"
      cancelText="Hủy"
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        {/* Time picker */}
        <Form.Item
          label="Thời gian bắt đầu"
          name="startTime"
          rules={[{ required: true, message: "Chọn thời gian bắt đầu" }]}
        >
          <Input
            type="datetime-local"
            placeholder="Chọn thời gian bắt đầu"
          />
        </Form.Item>

        {/* Duration select */}
        <Form.Item
          label="Thời lượng"
          name="durationMinutes"
          rules={[{ required: true, message: "Chọn thời lượng" }]}
        >
          <Select placeholder="Chọn thời lượng">
            <Select.Option value={15}>15 Phút</Select.Option>
            <Select.Option value={60}>60 Phút</Select.Option>
            <Select.Option value={120}>120 Phút</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default SlotModal;
