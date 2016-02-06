'use strict';

var request = require('request');
var moment = require('moment');
var configs = require('./configs.js');

var storedIp = '';

init();

function init() {
  setInterval(function() {
    getMyIP(storedIp);
  }, configs.PING_INTERVAL);
}

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
