const taskService = require('../services/tasks.services');
const { validationResult } = require('express-validator');

class TaskController {
    async getAllTasks(req, res) {
        const tasks = await taskService.getAllTasks();
        res.json(tasks);
    }

    async createTask(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, status } = req.body;
        const createdBy = req.user?.id || undefined;

        const task = await taskService.createTask({ title, description, status, createdBy });
        res.status(201).json(task);
    }
}
module.exports = new TaskController();
