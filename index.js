const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
let tasks = [];
app.post('/tasks', (req, res) => {
    const task = {
        id: tasks.length + 1,
        description: req.body.description,
        completed: false
    };
    tasks.push(task);
    res.status(201).send(task);
});
app.get('/tasks', (req, res) => {
    res.status(200).send(tasks);
});
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');
    res.send(task);
});
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');
    task.description = req.body.description;
    task.completed = req.body.completed;
    res.send(task);
});
app.delete('/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) return res.status(404).send('Task not found');
    tasks.splice(taskIndex, 1);
    res.status(204).send();
});
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));