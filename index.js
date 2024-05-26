const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
let taskList = [];

let cache = {
    tasks: null,
    lastFetch: 0,
    ttl: 10000, 
};

function updateCache(newTasks) {
    cache.tasks = newTasks;
    cache.lastFetch = Date.now();
}

function isCacheValid() {
    return cache.tasks && (Date.now() - cache.lastFetch < cache.ttl);
}

app.post('/tasks', (req, res) => {
    try {
        if (!req.body.description) {
            return res.status(400).send({ error: 'The description field is required.' });
        }
        
        const newTask = {
            id: taskList.length + 1,
            description: req.body.description,
            isCompleted: false
        };
        taskList.push(newTask);

        updateCache(taskList);

        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while creating the task.' });
    }
});

app.get('/tasks', (req, res) => {
    try {
        if (!isCacheValid()) {
            updateCache(taskList);
        }
        res.status(200).send(cache.tasks);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while retrieving tasks.' });
    }
});

app.get('/tasks/:id', (req, res) => {
    try {
        const task = taskList.find(task => task.id === parseInt(req.params.id));
        if (!task) return res.status(404).send('Task not found.');
        res.send(task);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while retrieving the task.' });
    }
});

app.put('/tasks/:id', (req, res) => {
    try {
        const taskIndex = taskList.findIndex(task => task.id === parseInt(req.params.id));
        if (taskIndex === -1) return res.status(404).send('Task not found.');
        
        let task = taskList[taskIndex];
        task.description = req.body.description ?? task.description;
        task.isCompleted = req.body.completed ?? task.isCompleted;

        updateCache(taskList);

        res.send(task);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while updating the task.' });
    }
});

app.delete('/tasks/:id', (req, res) => {
    try {
        const taskIndex = taskList.findIndex(task => task.id === parseInt(req.params.id));
        if (taskIndex === -1) return res.status(404).send('Task not found.');
        
        taskList.splice(taskIndex, 1);

        updateCache(taskList);

        res.status(204).send();
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while deleting the task.' });
    }
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));