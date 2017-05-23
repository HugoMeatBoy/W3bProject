var bd = require('./bdConnections.js');

var games = {

  getAllGames: function(req,res,callback){
    bd.getGames(function(results){

      if (!results || results == "") {
        res.status(200);
        res.json({
          "status": 200,
          "message": "No games founds"
        });
        return;
      }else{
        if(results=="errorDB"){
          res.status(501);
          res.json({
            "status": 501,
            "message": "Error on database"
          });
          return;
       }
       else {
          if(results){
            res.status(200);
            res.json(results);
          }
        }
      }
    });
  },

  getUserGames: function(req,res,callback){
    bd.getGames(function(results){

      if (!results || results == "") {
        res.status(200);
        res.json({
          "status": 200,
          "message": "No games founds"
        });
        return;
      }else{
        if(results=="errorDB"){
          res.status(501);
          res.json({
            "status": 501,
            "message": "Error on database"
          });
          return;
       }
       else {
          if(results){
            res.status(200);
            res.json(results);
          }
        }
      }
    });
  },

  getGame: function(req,res){},

  addGame: function(req,res){}

}


module.exports = games;
