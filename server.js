import express from 'express';
import morgan from 'morgan';
import characterRoutes from './routes/characters.routes.js';
import filmsRoutes from './routes/films.routes.js';
import genresRoutes from './routes/genres.routes.js';
import userRoutes from './routes/users.routes.js';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

const options = {
    definition: {
        openapi: '3.0.0',
        info:{
            title: 'API Disney',
            version: '1.0.0',
            description: 'Proyecto creado con Node, Express, PostgreSQL, Sequelize, Autenticación (JWT), Envío de mails (SendGrid).'
        },
        servers: [
            {
                url: 'http://localhost:8080'
            }
        ]
    },
    apis: ['./swagger/docs/*.yaml']
}

const specs = swaggerJSDoc(options)


app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))

app.use('/characters', characterRoutes)
app.use('/films', filmsRoutes)
app.use('/genres', genresRoutes)
app.use('/auth', userRoutes)

app.use((req, res) => {
    const mensaje = `Ruta ${req.url} - Método ${req.method} no implementado`
    res.status(404).json({
      descripción: mensaje,
    });
  });


export default app;