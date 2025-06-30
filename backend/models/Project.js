const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['Ongoing', 'Completed'], default: 'Ongoing' },
  startDate: Date,
  endDate: Date,
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
