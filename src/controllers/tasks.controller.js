const taskService = require('../services/tasks.services');
const { validationResult } = require('express-validator');
const { isValidObjectId } = require('mongoose');

class TaskController {
    async getAllTasks(req, res) {
        try {
            let tasks = await taskService.getAllTasks();
            tasks = tasks.filter((task) => task.createdBy.toString() === req.user._id.toString());
            res.status(200).json({ message: 'Fetched all tasks successfully', success: true, tasks});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error', success: false });
        }
    }

    async createTask(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), success: false});
        }

        const { title, description, status } = req.body;
        const createdBy = req.user?._id;

        try {
            const task = await taskService.createTask({ title, description, status, createdBy });
            res.status(201).json({ message: 'Created task successfully', success: true, task });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error', success: false });
        }
    }

    async getTaskById(req, res) {
        if(!isValidObjectId(req.params.id)){
            return res.status(404).json({ message: 'Task ID not found or Invalid', success: false });
        }

        try {
            const task = await taskService.getTaskById(req.params.id);
            if (!task) {
                return res.status(404).json({ message: 'Task not found', success: false });
            }
            if(task.createdBy.toString() !== req.user?._id.toString()){
                return res.status(403).json({ message: 'Cannot access Task!', success: false });
            }
            res.status(200).json({ message: 'Fetched task details successfully', success: true, task });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error', success: false });
        }
    }

    async updateTask(req, res) {
        if(!req.params.id){
            return res.status(400).json({ message: 'Task ID is required', success: false });
        }
        if(!isValidObjectId(req.params.id)){
            return res.status(404).json({ message: 'Task ID not found or Invalid', success: false });
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), success: false });
        }
        const { title, description, status } = req.body;
        try {
            let task = await taskService.getTaskById(req.params?.id);
            if(task.createdBy.toString() !== req.user?._id.toString()){
                return res.status(403).json({ message: 'Cannot update task!', success: false });
            }
            task = await taskService.updateTask(req.params?.id, { title, description, status });
            if (!task) {
                return res.status(500).json({ message: 'Error while updating task', success: false });
            }
            res.status(201).json({ message: 'Task updated successfully', success: true, task });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error', success: false });
        }
    }

    async deleteTask(req, res) {
        if(!req.params.id){
            return res.status(400).json({ message: 'Task ID is required', success: false });
        }
        if(!isValidObjectId(req.params?.id)){
            return res.status(404).json({ message: 'Task ID not found or Invalid', success: false });
        }
        try {
            const task = await taskService.getTaskById(req.params?.id);
            if(!task){
                return res.status(404).json({ message: 'Task not found', success: false });
            }
            if(task.createdBy.toString() !== req.user?._id){
                return res.status(403).json({ message: 'Cannot delete task', success: false });
            }
            await taskService.deleteTask(task?._id);
            res.json({ message: 'Task deleted', success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error', success: false });
        }
    }

}
module.exports = new TaskController();
