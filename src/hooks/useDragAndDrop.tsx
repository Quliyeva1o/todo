import { useState } from 'react';
import { Todo } from '../types';

const useDragAndDrop = (onDrop: (isCompleted: boolean, todo: Todo) => void) => {
  const [draggedTodo, setDraggedTodo] = useState<Todo | null>(null);

  const handleDragStart = (todo: Todo) => setDraggedTodo(todo);
  const handleDropHook = (isCompleted: boolean) => {
    if (draggedTodo) {
      onDrop(isCompleted, draggedTodo);
      setDraggedTodo(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
  return { handleDragStart, handleDropHook, handleDragOver };
};

export default useDragAndDrop;
