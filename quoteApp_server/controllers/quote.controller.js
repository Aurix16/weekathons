const Quote = require('../models/quote.model');
const Author = require('../models/author.model');
const bodyParser = require('body-parser');

//Simple version, No idea but i'm typing
exports.test = (req, res)=>{
    res.send('Greetings from the Test Controller');
};

exports.quote_all = (req, res) => {
    Quote.find({},{_id:0}).then((quotes, err)=>{
        if (err) return err;
        res.send(quotes);
    }).catch(e => {console.log("catch error",e)});
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
        if (err) return (err);
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

exports.get_quotes_by_author_name = (req, res)=>{
    Quote.find({author:req.params.name}, function(err, quotes){
        if (err) return next(err);
        res.send(quotes);
    });
};

exports.get_quotes_by_author_id = (req, res)=>{
    Quote.find({author:req.params.id}, function(err, quotes){
        if (err) return next(err);
        res.send(quotes);
    });
};