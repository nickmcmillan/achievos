'use strict';

var fs = require('fs');
var path = require('path');

//var objectAssign = require('object-assign');

var express = require('express');
var path = require('path');
var app     = express();

var compress = require('compression');
var layouts = require('express-ejs-layouts');

app.set('layout');
app.set('view engine', 'ejs');
app.set('view options', {layout: 'layout'});
app.set('views', path.join(process.cwd(), '/views'));

app.use(compress());
app.use(layouts);

app.use(express.static('public'));

app.disable('x-powered-by');
//var favicon = require('serve-favicon');
//app.use(favicon(__dirname + '/public/img/favicon.ico'));

// handle request for the root to load from views
app.use('/', express.static(path.join(__dirname, 'views')));
app.use('/img', express.static(path.join(__dirname, 'img')));

// handle requests for resources to be served from the public folder
app.use('/build', express.static(path.join(__dirname, 'build')));


var routes = require('./routes/index');
var request = require('./routes/request');
var db = require('./routes/db');
var users = require('./routes/users');
var sites = require('./routes/sites');


app.use('/', routes);
app.use('/request', request);
app.use('/db', db);
app.use('/users', users);
app.use('/sites', sites);


var env = {
  production: process.env.NODE_ENV === 'production'
};

app.get('/', function(req, res) {
  res.render('layout', {
    env: env
  });
});


app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
  console.log('Express server started on port: ' + app.get('port'));
});



/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



module.exports = app;
