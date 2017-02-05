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

    //console.log('suc', successfulMatch);

    if (successfulMatch.length) {

        //console.log(successfulMatch);

        //var achievementTitle = successfulMatch[0].title

        var responseObj = {
            title: successfulMatch[0].title,
            url: successfulMatch[0].url,
            points: successfulMatch[0].points
        }



        db.loadDatabase(function (err) {

            if (user) {
                // first load up the given user
                db.find({ user: user }, function(err, docs) {

                    console.log(user);

                    // make sure that user exists
                    if (docs.length) {

                        var found = false;
                        for (var i = 0; i < docs[0].achievements.length; i++) {
                            if (docs[0].achievements[i].url === responseObj.url) {
                                found = true;
                                break;
                            }
                        }

                        // only add it if the user hasn't already got it
                        if (!found) {
                            db.update({user: user}, {
                                $addToSet: {
                                    achievements: responseObj
                                }
                            })
                        //    console.log('new', responseObj.url);
                            res.send(JSON.stringify(responseObj))
                        } else {
                        //    console.log('got', responseObj.url);
                            res.send({})
                        }

                    }

                })

            } else {
                //console.log('not logged in, but got points');
                res.send(JSON.stringify(responseObj))
            }



        });


    } else {
        //var responseObj = 'Not Achievos worthy ¯\\_(⊙︿⊙)_/¯'
        res.send({})
    }

});

module.exports = router;
