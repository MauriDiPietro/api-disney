import FilmModel from '../models/film.model.js'
import GenreModel from '../models/genre.model.js'

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

export const getDetailFilmsAndCharacters = async (req, res)=>{
    const { filmId } = req.params
    try {
        const film = await FilmModel.findByPk(filmId)
        const characters = await film.getCharacters()
        res.json(film, characters)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateFilm = async (req, res)=>{
    try{
        await FilmModel.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            'message': `Film updated ok`
        })
    }catch(err){
        res.json({message: err.message});
    }
};

export const deleteFilm = async (req, res)=>{
    try{
        await FilmModel.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json({
            'message': `Film deleted`
        })
    }catch(err){
        res.json({message: err.message});
    }
};

export const getFilmByName = async (req, res)=>{
    const { title } = req.query
    try {
        const film = await FilmModel.findOne({
            where :{
                title
            },
            // include: [{ 
            //     model: FilmModel,
            //     attributes: ['title']
            //  }]
        })
        res.json(film)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getFilmByGenre = async (req, res)=>{
    const { id } = req.query
    try {
        const genre = await GenreModel.findByPk(id)
        const films = await genre.getFilm()
        res.json(films)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getAllFilmsByOrder = async (req, res)=>{
    const {order} = req.query
    try {
        if(order === 'ASC'){
            const films = await FilmModel.findAll({
                attributes: ['title', 'date', 'image'],
                order: [
                    ['title', 'ASC'],
                ]
            })
            res.json(films)
        } 
        if(order === 'DESC'){
            const films = await FilmModel.findAll({
                attributes: ['title', 'date', 'image'],
                order: [
                    ['title', 'DESC'],
                ]
            })
            res.json(films)
        }
    } catch (error) {
        res.json({message: error.message})
    }
}

// export const getAllFilmsDesc = async (req, res)=>{
//     try {
//         if(req.query.order === 'DESC'){
//             const films = await FilmModel.findAll({
//                 attributes: ['title', 'date', 'image'],
//                 order: [
//                     ['title', 'DESC'],
//                 ]
//             })
//             res.json(films)
//         }
//     } catch (error) {
//         res.json({message: error.message})
//     }
// }

/**export const getCharacterByFilms = async (req, res)=>{
    const { filmId } = req.query
    try {
        const film = await FilmModel.findByPk(filmId)
        const characters = await film.getCharacters()
        res.json(characters)
    } catch (error) {
        res.json({message: error.message})
    }
} */