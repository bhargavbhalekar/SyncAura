import express from 'express';
import {
  getAllTeam,
  createTeam,
  updateTeam,
  deleteTeam
} from '../controllers/teamController.js';

const router = express.Router();

router.get('/', getAllTeam);
router.post('/', createTeam); // ✅ POST route must exist
router.put('/:id', updateTeam);
router.delete('/:id', deleteTeam);

export default router;
