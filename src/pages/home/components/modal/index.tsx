import { Button, Modal, Form, Input } from "antd";

interface MyModalProps {
  modalVisible: boolean;
  handleCancel: () => void;
  handleFinish: (values: any) => void;
  initialValues?: { title?: string };
}

const MyModal: React.FC<MyModalProps> = ({ modalVisible, handleCancel, handleFinish, initialValues }) => {
  return (
    <Modal
      title="Add Todo"
      open={modalVisible}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose
    >
      <Form onFinish={handleFinish} initialValues={initialValues}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MyModal;
