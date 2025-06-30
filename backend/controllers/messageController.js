const Message = require('../models/Message');

// Get all individual messages between two users
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.params.userId, receiverId: req.params.receiverId },
        { senderId: req.params.receiverId, receiverId: req.params.userId }
      ]
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Send a message (individual)
const sendMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const saved = await newMessage.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all group messages by team ID
const getGroupMessages = async (req, res) => {
  try {
    const messages = await Message.find({ teamId: req.params.teamId });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Send a message to a group
const sendGroupMessage = async (req, res) => {
  try {
    const newGroupMessage = new Message(req.body);
    const saved = await newGroupMessage.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getMessages,
  sendMessage,
  getGroupMessages,
  sendGroupMessage,
};
