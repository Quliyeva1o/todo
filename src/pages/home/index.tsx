import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  deleteTodo,
  updateTodo,
} from "../../store/slices/todoSlice";
import { AppDispatch, RootState } from "../../store/store";
import {
  Table,
  Button,
  Popconfirm,
  Modal,
  Form,
  Input,
  message,
  Spin,
} from "antd";
import { Todo } from "../../types";
import Add from "./components/add";
import { Link } from "react-router-dom";
import { Flex } from "antd";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const { todos, loading, error } = useSelector(
    (state: RootState) => state.todos
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
 
  const handleEdit = (todo: Todo) => {
    setCurrentTodo(todo);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setCurrentTodo(null);
    setIsModalVisible(false);
  };

  const handleUpdate = (values: Todo) => {
    if (currentTodo) {
      dispatch(
        updateTodo({
          id: currentTodo.id,
          updatedTodo: values,
        })
      )
        .then(() => {
          setCurrentTodo(null);
          setIsModalVisible(false);
        })
        .catch(() => {
          message.error("Failed to update todo.");
        });
    }
  };

  const columns = [
    {
      title: "Todo Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Todo Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Todo) => (
        <div>
          <Popconfirm
            title="Are you sure to delete this todo?"
            onConfirm={() => dispatch(deleteTodo(record.id))}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger style={{ marginRight: 8 }}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Todo) => (
        <Button type="primary" onClick={() => handleEdit(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div>
      {loading && <Spin size="large" fullscreen={true} />}
      {error && <p>Error: {error}</p>}
      <Flex gap={20} style={{ padding: "20px" }}>
        <Add />
        <Link to="/board">
          <Button type="primary">board</Button>
        </Link>
      </Flex>
      <Table dataSource={todos} columns={columns} rowKey="id" />

      <Modal
        title="Edit Todo"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {currentTodo && (
          <Form
            initialValues={{ title: currentTodo.title }}
            onFinish={handleUpdate}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input the title!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" >
                Update
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default Home;
