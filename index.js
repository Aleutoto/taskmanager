const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
let taskList = [];

app.post('/tasks', (req, res) => {
    const newTask = {
        id: taskList.length + 1,
        description: req.body.description,
        isCompleted: false
    };
    taskList.push(newTask);
    res.status(201).send(newTask);
});

app.get('/tasks', (req, res) => {
    res.status(200).send(taskList);
});

app.get('/tasks/:id', (req, res) => {
    const task = taskList.find(task => task.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found.');
    res.send(task);
});

app.put('/tasks/:id', (req, res) => {
    let task = taskList.find(task => task.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found.');
    
    task.description = req.body.description ?? task.description;
    task.isCompleted = req.body.completed ?? task.isCompleted;
    res.send(task);
});

app.delete('/tasks/:id', (req, res) => {
    const taskIndex = taskList.findIndex(task => task.id === parseInt(req.params.id));
    if (taskIndex === -1) return res.status(404).send('Task not found.');
    taskList.splice(taskIndex, 1);
    res.status(204).send();
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));