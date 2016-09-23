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

	// lets just be careful, make sure we only continue if the query string is a string
	if (typeof req.query.user === 'string') {

		db.loadDatabase(function (err) {

			db.find({ user: req.query.user.toLowerCase() }, function (err, docs) {

				if (!err && docs.length) {

					// send the first result, seeing as you can only have one username, so an array is pointless
					res.json(docs[0]);

				} else {

					res.sendStatus(404);

				}
			})

		});



	} else {
		res.send('That ain\'t working. Supply a user email address, eg db?user=asdf@asdf.com')
	}

});


router.post('/', function(req, res) {

	// check for existing user already
	db.find(req.query, function(err, docs) {

		//console.log('docs', docs);

		if (docs.length) {

			res.sendStatus(302) // 302 FOUND. user already exists

		} else {
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

		}
	})

});

module.exports = router;
