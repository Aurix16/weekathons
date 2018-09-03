const Author = require('../models/author.model');
const bodyParser = require('body-parser');


exports.test = (req, res)=>{
    res.send('Greetings from the Author Controller');
};

exports.author_create = (req, res)=>{
    let author = new Author(
        {
            author: req.body.author
        }
    );
    author.save((err)=>{
        if (err){
            return (err);
        }
        res.send('Author Created Successfully')
    })
};

exports.author_details = function (req, res) {
    Author.findById(req.params.id, function (err, product) {
        if (err) return (err);
        res.send(product);
    })
};

exports.getall_authors = function (req,res){
    db.quotes.find({}).then((err, authors)=>{
        if (err) return err;
        res.send("authors");
    });
};

exports.author_update = function (req, res) {
    Author.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Author udpated.');
    });
};

exports.author_delete = function (req, res) {
    Author.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    });
};
