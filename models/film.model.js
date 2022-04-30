import {db} from '../db/db.js';
import {DataTypes} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
import GenreModel from './genre.model.js'

const FilmModel = db.define(process.env.TABLE_FILMS, {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
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

FilmModel.belongsToMany(GenreModel, {
   through: 'FilmGenre'
})

GenreModel.belongsToMany(FilmModel, {
    through: 'FilmGenre'
});


export default FilmModel;