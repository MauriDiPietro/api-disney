import express from 'express';
import { createGenre, getAllGenres, getGenreById } from '../controllers/genres.controllers.js';
const router = express.Router();

router.get('/', getAllGenres);
router.get('/:id', getGenreById);
router.post('/', createGenre);

export default router;