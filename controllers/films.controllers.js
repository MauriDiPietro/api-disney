import FilmModel from '../models/film.model.js'

export const getAllFilms = async (req, res)=>{
    try {
        const films = await FilmModel.findAll({
            attributes: ['title', 'date', 'image']
        })
        res.json(films)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createFilm = async (req, res)=>{
    try {
        const film = await FilmModel.create(req.body)
        res.json(film)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getFilmById = async (req, res)=>{
    const { id } = req.params
    try {
        const film = await FilmModel.findOne({
            where :{
                id
            }
        })
        res.json(film)
    } catch (error) {
        res.json({message: error.message})
    }
}