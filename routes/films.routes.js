import express from 'express';
import { createFilm, 
    getAllFilms, 
    getFilmById, 
    getDetailFilmsAndCharacters, 
    updateFilm, 
    deleteFilm,
    getFilmByName,
    getFilmByGenre,
    getAllFilmsByOrder
    
 } from '../controllers/films.controllers.js';
const router = express.Router();

router.get('/', getAllFilms);
router.get('/byid/:id', getFilmById);
router.get('/byname', getFilmByName);
router.get('/bygenre', getFilmByGenre);
router.get('/order', getAllFilmsByOrder);
// router.get('/order', getAllFilmsDesc);
router.post('/', createFilm);
router.get('/detail/:id', getDetailFilmsAndCharacters);
router.put('/:id', updateFilm);
router.delete('/:id', deleteFilm);

export default router;