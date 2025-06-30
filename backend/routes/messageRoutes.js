const express = require('express');
const router = express.Router();
const {
  getMessages,
  sendMessage,
  getGroupMessages,
  createMessage,
  sendGroupMessage,
} = require('../controllers/messageController');

// Individual chat messages
router.get('/:senderId/:receiverId', getMessages);
router.post('/:senderId/:receiverId', sendMessage);
router.post('/:senderId/:receiverId', createMessage);
router.get('/:senderId/:receiverId', getMessages);


// Group chat messages
router.get('/group/:teamId', getGroupMessages);
router.post('/group/:teamId', sendGroupMessage);
router.post('/', createMessage);

module.exports = router;
