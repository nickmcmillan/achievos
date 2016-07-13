'use strict';

var express = require('express')
var router = express.Router()
var urls = require('./urls')

// database
var Datastore = require('nedb'),
    db = new Datastore({
        filename: './db/database.json',
        autoload: true // You can issue commands right away
    });


var pushToDb = function(userDetail, achievoId) {

	console.log(userDetail);

	db.update()

	db.insert(req.query, function (err, newDoc) {
        // newDoc is the newly inserted document, including its _id

        if (err) {
            res.send('err');
        } else {
            // pass in 'true' so that sendDB only sends the client 1 new item,
            // otherwise when 1 new item is added to the db, 10 will be served to the client. oops.
            res.send(newDoc)

        }

    });
}

router.get('/', function(req, res) {

	if (!req.query.url) {
		res.send('That ain\'t workin. This guy needs a url parameter. Like ?url=zombo.com')
	}
	if (req.query.user) {

	}

	var requestQuery = req.query.url.toLowerCase()
	var successfulMatch = urls.filter(function(item) {
		// does the url from the query string... match a string in the db
		return requestQuery.indexOf(item.url.toLowerCase()) >= 0
	})

	if (successfulMatch.length) {

		var responseObj = {
			default: !!successfulMatch[0].default,
			title: successfulMatch[0].title,
			url: successfulMatch[0].url,
			points: successfulMatch[0].points
		}

		// push the success into the users db

		res.send(JSON.stringify(responseObj))

	} else {
		var responseObj = {
			'I caught you a delicious bass': 'Tina come get some ham'
		}
		res.send(JSON.stringify(responseObj))
	}

});

module.exports = router;
