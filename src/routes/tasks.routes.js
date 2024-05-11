const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const taskController = require('../controllers/tasks.controller');

router.route("/")
.get(taskController.getAllTasks)
.post([
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('status').isIn(['TODO', 'IN_PROGRESS', 'COMPLETED'])
], taskController.createTask);



router.route('/:id')
.get(taskController.getTaskById)

.put([
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('status').isIn(['TODO', 'IN_PROGRESS', 'COMPLETED'])
], taskController.updateTask)

.delete(taskController.deleteTask)


module.exports = router;
