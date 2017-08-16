/* eslint-disable*/
var express = require('express');
var React = require('react');
var renderToString = require('react-dom/server');

var App = require('./app');
var template = require('./template');

const server = express();

server.use('/assets', express.static('assets'));

server.get('/', (req, res) => {
  const isMobile = true;
  const initialState = { isMobile };
  const appString = renderToString(<App {...initialState} />);

  res.send(template({
    body: appString,
    title: 'Hello World from the server',
    initialState: JSON.stringify(initialState)
  }));
});

server.listen(8080);
console.log('listening');
