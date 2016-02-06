'use strict';

var express = require('express');
var moment = require('moment');
var bodyParser = require('body-parser');

var app = express();
var activeIp = null;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// var routes = require('./routes.js')(app);
app.get('/', function(req, res) {
  var url = 'http://' + activeIp;
  console.log('GET received. Redirecting to', url);
  res.redirect(url);
});
app.get('/update', function(req, res) {
  activeIp = req.query.ip;
  console.log(moment().format(), 'Update request received. Changing IP to', req.query.ip);
  return res.send('agent: IP updated');
});

var server = app.listen(process.env.PORT || 1104, function () {
    console.log('pingy agent listening on port %s...', server.address().port);
});
