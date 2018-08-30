const Quote = require('../models/quote.model');
const bodyParser = require('body-parser');

//Simple version, No idea but i'm typing
exports.test = (req, res)=>{
    res.send('Greetings from the Test Controller');
};

exports.quote_create = (req, res)=>{
    let quote = new Quote(
        {
            quote: req.body.quote,
            author: req.body.author
        }
    );

    quote.save((err)=>{
        if (err){
            return (err);
        }
        res.send('Product Created Successfully')
    })
};

exports.quote_details = function (req, res) {
    Quote.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

exports.quote_update = function (req, res) {
    Quote.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

exports.quote_delete = function (req, res) {
    Quote.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    });
};