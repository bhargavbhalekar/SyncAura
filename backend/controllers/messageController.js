import Message from '../models/Message.js';

// Get individual messages between sender and receiver
export const getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Send individual message
export const sendMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const saved = await newMessage.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all group messages
export const getGroupMessages = async (req, res) => {
  try {
    const teamId = req.params.teamId;
    const messages = await Message.find({ receiver: teamId });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get group messages' });
  }
};

// Send a message to a group
export const sendGroupMessage = async (req, res) => {
  try {
    const newGroupMessage = new Message(req.body);
    const saved = await newGroupMessage.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
