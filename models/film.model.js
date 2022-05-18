import {db} from '../db/db.js';
import {DataTypes} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
import GenreModel from './genre.model.js'


const FilmModel = db.define(process.env.TABLE_FILMS, {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.STRING
    },
    rating: {
        type: DataTypes.INTEGER
    },
    // characters: {
    //     type: DataTypes.ARRAY(DataTypes.STRING)
    // }
});




// FilmModel.belongsToMany(GenreModel, {through: 'FilmGenre'});
// GenreModel.belongsToMany(FilmModel, {through: 'FilmGenre'});

//se añade una clave filmId a la tabla Genres, que hace referencia al id de cada film
FilmModel.hasMany(GenreModel, {
    foreignKey: 'filmId',
    sourceKey: 'id'
});

GenreModel.belongsTo(FilmModel, {
    foreignKey: 'filmId',
    targetId: 'id'
})


export default FilmModel;