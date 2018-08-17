const express = require('express');
const router = express.Router();

//Requiring the controllers
const quote_controller = require('../controllers/quote.controller');

//Test url, you know for testing
router.get('/test', quote_controller.test);


module.exports =  router;