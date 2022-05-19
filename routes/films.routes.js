import express from 'express';
import { createFilm, getAllFilms, getFilmById, getDetailFilmsAndCharacters } from '../controllers/films.controllers.js';
const router = express.Router();

router.get('/', getAllFilms);
router.get('/:id', getFilmById);
router.post('/', createFilm);
router.get('/:id', getDetailFilmsAndCharacters);

export default router;