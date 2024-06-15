const express = require('express');
const router = express.Router();
require('dotenv').config();
const TaskManager = require('./controllers/TaskController');

router.post('/tasks', (request, response) => {
    TaskManager.createTask(request.body)
        .then(taskDetails => response.json(taskDetails))
        .catch(error => response.status(500).json({ message: "Error creating task", error: error }));
});

router.get('/tasks', (request, response) => {
    TaskManager.fetchAllTasks()
        .then(allTasks => response.json(allTasks))
        .catch(error => response.status(500).json({ message: "Error retrieving tasks", error: error }));
});

router.patch('/tasks/:id/complete', (request, response) => {
    TaskManager.completeTaskById(request.params.id)
        .then(completedTask => response.json(completedTask))
        .catch(error => response.status(500).json({ message: "Error updating task status", error: error }));
});

router.delete('/tasks/:id', (request, response) => {
    TaskManager.removeTaskById(request.params.id)
        .then(() => response.status(204).send())
        .catch(error => response.status(500).json({ message: "Error deleting task", error: error }));
});

module.exports = router;