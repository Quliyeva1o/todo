import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, updateTodo } from "../../store/slices/todoSlice";
import { AppDispatch, RootState } from "../../store/store";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import { Todo } from "../../types";
import styles from "./index.module.scss";
import { Button, Flex } from "antd";
import { Link } from "react-router-dom";
import { PieChart } from "@mui/x-charts/PieChart";

const Board: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const handleDrop = (isCompleted: boolean, todo: Todo) => {
    todo.completed != isCompleted &&
      dispatch(
        updateTodo({
          id: todo.id,
          updatedTodo: { ...todo, completed: isCompleted },
        })
      );
  };

  const { handleDragStart, handleDropHook, handleDragOver } =
    useDragAndDrop(handleDrop);

  const renderTodos = (isCompleted: boolean) => (
    <div
      className={`${styles.column} ${
        isCompleted ? styles.completed : styles.notComp
      }`}
      onDragOver={handleDragOver}
      onDrop={() => handleDropHook(isCompleted)}
    >
      <h2 className={styles.columnTitle}>
        {isCompleted ? "Completed" : "Not completed"}
      </h2>
      {todos
        .filter((todo) => todo.completed === isCompleted)
        .map((todo) => (
          <div
            key={todo.id}
            draggable
            onDragStart={() => handleDragStart(todo)}
            className={styles.todoItem}
          >
            <p> {todo.title}</p>
          </div>
        ))}
    </div>
  );

  return (
    <>
      <div className={styles.board}>
        <Link to={"/"} className={styles.homeBtn}>
          <Button type="primary">home</Button>
        </Link>
        <PieChart
          series={[
            {
              data: [
                {
                  id: 0,
                  value: todos.filter((todo) => todo.completed === true).length,
                  label: "completed",
                  color: "green"
                },
                {
                  id: 1,
                  value: todos.filter((todo) => todo.completed === false)
                    .length,
                  label: "not completed",
                  color:"rgb(249, 51, 51)"
                },
              ],
            },
          ]}
          width={400}
          height={200}
        />
        <Flex justify="space-between">
          {renderTodos(false)}
          {renderTodos(true)}
        </Flex>
      </div>
    </>
  );
};

export default Board;
