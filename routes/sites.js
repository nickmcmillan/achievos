'use strict';

var express = require('express')
var router = express.Router()
var urls = require('./urls')


// this route accesses the list of achievos, and returns the same list but without the urls
router.get('/', function(req, res) {

	var achievosWithoutUrls = []

	for (var i = 0; i < urls.length; i++) {
		console.log(urls[i]);

		var achievoToPush = {
			title: urls[i].title,
			points: urls[i].points
		}

		achievosWithoutUrls.push(achievoToPush)

	}

	res.send(JSON.stringify(achievosWithoutUrls))

});

module.exports = router;
