import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, deleteTodo } from "../../store/slices/todoSlice";
import { AppDispatch, RootState } from "../../store/store";
import { Table, Button, Popconfirm, Space } from "antd";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const { todos, loading, error } = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    console.log("Fetching todos");
    dispatch(fetchTodos());
  }, []); 

  const handleEdit = (id: number) => {
    console.log(id);
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
      title: "Todo User Id",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record.id)}>Edit</Button>

          <Popconfirm
            title="Are you sure to delete this todo?"
            onConfirm={() => dispatch(deleteTodo(record.id))}
            okText="Yes"
            cancelText="No">
            <Button type="primary" danger >Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <Table dataSource={todos} columns={columns} rowKey="id" />
    </div>
  );
};

export default Home;
