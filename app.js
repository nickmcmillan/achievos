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

// handle requests for resources to be served from the public folder
app.use('/build', express.static(path.join(__dirname, 'build')));


var routes = require('./routes/index');
var request = require('./routes/request');
var db = require('./routes/db');
var all = require('./routes/all');


app.use('/', routes);
app.use('/request', request);
app.use('/db', db);
app.use('/all', all);


var env = {
  production: process.env.NODE_ENV === 'production'
};

app.get('/', function(req, res) {
  res.render('index', {
    env: env
  });
});


app.set('port', process.env.PORT || 8081);

app.listen(app.get('port'), function() {
  console.log('Express server started on port: ' + app.get('port'));
});


module.exports = app;
