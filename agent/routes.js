'use strict';

var appRouter = function(app) {
  app.get('/', function(req, res) {
    res.send('Hello World');
  });
  app.post('/', function(req, res) {
    console.log('received', req);
    return res.send('ok!');
  });
  // app.get('/account', function(req, res) {
  //   var accountMock = {
  //     'username': 'nraboy',
  //     'password': '1234',
  //     'twitter': '@nraboy'
  //   }
  //   if(!req.query.username) {
  //     return res.send({'status': 'error', 'message': 'missing username'});
  //   } else if(req.query.username != accountMock.username) {
  //     return res.send({'status': 'error', 'message': 'wrong username'});
  //   } else {
  //     return res.send(accountMock);
  //   }
  // });
}

module.exports = appRouter;
