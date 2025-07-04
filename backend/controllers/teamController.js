import Team from '../models/Team.js'; // ✅ This is correct

export const createTeam = async (req, res) => {
  try {
    const newTeam = new Team(req.body);  
    const saved = await newTeam.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllTeam = async (req, res) => {
  try {
    const team = await Team.find();  // ✅ not Team
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Update a team
export const updateTeam = async (req, res) => {
  try {
    const updated = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Delete a team
export const deleteTeam = async (req, res) => {
  try {
    const deleted = await Team.findByIdAndDelete(req.params.id); 
    if (!deleted) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({ message: 'Team deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};