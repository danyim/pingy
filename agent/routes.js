'use strict';

var appRouter = function(app) {
  app.get('/', function(req, res) {
    res.send('Hello World');
  });
  app.post('/ip', function(req, res) {
    console.log('POST received', req.url);
    return res.send('ok!');
  });
  app.get('/update', function(req, res) {
    console.log('GET received', req.query.ip);
    return res.send('ok!');
  });
}

module.exports = appRouter;
