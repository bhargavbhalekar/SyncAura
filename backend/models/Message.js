import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  content: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', MessageSchema);
export default Message;
