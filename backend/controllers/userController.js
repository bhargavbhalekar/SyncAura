// controllers/userController.js (ES Module version)
import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const createUser = async (req, res) => {
  const newUser = new User(req.body);
  const savedUser = await newUser.save();
  res.status(201).json(savedUser);
};

export const updateUser = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedUser);
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
};
