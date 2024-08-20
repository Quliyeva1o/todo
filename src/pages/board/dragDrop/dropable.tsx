import {  useDroppable } from "@dnd-kit/core";

export const Droppable: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => {
    const { setNodeRef } = useDroppable({ id });
    return (
      <div ref={setNodeRef} style={{ flex: 1 }}>
        {children}
      </div>
    );
  };

