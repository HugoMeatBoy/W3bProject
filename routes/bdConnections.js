var pg = require('pg');


var conString = process.env.DATABASE_URL;


var bd = {

    registration: function(user,passwordCry,callback){
      pg.connect(conString, function(err, client, done) {
         if(err) {
           return console.error('error fetching client from pool', err);

         }


         var sql = "INSERT INTO membre (pseudomembre,passwordmembre) VALUES(\'"+user+"\',\'"+passwordCry+"\');";

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
             console.log("ok");
             callback(result.rows);
             return;
          }
         });
      });


    },//authentication()



    /*** GAMES ***/

    getGames: function(callback){
      pg.connect(conString, function(err, client, done) {
         if(err) {
           return console.error('error fetching client from pool', err);

         }

         var sql = "SELECT nomjeu FROM jeu ORDER BY nomjeu;";

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
  }, //getGames()

  getRunGames: function(callback){
    pg.connect(conString, function(err, client, done) {
       if(err) {
         return console.error('error fetching client from pool', err);

       }

       var sql = "SELECT nomjeu, nomcategorie, idcategorie, descriptionjeu, descriptioncategorie FROM jeu,categorie WHERE jeu.idjeu=categorie.idjeu ORDER BY nomjeu;";

          client.query(sql,  function(err, result) {
         done();

         if(err) {
           console.log(err);
           callback("errorDB");
           return;
         }else {
            console.log(result.rows);
           callback(result.rows);
           return;
        }
       });
     });
  }, //getRunGames()

  userGames: function(user,callback){
    pg.connect(conString, function(err, client, done) {
       if(err) {
         return console.error('error fetching client from pool', err);

       }


       var sql = "SELECT nomjeu, nomcategorie, categorie.idcategorie, descriptioncategorie FROM jeu,jeuspeedrun,categorie WHERE jeu.idjeu=categorie.idjeu AND categorie.idcategorie=jeuspeedrun.idcategorie AND idmembre="+ user +" ORDER BY nomjeu;";
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
},//userGames()

  newUserGame: function(user,cat,game,callback){
    pg.connect(conString, function(err, client, done) {
       if(err) {
         return console.error('error fetching client from pool', err);

       }

       var sql = "INSERT INTO jeuspeedrun VALUES ("+user+",(SELECT idcategorie FROM categorie,jeu WHERE nomjeu=\'"+game+"\' AND nomcategorie=\'"+cat+"\' AND categorie.idjeu=jeu.idjeu));";
       console.log(sql);
       client.query(sql, function(err, result) {
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
  },//newUserGame()

    newGame: function(name,type,desc,callback){
      pg.connect(conString, function(err, client, done) {
         if(err) {
           return console.error('error fetching client from pool', err);

         }


         var sql = "INSERT INTO jeu (nomjeu,typejeu,descriptionjeu) VALUES(\'"+name+"\',\'"+type+"\',\'"+desc+"\');";

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
    },//newGame

    newCategory: function(nameG,nameC,desc,callback){
      pg.connect(conString, function(err, client, done) {
         if(err) {
           return console.error('error fetching client from pool', err);

         }

         var sql = "INSERT INTO categorie (idjeu,nomcategorie,descriptioncategorie) VALUES((SELECT idjeu FROM jeu WHERE nomjeu=\'"+nameG+"\'),\'"+nameC+"\',\'"+desc+"\');";

         client.query(sql,  function(err, result) {
           //call `done()` to release the client back to the pool
           done();

           if(err) {
             console.log(err);

             callback("errorDB");
             return;
           }else {

             callback("OK");
             return;
          }
         });
      });
    },//newGame





    /******* SPEEDRUN ***********/

    setSpeedrun: function(cat,user,callback){
      pg.connect(conString, function(err, client, done) {
         if(err) {
           return console.error('error fetching client from pool', err);

         }
         var sql = "SELECT s.idsplits, datasplits FROM splits AS s,categorie AS c WHERE s.idcategorie=c.idcategorie AND c.idcategorie="+cat+";";


         client.query(sql,  function(err, result) {
           //call `done()` to release the client back to the pool
           done();

           if(err) {
             console.log(err);
             callback("errorDB");
             return;
           }else {
             console.log(result.rows);
             callback(result.rows);
             return;
          }
         });
      });
    },


    saveSpeedrun: function(splits,idcat,game,idUser,date,time,splitsTimes,callback){

      pg.connect(conString, function(err, client, done) {
         if(err) {
           return console.error('error fetching client from pool', err);

         }
         var sql ="INSERT INTO run (idsplits,idcategorie,idjeu,idmembre,daterun,finaltime,datafinaltimes) VALUES((SELECT idsplits FROM splits WHERE datasplits = \'"+splits+"\' AND idcategorie = \'"+idcat+"\'),\'"+idcat+"\',(SELECT idjeu FROM jeu WHERE nomjeu=\'"+game+"\'),\'"+idUser+"\',\'"+date+"\',"+time+",\'"+splitsTimes+"\');";

         client.query(sql,  function(err, result) {
           //call `done()` to release the client back to the pool
           done();

           if(err) {
             console.log(err);
             callback("errorDB");
             return;
           }else {

             callback("OK");
             return;
          }
         });



    });
  },

    getPBSpeedrun: function(user,cat,callback){
      pg.connect(conString, function(err, client, done) {
         if(err) {
           return console.error('error fetching client from pool', err);

         }
         var sql ="SELECT min(finaltime),datafinaltimes FROM run WHERE idmembre="+user+" AND idcategorie="+cat+" GROUP BY finaltime,datafinaltimes;";

         client.query(sql,  function(err, result) {
           //call `done()` to release the client back to the pool
           done();

           if(err) {
             console.log(err);
             callback("errorDB");
             return;
           }else {
             console.log(result.rows);
             callback(result.rows);
             return;
          }
         });
      });
    },

/*
    getWRSpeedrun: function(cat,callback){
      pg.connect(conString, function(err, client, done) {
         if(err) {
           return console.error('error fetching client from pool', err);

         }
         var sql = "SELECT finaltime, idmembre FROM run WHERE run.idcategorie="+cat+" AND finaltime>(SELECT finaltime FROM run);";

         client.query(sql,  function(err, result) {
           //call `done()` to release the client back to the pool
           done();

           if(err) {
             console.log(err);
             callback("errorDB");
             return;
           }else {
             console.log(result.rows);
             return;
          }
         });
      });
    },
*/
    newSplits: function(cat,splitsList,callback){
      pg.connect(conString, function(err, client, done) {
         if(err) {
           return console.error('error fetching client from pool', err);

         }
         var sql = "INSERT INTO splits (idCategorie,datasplits) VALUES ("+cat+",\'"+splitsList+"\');";

         client.query(sql,  function(err, result) {
           //call `done()` to release the client back to the pool
           done();

           if(err) {
             console.log(err);
             callback("errorDB");
             return;
           }else {
             callback("OK");
             return;
          }
         });
      });
    }
}

module.exports = bd;
