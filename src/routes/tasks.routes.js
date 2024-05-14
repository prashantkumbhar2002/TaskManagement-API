const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const taskController = require('../controllers/tasks.controller');
const authenticateUser  = require('../middlewares/auth.middleware.js');

/**
 * @swagger
 * tags:
 *   name: Task
 *   description: Operations related to tasks management
 */
/** GET Methods */ 
/**
 * @swagger
 * /api/v1/tasks/:
 *   get:
 *     summary: Retrieve all tasks
 *     description: Retrieve a list of all tasks
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of tasks
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized - Authentication token is missing or invalid
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */

router.route("/")
.get(authenticateUser, taskController.getAllTasks)
/**
* @swagger
* components:
*   schemas:
*     Task:
*       type: object
*       required:
*         - title
*         - description
*         - status
*       properties:
*         title:
*           type: string
*         description:
*           type: string
*         status:
*           type: string
*           enum: [TODO, IN_PROGRESS, COMPLETED]
*       example:
*         title: Sample Task
*         description: This is a sample task
*         status: TODO
*/
/**
* @swagger
* /api/v1/tasks:
*   post:
*     summary: Create a new task
*     description: Create a new task
*     tags: [Task]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Task'
*     responses:
*       201:
*         description: The created task
*/
.post([
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('status').isIn(['TODO', 'IN_PROGRESS', 'COMPLETED'])
], authenticateUser, taskController.createTask);


/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     description: Retrieve details of a task by its ID
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of the task
 */
/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     description: Update details of a task by its ID
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Updated task successfully
 */
/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     description: Delete a task by its ID
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 */
router.route('/:id')
.get(authenticateUser, taskController.getTaskById)

.put([
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('status').isIn(['TODO', 'IN_PROGRESS', 'COMPLETED'])
],authenticateUser, taskController.updateTask)

.delete(authenticateUser, taskController.deleteTask)


module.exports = router;
