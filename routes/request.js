'use strict';

var express = require('express');
var router = express.Router();
var urls = require('./urls');

router.get('/', function(req, res) {

	var requestQuery = req.query.url.toLowerCase()
	var successfulMatch = urls.filter(function(item) {
		// does the url from the query string... match a string in the db
		return requestQuery.indexOf(item.url.toLowerCase()) >= 0
	})

	if (successfulMatch.length) {

		var responseObj = {
			title: successfulMatch[0].title,
			url: successfulMatch[0].url,
			points: successfulMatch[0].points
		}

		res.send(JSON.stringify(responseObj))

	} else {
		var responseObj = {
			'I caught you a delicious bass': 'Tina come get some ham'
		}
		res.send(JSON.stringify(responseObj))
	}

});

module.exports = router;
