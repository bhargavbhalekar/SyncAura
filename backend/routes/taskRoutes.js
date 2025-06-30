const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController'); // ✅ Make sure this path is correct

router.get('/', getAllTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
