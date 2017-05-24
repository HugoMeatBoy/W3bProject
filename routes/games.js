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
          bd.errorDB();
       }
       else {
          if(results){
            res.status(200);
            res.json(results);
            return;
          }
        }
      }
    });
  },

  getUserGames: function(req,res,callback){

    var user = req.params.id;
    if(user != ""){
      bd.userGames(user,function(results){

        if (!results || results == "") {
          res.status(200);
          res.json({
            "status": 200,
            "message": "No games founds"
          });
          return;
        }else{
          if(results=="errorDB"){
            bd.errorDB();
         }
         else {
            if(results){
              res.status(200);
              res.json(results);
              return;
            }
          }
        }
      });
    }
  },



  addGame: function(req,res,callback){
    var nameGame = req.body.name;
    var typeGame = req.body.type;
    var descGame = req.body.desc;

    if(nameGame != "" && typeGame != ""){
      if(descGame == ""){
        descGame = "NULL";
      }
      console.log("ok1");
      bd.newGame(nameGame,typeGame,descGame,function(results){
        console.log("ok2");
        if(results=="errorDB"){
          bd.errorDB();
        }
        else {
            if(results){
              console.log("ok3");
              res.status(201);
              return;
            }
        }
      })

    }else{
      res.status(400);
      res.json({
        "status": 400,
        "message": "Invalid inputs"
      });
      return;
    }

  },
  getGame: function(req,res){}


}


module.exports = games;
