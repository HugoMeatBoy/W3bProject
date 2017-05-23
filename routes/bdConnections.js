var pg = require('pg');

var conString = process.env.DB_ACCESS;


var bd = {

    registration: function(user,passwordCry,callback){
      pg.connect(conString, function(err, client, done) {
         if(err) {
           return console.error('error fetching client from pool', err);

         }


         var sql = "INSERT INTO membre VALUES(4,\'"+user+"\',\'"+passwordCry+"\');";

         client.query(sql,  function(err, result) {
           //call `done()` to release the client back to the pool
           done();

           if(err) {

             callback("errorDB");
             return;
           }else {

             callback("OK");
             return;
          }
         });
      });
    },

    authentication: function(user,password,callback){
      pg.connect(conString, function(err, client, done) {
         if(err) {
           return console.error('error fetching client from pool', err);

         }


         var sql = "SELECT * FROM membre WHERE pseudoMembre=\'"+ user +"\' AND passwordMembre = \'"+password+"\';";

         client.query(sql,  function(err, result) {
           //call `done()` to release the client back to the pool
           done();

           if(err) {
             callback("errorDB");
             return;
           }else {

             callback(result.rows);
             return;
          }
         });
      });


    },//authentication()

    getGames: function(callback){
      pg.connect(conString, function(err, client, done) {
         if(err) {
           return console.error('error fetching client from pool', err);

         }


         var sql = "SELECT DISTINCT ON (jeu.idjeu) jeu.idjeu, nomjeu, nomcategorie FROM jeu,categorie WHERE jeu.idjeu=categorie.idjeu ORDER BY jeu.idjeu, nomjeu;";
         console.log(sql);
         client.query(sql,  function(err, result) {
           done();

           if(err) {
             console.log(err);
             callback("errorDB");
             return;
           }else {

             callback(result.rows);
             return;
          }
         });
    });
  }, //getGames()

  userGames: function(user,callback){
    pg.connect(conString, function(err, client, done) {
       if(err) {
         return console.error('error fetching client from pool', err);

       }


       var sql = "SELECT * FROM jeu,jeuspeedrun WHERE jeu.idJeu = jeuspeedrun.idJeu AND idmembre="+ user +";";
       console.log(sql);
       client.query(sql,  function(err, result) {
         done();

         if(err) {
           callback("errorDB");
           return;
         }else {
           console.log(result.rows);
           callback(result.rows);
           return;
        }
       });
  });
} //getGames()

}

module.exports = bd;
