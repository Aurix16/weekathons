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

exports.author_details = (req, res) => {
    Author.findById(req.params.id, function (err, product) {
        if (err) return (err);
        res.send(product);
    })
};

exports.author_all = (req, res) => {
    Author.find({},{_id:0}).then((authors, err)=>{
        if (err) return err;
        res.send(authors);
    }).catch(e => {console.log("catch error",e)});
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

exports.get_author_id = (req, res) => {
    Author.find({author:req.params.name}, function(err, author){
        if (err) return next(err);
        res.send(author[0]._id);
    });
};