'use strict';

var express = require('express')
var router = express.Router()
var urls = require('./urls')


var Datastore = require('nedb'),
	db = new Datastore({
		filename: './db/yep.json'
	});

router.get('/', function(req, res) {

	db.loadDatabase(function (err) {

		db.find({}, function (err, docs) {

			res.send(JSON.stringify(docs))

		});

	});

});

module.exports = router;
