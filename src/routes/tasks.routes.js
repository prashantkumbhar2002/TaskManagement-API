const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const taskController = require('../controllers/tasks.controller');
const authenticateUser  = require('../middlewares/auth.middleware.js');

router.route("/")
.get(authenticateUser, taskController.getAllTasks)
.post([
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('status').isIn(['TODO', 'IN_PROGRESS', 'COMPLETED'])
], authenticateUser, taskController.createTask);



router.route('/:id')
.get(authenticateUser, taskController.getTaskById)

.put([
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('status').isIn(['TODO', 'IN_PROGRESS', 'COMPLETED'])
],authenticateUser, taskController.updateTask)

.delete(authenticateUser, taskController.deleteTask)


module.exports = router;
