import app from './server.js';
import {db} from './db/db.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;



(async function(){
    try {
        await db.sync({ force:false })
        console.log('Database is connected OK!')
        app.listen(PORT, ()=>{
            console.log(`Server OK on port: ${PORT}`)
        });
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})()