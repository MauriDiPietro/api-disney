import express from 'express';
import { createCharacter,
         getAllCharacters, 
         getCharacterById, 
         addFilmToCharacter,
         updateCharacter, 
         deleteCharacter,
         getCharacterByAge,
         getCharacterByFilms,
         getCharacterByName 
        } from '../controllers/characters.controllers.js';
const router = express.Router();

router.get('/', getAllCharacters);
router.get('/byid/:id', getCharacterById);
router.get('/byname', getCharacterByName)
router.get('/byfilms', getCharacterByFilms)
router.get('/byage', getCharacterByAge)
router.post('/', createCharacter);
router.post('/:characterId/:filmId', addFilmToCharacter);
router.put('/:id', updateCharacter);
router.delete('/:id', deleteCharacter);


export default router;