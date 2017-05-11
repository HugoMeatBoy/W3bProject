  var express  = require('express');
  var morgan = require('morgan');
  var bodyParser = require('body-parser');
  var pg = require('pg');
  var path = require('path');
  var cookie = require('cookie-parser');
  var  html = require('html');
  require('dotenv').load();


  var app  = express();

  app.use(express.static(__dirname + '/public'));
  app.set('view engine', 'html');
    app.set('views', path.join(__dirname + '/views'));
    //app.use(bodyParser.urlencoded({'extended':'true'}));
    //app.use(bodyParser.json());
    //app.use(bodyParser.json({ type: 'application/vnd.api+json' }));





  var ssql = "SELECT * FROM ME WHERE nom='o'";


  app.get('/', function(req, res) {
    res.render('./lol.html');
  });

  app.get('/', function(req, res) {
    query(ssql,function(rows,err){
        if(rows[0] !== undefined) {
          res.status(200);
          res.json({message:"ok"});
        } else {
          res.status(500);
          res.json({message:"no"});
        }
    });
  });




  app.set('port', process.env.PORT);

    var server = app.listen(app.get('port'), function() {
      console.log('Express server listening on port ' + server.address().port);
    });



    var query = function(sql, callback)
    {

      var connectionString = "tcp://uakurcnvemamzx:60b9a5fcc117bfdd08ffdf3a933c3bc1ee9e2f2cb46f83ae98f3ab602758ceac@ec2-174-129-223-193.compute-1.amazonaws.com:5432/d2knvek1s99515";
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
