const express = require('express');
const router = express.Router();

//Requiring the controllers
const author_controller = require('../controllers/author.controller');

//Test url, you know for testing
router.get('/test', author_controller.test);

//Other routes
router.get('/all_authors', author_controller.author_all);
router.get('/:name/author_id', author_controller.get_author_id);

//CRUD routes
router.post('/create_author', author_controller.author_create);
router.get('/:id', author_controller.author_details);
router.put('/:id/update', author_controller.author_update);
router.delete('/:id/delete', author_controller.author_delete);


module.exports =  router;