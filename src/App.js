// App.js
import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Board from './Components/Board';
import Task from './Components/Task';
import MotivationalPopup from './Components/MotivationalPopup'; 
import './App.css'; 

const colorPalette = ['#47B4FF', '#8BFF6A', '#FFD447', '#FF6A6A', '#C54DFF'];

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskColor, setNewTaskColor] = useState(colorPalette[0]);
  const [newTaskDueDate, setNewTaskDueDate] = useState('2024-01-01');
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    // Ocultar el popup después de 5 segundos
    const timeout = setTimeout(() => {
      setShowPopup(false);
    }, 5000);

    // Limpiar el temporizador al desmontar el componente
    return () => clearTimeout(timeout);
  }, []);

  const onTaskDrop = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const createTask = () => {
    if (newTaskTitle.trim() !== '' && newTaskDescription.trim() !== '') {
      const newTask = {
        id: tasks.length + 1,
        title: newTaskTitle,
        description: newTaskDescription,
        status: 'Todo',
        color: newTaskColor,
        dueDate: newTaskDueDate,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setNewTaskDescription('');
      setNewTaskColor(colorPalette[0]);
      setNewTaskDueDate('2024-01-01');
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        {showPopup && <MotivationalPopup onClose={() => setShowPopup(false)} />}

        <h1 className="title">KanBan </h1>
        <h2>看板</h2>
        <p className="description">Ordena de forma armónica tus tareas y realiza todo a tiempo.</p>
        <div className="kanban-container">
          <div className="task-inputs">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Título de la tarea"
              className="task-input"
            />
            <input
              type="text"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              placeholder="Descripción de la tarea"
              className="task-input"
            />
            <div className="color-selector">
              <span className="color-label">Color:</span>
              <div className="color-palette">
                {colorPalette.map((color) => (
                  <div
                    key={color}
                    onClick={() => setNewTaskColor(color)}
                    className="color"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>
            <input
              type="date"
              value={newTaskDueDate}
              onChange={(e) => setNewTaskDueDate(e.target.value)}
              className="task-input"
            />
            <button onClick={createTask} className="create-button">
              Crear tarea
            </button>
          </div>

          <div className="boards-container">
            <Board tasks={tasks.filter((task) => task.status === 'Todo')} status="Todo" onTaskDrop={onTaskDrop} onDeleteTask={deleteTask} />
            <Board tasks={tasks.filter((task) => task.status === 'InProgress')} status="InProgress" onTaskDrop={onTaskDrop} onDeleteTask={deleteTask} />
            <Board tasks={tasks.filter((task) => task.status === 'Done')} status="Done" onTaskDrop={onTaskDrop} onDeleteTask={deleteTask} />
          </div>

          <div className="all-tasks">
            <h2 className="all-tasks-title">Todas las Tareas</h2>
            {tasks.map((task) => (
              <Task key={task.id} task={task} onDelete={deleteTask} />
            ))}
          </div>
          <footer className="footer">
            <p>&copy; 2024 KanBan App by Fernand J. Hanser. Todos los derechos reservados.</p>
          </footer>
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
