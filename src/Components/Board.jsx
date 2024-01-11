import React from 'react';
import { useDrop } from 'react-dnd';
import Task from './Task';

const Board = ({ tasks, status, onTaskDrop, onDeleteTask }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => onTaskDrop(item.id, status),
  });

  return (
    <div
      ref={drop}
      style={{
        flex: '1',
        padding: '16px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        margin: '8px',
        backgroundColor: '#f0f0f0',
      }}
    >
      <h2>{status}</h2>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDeleteTask={onDeleteTask} />
      ))}
    </div>
  );
};

export default Board;
