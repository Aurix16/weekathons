const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let quoteSchema = new Schema ({
    quote: {type: String, required: true},
    author: {type: Number, required:true, max: 100},
});

//Exporting the model
module.exports = mongoose.model('quote', quoteSchema);