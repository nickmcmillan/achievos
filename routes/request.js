'use strict';

var express = require('express')
var router = express.Router()
var urls = require('./urls')


var Datastore = require('nedb'),
	db = new Datastore({
		filename: './db/yep.json'
	});


router.get('/', function(req, res) {

	if (!req.query.url) {
		res.send('That ain\'t workin. This guy needs a url parameter. Like ?url=zombo.com')
	}

	var user = req.query.user

	var requestQuery = req.query.url.toLowerCase()
	var successfulMatch = urls.filter(function(item) {
		// does the url from the query string... match a string in the db
		return requestQuery.indexOf(item.url.toLowerCase()) >= 0
	})

	if (successfulMatch.length) {

		console.log(successfulMatch);

		//var achievementTitle = successfulMatch[0].title

		var responseObj = {
			//default: !!successfulMatch[0].default,
			title: successfulMatch[0].title,
			//url: successfulMatch[0].url,
			points: successfulMatch[0].points
		}

		db.loadDatabase(function (err) {    // Callback is optional

			db.update({user: user}, {
				$addToSet: {
					achievements: responseObj
				}
			})

		});

		res.send(JSON.stringify(responseObj))

	} else {
		var responseObj = {
			'I caught you a delicious bass': 'Tina come get some ham'
		}
		res.send(JSON.stringify(responseObj))
	}

});

module.exports = router;
