const express = require('express');
const router = express.Router();
const {
  getAllTeams,
  createTeam,
  updateTeam,
  deleteTeam,
} = require('../controllers/teamController');

// Define routes
router.get('/', getAllTeams);
router.post('/', createTeam);
router.put('/:id', updateTeam);
router.delete('/:id', deleteTeam);

module.exports = router;
