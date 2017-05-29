/*


NodeJS server with Express.js Framework


*/


/* Setup node modules */
  var express  = require('express');
  var morgan = require('morgan');
  var bodyParser = require('body-parser');
  var pg = require('pg');
  var path = require('path');
  var cookie = require('cookie-parser');
  var html = require('html');
  var ejs = require('ejs');

  require('dotenv').load();
  var CryptoJS = require("crypto-js");



  var app  = express();





  app.use(morgan('dev'));//Dev tool writing received requests


    /* Client data routing & setup */
  app.use(express.static(__dirname + '/public'));
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.set('views', __dirname + '/public/views');

  app.use(bodyParser.urlencoded({'extended':'true'}));
  app.use(bodyParser.json());
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


  //Configuration CORS - Header HTTP/Requetes Multi-Origines
  app.all('/*', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
      if (req.method == 'OPTIONS') {
        res.status(200).end();
      } else {
        next();
      }
    });


  /* Token Check Up */
  app.all('/api/*', [require('./middlewares/tokenControl.js')]);

  /* Routing */
  app.use('/', require('./routes/index.js'));




  /* STarting server */
  app.set('port', process.env.PORT);

    var server = app.listen(app.get('port'), function() {
      console.log('Express server listening on port ' + server.address().port);
    });
