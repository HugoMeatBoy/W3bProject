  var express  = require('express');
  var morgan = require('morgan');
  var bodyParser = require('body-parser');
  var pg = require('pg');
  var path = require('path');
  var cookie = require('cookie-parser');
  var html = require('html');
  var ejs = require('ejs');
  //var helmet = require('helmet')
  require('dotenv').load();


  var app  = express();







  app.use(express.static(__dirname + '/public'));
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.set('views', __dirname + '/public/views');

  //app.use(helmet());



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


    app.all('/*', [require('./middlewares/tokenControl.js')]);

    app.use('/', require('./routes/index.js'));

    var html = "OH";

/*

    app.get('/a', function(req, res) {
      query(ssql,function(rows,err){
          if(rows === undefined) {

            res.status(500);
            res.json({message:err});
          } else {
            res.status(200);
            var data = {message:"ok",
                          test:"no"};
              res.render('index', function(err, data) {
                res.send(data);
              });

          }
      });
    });
*/







/*
  app.use(function(req, res, next) {
    res.status(404);
    res.render("Err 404");
  });
*/

  app.set('port', process.env.PORT);

    var server = app.listen(app.get('port'), function() {
      console.log('Express server listening on port ' + server.address().port);
    });



    var query = function(sql, callback)
    {

      var connectionString = process.env.DB_ACCESS;
      pg.defaults.ssl = true;
      pg.connect(connectionString, function(error, client, done) {
        // Problème de connexion à la BD
        if(error) {
          console.error('Connexion à la base de donnée impossible',error);
          var error = new Error("Connexion à la base de donnée impossible");
          error.http_code = 500;
          return callback(null,error);
        }
        client.query(sql,function(error, result){
          //On ferme la connexion
          client.end();
          if(error){
            console.error('La requête a retournée une erreur',error);
            var error = new Error("La requête a retournée une erreur");
            error.http_code = 400;
            return callback(null,error);
          }
          // Pas d'erreur
          callback(result.rows,null);
          return;
        });
      });
    };
