import express from 'express';
import { getIdeas, newIdeas, updateIdeas, deleteIdeas } from '../controller/ideaController.js';

const router = express.Router();

// Define routes
router.get('/', getIdeas);
router.post('/', newIdeas);
router.delete('/:id', deleteIdeas);
router.put('/:id', updateIdeas)

export default router;