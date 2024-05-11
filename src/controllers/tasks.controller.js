const taskService = require('../services/tasks.services');
const { validationResult } = require('express-validator');
const { isValidObjectId } = require('mongoose');

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

    async getTaskById(req, res) {
        if(!isValidObjectId(req.params.id)){
            return res.status(404).json({ message: 'Task ID not found or Invalid' });
        }

        const task = await taskService.getTaskById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    }

    async updateTask(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if(!isValidObjectId(req.params.id)){
            return res.status(404).json({ message: 'Task ID not found or Invalid' });
        }

        const { title, description, status } = req.body;
        const task = await taskService.updateTask(req.params.id, { title, description, status });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    }

    async deleteTask(req, res) {
        if(!isValidObjectId(req.params.id)){
            return res.status(404).json({ message: 'Task ID not found or Invalid' });
        }
        await taskService.deleteTask(req.params.id);
        res.json({ message: 'Task deleted' });
    }

}
module.exports = new TaskController();
