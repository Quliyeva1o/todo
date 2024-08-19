import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, updateTodo } from "../../store/slices/todoSlice";
import { AppDispatch, RootState } from "../../store/store";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import { Todo } from "../../types";
import styles from "./index.module.scss";
import { Flex } from "antd";

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
      className={styles.column}
      onDragOver={handleDragOver}
      onDrop={() => handleDropHook(isCompleted)}
    >
      <h2 className={styles.columnTitle}>
        {isCompleted ? "completed" : "not completed"}
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
            {todo.title}
          </div>
        ))}
    </div>
  );

  return (
    <Flex justify="space-between">
      {renderTodos(false)}
      {renderTodos(true)}
    </Flex>
  );
};

export default Board;
