'use strict';

var express = require('express');
var moment = require('moment');
var bodyParser = require('body-parser');

var app = express();
var storedIP = null;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  if(storedIP) {
    var url = 'http://' + storedIP;
    console.log('GET received; redirecting to', url);
    res.redirect(url);
  }
  else {
    res.send('');
    console.log('GET received but IP is null');
  }
});
app.get('/current', function(req, res) {
  return res.send(storedIP);
});
app.get('/update', function(req, res) {
  storedIP = req.query.ip;
  console.log(moment().format(), '-- Update request received; changing IP to', req.query.ip);
  return res.send('success');
});

var server = app.listen(process.env.PORT || 80, function () {
    console.log('[pingy agent started] Listening on port %s...', server.address().port);
});
