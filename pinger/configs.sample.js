'use strict';

var configs = {
  PING_INTERVAL: 1000 * 60 * 60, // ms * s * h = every hour
  IP_PROVIDER_URL: 'http://canihazip.com/s',
  DEST_URL: 'https://<your heroku app name>.herokuapp.com'
};

module.exports = configs;
