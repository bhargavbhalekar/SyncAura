const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  chatType: { type: String, required: true }, // 'individual' or 'group'
  content: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional for group
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }, // only for group messages
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
