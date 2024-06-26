import React, { useState } from 'react';

type Task = {
  id: number;
  name: string;
  description: string;
  completed: boolean;
};

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskNameInput, setTaskNameInput] = useState('');
  const [taskDescriptionInput, setTaskDescriptionInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const generateId = (): number => {
    return tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
  };

  const validateTaskInput = (): boolean => {
    const cleanTaskName = taskNameInput.trim();
    const cleanTaskDescription = taskDescriptionInput.trim();
    if (!cleanTaskName && !cleanTaskDescription) {
      setErrorMessage('Both task name and description are required.');
      return false;
    }
    if (!cleanTaskName) {
      setErrorMessage('Task name is required.');
      return false;
    }
    if (!cleanTaskDescription) {
      setErrorMessage('Task description is required.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const addTask = () => {
    const isValidInput = validateTaskInput();
    if (!isValidInput) return;

    const newTask: Task = {
      id: generateId(),
      name: taskNameInput.trim(),
      description: taskDescriptionInput.trim(),
      completed: false,
    };
    setTasks((previousTasks) => [...previousH5asks, newTask]);
    setTaskNameInput('');
    setTaskDescriptionInput('');
  };

  const toggleTaskCompletionStatus = (taskId: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task,
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId: number) => {
    const remainingTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(remainingTasks);
  };

  return (
    <div>
      <h2>Task Manager</h2>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <div>
        <input
          type="text"
          placeholder="Task name"
          value={taskNameInput}
          onChange={(e) => setTaskNameInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nask description"
          value={taskDescriptionInput}
          onChange={(e) => setTaskDescriptionInput(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            <button onClick={() => toggleTaskCompletionStatus(task.id)}>
              {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;