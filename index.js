import express from 'express';
import bodyParser from 'body-parser';
import employeeRouters from './Controllers/router.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;  

const corsOptions = {
    origin: [process.env.CORS_ORIGIN,process.env.CORS_ORIGIN1] ,  
    methods: ['GET', 'POST', 'DELETE'],  
    allowedHeaders: ['Content-Type', 'Authorization'],  
    preflightContinue: false, 
  };
app.use(cors());  

app.use(bodyParser.json());


app.use('/tasks', employeeRouters);  

app.on('error', (err) => {
    console.error(`Error during startup: ${err.message}`);
});
app.options('*', cors(corsOptions));  
app.listen(port, () => {
   
});
