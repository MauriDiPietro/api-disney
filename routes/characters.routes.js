import express from 'express';
import { createCharacter, getAllCharacters } from '../controllers/characters.controllers.js';
const router = express.Router();

router.get('/', getAllCharacters);
router.post('/', createCharacter);

export default router;