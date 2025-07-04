import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: Date,
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started',
  },
  assignedTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
