'use strict';

var request = require('request');
var moment = require('moment');
var configs = require('./configs.js');

var storedIp = '';

init();

function init() {
  console.log('pingy pinger started, checking every', configs.PING_INTERVAL/1000, 's');
  setInterval(function() {
    getMyIP(storedIp);
  }, configs.PING_INTERVAL);
}

// Grabs the external IP from the provider and sends the value if it's different from the last
function getMyIP (ip) {
  request(configs.IP_PROVIDER_URL, function(error, response, body) {
    // console.log('stored ip is', storedIp);
    if (!error && response.statusCode == 200 && body != ip) {
      sendIP(body);
    }
  }).end();
}

function sendIP(ip) {
  request(configs.DEST_URL + '/update?ip=' + ip, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(moment().format(), '\tUpdate sent! IP changed from', storedIp, 'to', ip);
      storedIp = ip;
    }
  }).end();
}
