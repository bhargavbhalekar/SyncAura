const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

const createTask = async (req, res) => {
  const newTask = new Task(req.body);
  const savedTask = await newTask.save();
  res.status(201).json(savedTask);
};

const updateTask = async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
};

const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
