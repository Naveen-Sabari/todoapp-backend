import express from 'express';
import bodyParser from 'body-parser';
import employeeRouters from './Controllers/router.js';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const port = process.env.PORT;  


app.use(cors()); 


app.use(bodyParser.json());


app.on('error', (err) => {
    console.error(`Error during startup: ${err.message}`);
});


app.listen(port, () => {
 
});
