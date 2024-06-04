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

  const addTask = () => {
    const newTask: Task = {
      id: tasks.length + 1,
      name: taskNameInput,
      description: taskDescriptionInput,
      completed: false,
    };
    setTasks(previousTasks => [...previousTasks, newTask]);
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
    const remainingTasks = tasks.filter(task => task.id !== taskId);
    setTasks(remainingTasks);
  };

  return (
    <div>
      <h2>Task Manager</h2>
      <div>
        <input
          type="text"
          placeholder="Task name"
          value={taskNameInput}
          onChange={e => setTaskNameInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="Task description"
          value={taskDescriptionInput}
          onChange={e => setTaskDescriptionInput(e.target.value)}
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
            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;