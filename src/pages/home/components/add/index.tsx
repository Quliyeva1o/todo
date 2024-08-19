import { useState } from "react";
import { addTodo } from "../../../../store/slices/todoSlice";
import { Button, Modal, Form, Input, message } from "antd";
import { Todo } from "../../../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { Link } from "react-router-dom";

const Add = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const handleAdd = () => {
    setIsAddModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
  };
  const handleAddTodo = (values: Todo) => {
    dispatch(addTodo({ ...values, created_at: new Date() }))
      .then(() => {
        setIsAddModalVisible(false);
      })
      .catch(() => {
        message.error("Failed to add todo.");
      });
  };

  return (
    <>
      <Button type="primary" onClick={handleAdd} >
        Add Todo
      </Button>
      <Link to="/board">
        <Button type="primary">
          board
        </Button>
      </Link>

      <Modal
        title="Add Todo"
        open={isAddModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleAddTodo}>
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
    </>
  );
};

export default Add;
