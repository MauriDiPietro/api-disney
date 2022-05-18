import express from 'express';
import { createFilm, getAllFilms, getFilmById } from '../controllers/films.controllers.js';
const router = express.Router();

router.get('/', getAllFilms);
router.get('/:id', getFilmById);
router.post('/', createFilm);

export default router;