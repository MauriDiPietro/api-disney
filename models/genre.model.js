import {db} from '../db/db.js';
import {DataTypes} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
import FilmModel from './film.model.js'

const GenreModel = db.define(process.env.TABLE_GENRES, {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    // films: {
    //     type: DataTypes.ARRAY(DataTypes.STRING)
    // }
});



export default GenreModel;