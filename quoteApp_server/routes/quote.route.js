const express = require('express');
const router = express.Router();

//Requiring the controllers
const quote_controller = require('../controllers/quote.controller');

//Test url, you know for testing
router.get('/test', quote_controller.test);

//CRUD routes
router.post('/create', quote_controller.quote_create);
router.get('/:id', quote_controller.quote_details);
router.put('/:id/update', quote_controller.quote_update);
router.delete('/:id/delete', quote_controller.quote_delete);

module.exports =  router;