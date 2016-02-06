'use strict';

var request = require('request');
var moment = require('moment');
var configs = require('./configs.js');

var storedIP;

var app = init();

function init() {
  console.log('[pingy pinger started] Ping interval set to', configs.PING_INTERVAL/1000 + '/sec');

  storedIP = null;

  checkCurrentIP();
  setInterval(function() {
    getExternalIP(storedIP);
  }, configs.PING_INTERVAL);
}

function checkCurrentIP() {
  request(configs.DEST_URL + '/current', function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Agent at', configs.DEST_URL, 'reports the current IP is', body);
      storedIP = body;
    }
  }).end();
}

// Grabs the external IP from the provider and sends the value if it's different from the last
function getExternalIP(ip) {
  request(configs.IP_PROVIDER_URL, function(error, response, body) {
    if (!error && response.statusCode == 200 && body != ip) {
      sendIP(body);
    }
  }).end();
}

function sendIP(ip) {
  request(configs.DEST_URL + '/update?ip=' + ip, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(moment().format(), '-- Updated IP from', storedIP, 'to', ip, '(response: ' + body + ')');
      storedIP = ip;
    }
  }).end();
}
