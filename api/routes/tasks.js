const express = require('express');

const router = express.Router();
const TaskController = require('../controllers/task-controller');
const checkAuth = require('../middleware/check-auth');

router.post('/', checkAuth, TaskController.Post_Task);
router.get('/all/:_id', checkAuth, TaskController.Get_Tasks);
router.get('/:_id', checkAuth, TaskController.Get_Task);
router.delete('/:_id', checkAuth, TaskController.Delete_Task);
router.patch('/:_id', checkAuth, TaskController.Update_Task);

module.exports = router;
