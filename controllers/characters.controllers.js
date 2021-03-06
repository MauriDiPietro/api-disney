import CharacterModel from '../models/character.model.js'
import FilmModel from '../models/film.model.js'
import charactersInFilm from '../models/character.model.js'

export const getAllCharacters = async (req, res)=>{
    try {
        const characters = await CharacterModel.findAll({
            attributes: ['name', 'image']
        })
        res.json(characters)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createCharacter = async (req, res)=>{
    try {
        const character = await CharacterModel.create(req.body)
        res.json(character)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getCharacterById = async (req, res)=>{
    const { id } = req.params
    try {
        const character = await CharacterModel.findOne({
            where :{
                id
            },
            include: [{ 
                model: FilmModel,
                attributes: ['title']
             }]
        })
        if(character){
            res.json(character)
        }else{
            res.status(404).json({message: `No se encontrĂ³ el id: ${id}`})
        }
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getCharacterByName = async (req, res)=>{
    const { name } = req.query
    try {
        const character = await CharacterModel.findOne({
            where :{
                name
            },
            include: [{ 
                model: FilmModel,
                attributes: ['title']
             }]
        })
        if(character){
            res.json(character)
        }else{
            res.status(404).json({message: `No se encontrĂ³ el personaje con nombre: ${name}`})
        }
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getCharacterByAge = async (req, res)=>{
    const { age } = req.query
    try {
        const character = await CharacterModel.findOne({
            where :{
                age
            },
            include: [{ 
                model: FilmModel,
                attributes: ['title']
             }]
        })
        res.json(character)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getCharacterByFilms = async (req, res)=>{
    const { filmId } = req.query
    try {
        const film = await FilmModel.findByPk(filmId)
        const characters = await film.getCharacters()
        if(characters){
            res.json(characters)
        }else{
            res.status(404).json({message: `no characters were found in the movie with id: ${filmId}`})
        }
    } catch (error) {
        res.json({message: error.message})
    }
}

export const addFilmToCharacter = async (req, res)=>{
    const {characterId, filmId} = req.params
    try {
        const character = await CharacterModel.findByPk(characterId)
        const film = await FilmModel.findByPk(filmId)
        const res = await character.addFilms(film)
        res.json({message: `add film ${film} to character ${character}.`})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateCharacter = async (req, res)=>{
    try{
        const character = await CharacterModel.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        if(character){
            res.json({
                message: `Character updated ok`
            })
        }else{
            res.status(404).json({message: `No se encontrĂ³ el id: ${id}`})
        }
    }catch(err){
        res.json({message: err.message});
    }
};

export const deleteCharacter = async (req, res)=>{
    try{
        await CharacterModel.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json({
            'message': `Character deleted`
        })
    }catch(err){
        res.json({message: err.message});
    }
};