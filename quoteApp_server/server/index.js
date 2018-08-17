const express =  require('express');
const bodyParser = require('body-parser');

//Use dotenv to read .env vars into Node
const dotenv = require('dotenv').config();

//Imports routes for the quotes
const quote = require('../routes/quote.route'); 

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://admin:admin1234@ds119662.mlab.com:19662/quoteapp_db';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Setting up Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//initializing express app
const app = express();

app.use('/quotes', quote);

//dedicating a port number
let port = 1234;

app.listen(port, ()=>{
    console.log("Server running on port " + port);
});