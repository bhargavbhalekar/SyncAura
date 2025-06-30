const Team = require('../models/Team');

// Get all teams
const getAllTeams = async (req, res) => {
  const teams = await Team.find();
  res.json(teams);
};

// Create a team
const createTeam = async (req, res) => {
  const newTeam = new Team(req.body);
  const savedTeam = await newTeam.save();
  res.status(201).json(savedTeam);
};

// Update a team
const updateTeam = async (req, res) => {
  const updated = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// Delete a team
const deleteTeam = async (req, res) => {
  await Team.findByIdAndDelete(req.params.id);
  res.json({ message: 'Team deleted' });
};

module.exports = {
  getAllTeams,
  createTeam,
  updateTeam,
  deleteTeam,
};
