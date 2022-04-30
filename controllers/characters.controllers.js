import CharacterModel from '../models/character.model.js'

export const getAllCharacters = async (req, res)=>{
    try {
        const characters = await CharacterModel.findAll()
        res.json(characters)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createCharacter = async (req, res)=>{
    try {
        await CharacterModel.create(req.body)
        res.json(req.body)
    } catch (error) {
        res.json({message: error.message})
    }
}