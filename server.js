  var express  = require('express');
  var morgan = require('morgan');
  var bodyParser = require('body-parser');
  var pg = require('pg');
  var path = require('path');
  var cookie = require('cookie-parser');
  require('dotenv').load();


  var app  = express();




  app.get('/', function(req, res) {
      res.status(200);
      res.send("OK");
  });


  app.set('port', process.env.PORT);

    var server = app.listen(app.get('port'), function() {
      console.log('Express server listening on port ' + server.address().port);
    });
