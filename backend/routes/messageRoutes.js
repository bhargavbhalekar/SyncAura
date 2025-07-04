import express from 'express';
import {
  getMessages,
  sendMessage,
  sendGroupMessage,
  getGroupMessages,
} from '../controllers/messageController.js';

const router = express.Router();

router.get('/:senderId/:receiverId', getMessages);
router.post('/:senderId/:receiverId', sendMessage);
router.get('/group/:teamId', getGroupMessages);
router.post('/group/:teamId', sendGroupMessage);

export default router;
