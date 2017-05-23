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


         var sql = "SELECT * FROM jeu;";
         console.log(sql);
         client.query(sql,  function(err, result) {
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
  }
}

module.exports = bd;
