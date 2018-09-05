const express = require('express');
const router = express.Router();

//Requiring the controllers
const quote_controller = require('../controllers/quote.controller');

//Test url, you know for testing
router.get('/test', quote_controller.test);

//Other routes
router.get('/all_quotes', quote_controller.quote_all);
router.get('/:name/quotes', quote_controller.get_quotes_by_author_name);
router.get('/:id/quotes', quote_controller.get_quotes_by_author_id);

//CRUD routes
router.post('/create_quote', quote_controller.quote_create);
router.get('/:id', quote_controller.quote_details);
router.put('/:id/update', quote_controller.quote_update);
router.delete('/:id/delete', quote_controller.quote_delete);


module.exports =  router;