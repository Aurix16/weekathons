//initializing express app
const express =  require('express');
const app = express();

//Setting up Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Use dotenv to read .env vars into Node
const dotenv = require('dotenv').config();

//Imports routes for the quotes and authors
const quote = require('./routes/quote.route');
const author = require('./routes/author.route');
app.use('/quotes', quote);
app.use('/authors', author);

// Set up mongoose connection
const mongoose = require('mongoose');
let mongoDB = process.env.MONGODB_URI || process.env.local_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//dedicating a port number
let port = 1234;

app.listen(port, ()=>{
    console.log("Server running on port " + port);
});