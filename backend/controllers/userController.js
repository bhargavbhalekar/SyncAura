const User = require('../models/User');

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const createUser = async (req, res) => {
  const newUser = new User(req.body);
  const savedUser = await newUser.save();
  res.status(201).json(savedUser);
};

const updateUser = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedUser);
};

const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
