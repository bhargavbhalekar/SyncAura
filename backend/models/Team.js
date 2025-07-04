import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  members: [
    {
      name: String,
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      role: String // ✅ Corrected: now allows any role like "dev", "figma"
    }
  ],
  assignedProjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }
  ]
}, {
  timestamps: true
});

const Team = mongoose.model('Team', teamSchema);
export default Team;
