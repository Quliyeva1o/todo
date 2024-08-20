import { useState } from "react";
import { addTodo } from "../../../../store/slices/todoSlice";
import { Button, message } from "antd";
import { Todo } from "../../../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import moment from "moment";
import MyModal from "../modal";

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
    dispatch(
      addTodo({ ...values, created_at: moment().format("YYYY-MM-DD HH:mm:ss") })
    )
      .then(() => {
        setIsAddModalVisible(false);
        message.success("Todo added successfully!");
      })
      .catch(() => {
        message.error("Failed to add todo.");
      });
  };

  return (
    <>
      <Button type="primary" onClick={handleAdd}>
        Add Todo
      </Button>
      <MyModal
        modalVisible={isAddModalVisible}
        handleCancel={handleCancel}
        handleFinish={handleAddTodo}
        initialValues={{ title: "" }} 
      />
    </>
  );
};

export default Add;
