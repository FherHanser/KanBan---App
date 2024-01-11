// Task.js

import React from 'react';
import { useDrag } from 'react-dnd';


const Task = ({ task, onDeleteTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
        border: '1px solid #ddd',
        padding: '8px',
        marginBottom: '8px',
        backgroundColor: task.color,
        position: 'relative',
      }}
    >
      <button
        onClick={() => onDeleteTask && onDeleteTask(task.id)} // Verifica si onDeleteTask está definido antes de llamarlo
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          background: 'none',
          border: 'none',
          color: 'red',
          cursor: 'pointer',
        }}
      >
        X
      </button>
      <h3 style={{ margin: '0', marginBottom: '8px', color: 'white' }}>{task.title}</h3>
      <p style={{ margin: '0', color: 'white' }}>{task.description}</p>
      <p style={{ margin: '0', color: 'white' }}>Fecha: {formatDate(task.dueDate)}</p>
      <p style={{ margin: '0', color: 'white' }}>Estado: {task.status}</p>
    </div>
  );
};

const formatDate = (date) => {
  const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
  return new Date(date).toLocaleDateString('es-ES', options);
};

export default Task;