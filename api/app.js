import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

//import routes
import indexRoute from './Routes/indexRoute.js';

const app = express();

//to accept cross origin requests
app.use(cors());

//extract content from bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//use routes
app.use('/api', indexRoute);  

app.listen(3001);
console.log('Server Initialized on http://localhost:3001'); 