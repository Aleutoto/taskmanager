const express = require('express');
const router = express.Router();
require('dotenv').config();
const TaskController = require('./controllers/TaskController');

router.post('/tasks', (req, res) => {
    TaskController.createTask(req.body)
        .then(task => res.json(task))
        .catch(err => res.status(500).json({ message: "Error creating task", error: err }));
});

router.get('/tasks', (req, res) => {
    TaskController.getAllTasks()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(500).json({ message: "Error retrieving tasks", error: err }));
});

router.patch('/tasks/:id/complete', (req, res) => {
    TaskController.markTaskAsComplete(req.params.id)
        .then(updatedTask => res.json(updatedTask))
        .catch(err => res.status(500).json({ message: "Error updating task status", error: err }));
});

router.delete('/tasks/:id', (req, res) => {
    TaskController.deleteTask(req.params.id)
        .then(() => res.status(204).send())
        .catch(err => res.status(500).json({ message: "Error deleting task", error: err }));
});

module.exports = router;