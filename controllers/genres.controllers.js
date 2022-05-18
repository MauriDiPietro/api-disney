import GenreModel from '../models/genre.model.js'

export const getAllGenres = async (req, res)=>{
    try {
        const genres = await GenreModel.findAll()
        res.json(genres)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createGenre = async (req, res)=>{
    try {
        const genre = await GenreModel.create(req.body)
        res.json(genre)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getGenreById = async (req, res)=>{
    const { id } = req.params
    try {
        const genre = await GenreModel.findOne({
            where :{
                id
            }
        })
        res.json(genre)
    } catch (error) {
        res.json({message: error.message})
    }
}