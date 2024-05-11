const Task = require('../models/tasks.model');

class TaskService {
    async getAllTasks() {
        return await Task.find();
    }

    async createTask(taskData) {
        return await Task.create(taskData);
    }
}

module.exports = new TaskService();
