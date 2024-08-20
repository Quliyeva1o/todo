import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, updateTodo } from "../../store/slices/todoSlice";
import { AppDispatch, RootState } from "../../store/store";
import styles from "./index.module.scss";
import { Button, Flex } from "antd";
import { Link } from "react-router-dom";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { PieChart } from '@mui/x-charts';
import { Droppable } from "./dragDrop/dropable";
import { Draggable } from "./dragDrop/draggable";

const Board: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      const isCompleted = over.id === 'completed';
      const draggedTodo = todos.find(todo => todo.id === active.id);
      if (draggedTodo && draggedTodo.completed !== isCompleted) {
        dispatch(updateTodo({
          id: draggedTodo.id,
          updatedTodo: { ...draggedTodo, completed: isCompleted },
        }));
      }
    }
  };

  const completedTodos = todos.filter(todo => todo.completed);
  const notCompletedTodos = todos.filter(todo => !todo.completed);

  return (
    <div className={styles.board}>
      <Link to="/" className={styles.homeBtn}>
        <Button type="primary">Home</Button>
      </Link>
      <PieChart
        series={[
          {
            data: [
              {
                id: 0,
                value: completedTodos.length,
                label: "Completed",
                color: "green"
              },
              {
                id: 1,
                value: notCompletedTodos.length,
                label: "Not Completed",
                color: "rgb(249, 51, 51)"
              },
            ],
          },
        ]}
        width={400}
        height={150}
      />
      <DndContext onDragEnd={handleDragEnd}>
        <Flex justify="space-between" gap={15}>
          <Droppable id="completed">
            <div className={`${styles.column} ${styles.completed}`}>
              <h2 className={styles.columnTitle}>Completed</h2>
              {completedTodos.map(todo => (
                <Draggable key={todo.id.toString()} id={todo.id.toString()}>
                  <div className={styles.todoItem}>
                    <p>{todo.title}</p>
                  </div>
                </Draggable>
              ))}
            </div>
          </Droppable>
          <Droppable id="notCompleted">
            <div className={`${styles.column} ${styles.notComp}`}>
              <h2 className={styles.columnTitle}>Not Completed</h2>
              {notCompletedTodos.map(todo => (
                <Draggable key={todo.id.toString()} id={todo.id.toString()}>
                  <div className={styles.todoItem}>
                    <p>{todo.title}</p>
                  </div>
                </Draggable>
              ))}
            </div>
          </Droppable>
        </Flex>
      </DndContext>
    </div>
  );
};


export default Board;
