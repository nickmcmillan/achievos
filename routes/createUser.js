'use strict';

// express
var express = require('express');
var router = express.Router();

// database
var Datastore = require('nedb'),
    db = new Datastore({
        filename: './db/yep.json',
        autoload: true // You can issue commands right away
    });




router.get('/', function(req, res) {

    if (req.query.user) {

        db.find({ user: req.query.user }, function (err, docs) {

          if (!err && docs.length) {

            res.json(docs);

          } else {

            res.send('no results')

          }
        });

    } else {
        res.send('supply a user')
    }

});



router.post('/', function(req, res) {

    db.insert(req.query, function (err, newDoc) {
        // newDoc is the newly inserted document, including its _id

        if (err) {
            res.send('err');
        } else {

            res.send(newDoc)

        }

    });

});

module.exports = router;
