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
    // ,
    // filmes: {
    //     type: DataTypes.ARRAY(DataTypes.INTEGER)
    // }
});

//se añade una clave characterId a la tabla Films, que hace referencia al id de cada character
// CharacterModel.hasMany(FilmModel, {
//     foreignKey: 'characterId',
//     sourceKey: 'id'
// });

// FilmModel.belongsTo(CharacterModel, {
//     foreignKey: 'characterId',
//     targetId: 'id'
// })

//crea tabla intermedia charactersInFilm
//habilita metodo CharacterModel.addFilmModel
CharacterModel.belongsToMany(FilmModel, {through: 'charactersInFilm'});
FilmModel.belongsToMany(CharacterModel, {through: 'charactersInFilm'});


export default CharacterModel;