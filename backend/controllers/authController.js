import User from '../models/User.js';

export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email, role });
    if (!user) return res.status(401).json({ error: 'User not found with this role' });

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    // Create and save new user
    const newUser = new User({ email, password, role });
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User registered', user: savedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};