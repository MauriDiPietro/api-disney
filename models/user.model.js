import {db} from '../db/db.js';
import {DataTypes} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
import CharacterModel from '../models/character.model.js'
import FilmModel from '../models/film.model.js';

const UserModel = db.define(process.env.TABLE_USERS, {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
});

UserModel.hasMany(CharacterModel, { as: 'characters', foreignKey: 'userId' });
CharacterModel.belongsTo(UserModel, { as: 'user' });

UserModel.hasMany(FilmModel, { as: 'films', foreignKey: 'userId' });
FilmModel.belongsTo(UserModel, { as: 'user' });



export default UserModel;