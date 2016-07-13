'use strict';

// express
var express = require('express');
var router = express.Router();

// database
var Datastore = require('nedb'),
    db = new Datastore({
        filename: './db/yep.json',
		autoload: true
    });


router.get('/', function(req, res) {

	if (req.query.user) {

		db.find({ user: req.query.user }, function (err, docs) {

			if (!err && docs.length) {

				res.json(docs);

			} else {

				res.send('no results')

			}
		})

	} else {
		res.send('supply a user')
	}

});


router.post('/', function(req, res) {

	// check for existing user already
	db.find(req.query, function(err, docs) {

		if (!docs.length) {
			//console.log('looks fresh, lets add it')

			// add an array to store the achievements on each user
			req.query.achievements = []

			db.insert(req.query, function (err, newDoc) {

				if (err) {
					res.send(err);
				} else {
					res.send(newDoc)
				}

			});

		} else {
			res.sendStatus(302) // 302 FOUND. user already exists
		}
	})

});

module.exports = router;
