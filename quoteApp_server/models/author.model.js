const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let authorSchema = new Schema ({
    author: {type: String, required:true, max: 100},
});

//Exporting the model
module.exports = mongoose.model('author', authorSchema);