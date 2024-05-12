const Task = require('../models/tasks.model');

class TaskService {
    async getAllTasks() {
        return await Task.find();
    }

    async createTask(taskData) {
        return await Task.create(taskData);
    }

    async getTaskById(id) {
        return await Task.findById(id);
    }

    async updateTask(id, taskData) {
        return await Task.findByIdAndUpdate(id, taskData, { new: true });
    }
    async deleteTask(id) {
        await Task.findByIdAndDelete(id);
    }
}

module.exports = new TaskService();
