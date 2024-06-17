const express = require('express');
const router = express.Router();
require('dotenv').config();
const TaskManager = require('./controllers/TaskController');

// Simple in-memory cache object
const cache = {};

router.post('/tasks', (request, response) => {
    TaskManager.createTask(request.body)
        .then(taskDetails => {
            // Invalidate cache after a new task is created
            cache["fetchAllTasks"] = null;
            response.json(taskDetails);
        })
        .catch(error => response.status(500).json({ message: "Error creating task", error: error }));
});

router.get('/tasks', (request, response) => {
    // Check if we have a cached version of fetchAllTasks
    if (cache["fetchAllTasks"]) {
        return response.json(cache["fetchAllTasks"]);
    }
    
    TaskManager.fetchAllTasks()
        .then(allTasks => {
            // Store result in cache before sending the response
            cache["fetchAllTasks"] = allTasks;
            response.json(allTasks);
        })
        .catch(error => response.status(500).json({ message: "Error retrieving tasks", error: error }));
});

router.patch('/tasks/:id/complete', (request, response) => {
    TaskManager.completeTaskById(request.params.id)
        .then(completedTask => {
            // Invalidate cache when a task status is updated
            cache["fetchAllTasks"] = null;
            response.json(completedExecutorTask);
        })
        .catch(error => response.status(500).json({ message: "Error updating task status", error: error }));
});

router.delete('/tasks/:id', (request, response) => {
    TaskManager.removeTaskById(request.params.id)
        .then(() => {
            // Invalidate cache when a task is removed
            cache["fetchAllTasks"] = null;
            response.status(204).send();
        })
        .catch(error => response.status(500).json({ message: "Error deleting task", error: error }));
});

module.exports = router;