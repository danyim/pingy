'use strict';

var configs = require('./configs.js');
var http = require('http');
var querystring = require('querystring');


init();

function init() {
  // while(true) {
    setTimeout(function() {
      var ip = getMyIP();
      sendIP(ip);
    }, configs.PING_INTERVAL);
  // }
}

function getMyIP () {
  var cb = function(response) {
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });

    // the whole response has been recieved, so we just print it out here
    response.on('end', function () {
      console.log(str);
      return str;
    });
  }
  http.get(configs.IP_PROVIDER_URL, cb).end();
}

function sendIP(ip) {
  var postData = querystring.stringify({
    ip: ip
  });

  var options = {
    hostname: configs.DEST_URL,
    port: 1104,
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length
    }
  };

  var req = http.request(options, function(res) {
    // console.log(`STATUS: ${res.statusCode}`);
    // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    // res.on('data', (chunk) => {
      // console.log(`BODY: ${chunk}`);
    // });
    // res.on('end', () => {
      // console.log('No more data in response.')
    // })
  });

  req.on('error', function(e) {
    // console.log(`problem with request: ${e.message}`);
  });

  // write data to request body
  req.write(postData);
  req.end();
  // http.post(configs.IP_PROVIDER_URL, function() {
  //   console.log('done with post');
  // }).end();
}
