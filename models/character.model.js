import {db} from '../db/db.js';
import {DataTypes} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
import FilmModel from './film.model.js'


const CharacterModel = db.define(process.env.TABLE_CHARACTERS, {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    },
    weight: {
        type: DataTypes.INTEGER
    },
    history: {
        type: DataTypes.STRING
    }
    
});


CharacterModel.belongsToMany(FilmModel, {through: 'charactersInFilm'});
FilmModel.belongsToMany(CharacterModel, {through: 'charactersInFilm'});


export default CharacterModel;