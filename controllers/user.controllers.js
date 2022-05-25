import UserModel from "../models/user.model.js";
import CharacterModel from "../models/character.model.js";
import FilmModel from '../models/film.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import sgMail from '../sendMails/sendMails.js'

import dotenv from 'dotenv';
dotenv.config();

export const createUser = async (req, res)=>{
  
    const {username, password, confPassword} = req.body;
    if(password !== confPassword) return res.status(400).json({message: 'password incorrect'});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password.toString(), salt);
    try{
      await UserModel.create({
        username: username,
        password: hashPassword
      })
      res.status(200).json({message: 'User register OK!'})
      /*ENVÍO DE MAIL */
      const msg = {
        to: `${username}`, 
        from: 'dipietro.jm@protonmail.com', 
        subject: 'Sending with SendGrid is Fun',
        text: 'Bienvenido a Api Disney!',
        html: `<strong>${username}, Bienvenido a Api Disney!</strong>`,
        /*
        mail_settings: {
          sandbox_mode: {
            enable: true
          }
        }
        */
      }
    try {
        await sgMail.send(msg)
        console.log(`Email sent OK to ${username}`)
    } catch (error) {
      // res.status(error.code).send(error.message)
      console.log('error sendGrid==', error.message)
    }
      

    }catch(err){
      res.status(500).send({message: err.message})
    }
}; 

export const loginUser = async (req, res)=>{
    try{
      const user = await UserModel.findAll({
        where: {
          username: req.body.username
        }
      });
      const match = await bcrypt.compare(req.body.password.toString(), user[0].password);
      if(!match) return res.status(400).json({message: 'password incorrect!'});
      const userId = user[0].id;
      const username = user[0].username;
      const accessToken = jwt.sign({userId, username}, process.env.ACCESS_TOKEN, {
        expiresIn: '1h'
      });
      const refreshToken = jwt.sign({userId, username}, process.env.ACCESS_TOKEN, {
        expiresIn: '1h'
      }); 
      await UserModel.update({refresh_token: refreshToken}, {
        where: {
          id: userId
        }
      })
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      })
      res.json({ accessToken, userId })
      console.log(accessToken)
    }catch(err){
      res.status(404).json({message: err.message});
    }
  };

  export const getUserById = async(req, res)=>{
    const { id } = req.params;
      try{
        const user = await UserModel.findOne({
          where: {
            id
          },
          include: [{
            model: CharacterModel,
            as: 'characters',
            attributes: ['name', 'image']
          },
          {
            model: FilmModel,
            as: 'films',
            attributes: ['title', 'date', 'image']
          }],
          attributes: ['id', 'username']
        })
        if(!user){
          res.send('user not exists in database!')
        }
        res.json(user)
      }catch(err){
          res.json({message: err.message});
      }
  }