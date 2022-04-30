import express from 'express';
import morgan from 'morgan';
import characterRoutes from './routes/characters.routes.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

app.use('/characters', characterRoutes)




export default app;