'use strict';

var express = require('express');
var moment = require('moment');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// var routes = require('./routes.js')(app);
app.get('/', function(req, res) {
  res.send('Nothing to see here...');
});
app.get('/update', function(req, res) {
  console.log(moment().format(), 'Update request received. Changing IP to', req.query.ip);
  return res.send('ok!');
});

var server = app.listen(1104, function () {
    console.log('pingy agent istening on port %s...', server.address().port);
});
