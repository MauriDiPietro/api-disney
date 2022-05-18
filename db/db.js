import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
// import FilmModel from '../models/film.model.js'
// import GenreModel from '../models/genre.model.js'
// import CharacterModel from '../models/character.model.js'

export const db = new Sequelize(
                    process.env.DB_NAME, 
                    process.env.DB_USER, 
                    process.env.DB_PASS, {
                    host: process.env.HOST,
                    dialect: 'postgres',
});


