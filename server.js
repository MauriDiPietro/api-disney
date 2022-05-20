import express from 'express';
import morgan from 'morgan';
import characterRoutes from './routes/characters.routes.js';
import filmsRoutes from './routes/films.routes.js';
import genresRoutes from './routes/genres.routes.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

app.use('/characters', characterRoutes)
app.use('/movies', filmsRoutes)
app.use('/genres', genresRoutes)



export default app;