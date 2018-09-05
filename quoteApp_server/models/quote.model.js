const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let quoteSchema = new Schema ({
    quote: {type: String, required: true},
    author: {type: String, required:true, max: 100},
    author_id: {type: Schema.ObjectId, ref:'author'}
});

//Exporting the model
module.exports = mongoose.model('quote', quoteSchema);