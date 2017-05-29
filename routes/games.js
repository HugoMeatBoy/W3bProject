/**

Routing of the requests on games

**/
var bd = require('./bdConnections.js');

var games = {


  /** All datas of all games */
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
            return;
          }
        }
      }
    });
  },//getALlGames()


  /* Datas of games runned by the player */
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
              return;
            }
          }
        }
      });
    }
  },//getUserGames()


  /* Add a new runned game to a member */
  addUserGame: function(req,res,callback){

    var user = req.params.id;
    var cat = req.body.categorie;
    var game = req.body.game;

    if(user != "" && cat != "" && game != ""){
      bd.newUserGame(user,cat,game,function(results){

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

          }else{
            if(results){
              res.status(200);
              res.json(results);
              return;
            }
          }
        }
      });
    }
  },//addUserGames()



  /* Add a game to DB */
  addGame: function(req,res,callback){
    var nameGame = req.body.name;
    var typeGame = req.body.type;
    var descGame = req.body.desc;

    if(nameGame != "" && typeGame != ""){
      if(descGame == ""){
        descGame = "NULL";
      }
      bd.newGame(nameGame,typeGame,descGame,function(results){
        if(results=="errorDB"){
          res.status(400);
          res.json({
            "status": 400,
            "message": "Game already exists !"
          });
        }
        else {
            if(results){
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

  },//addGame()


  /* Add a category to a game on DB */
  addCategory: function(req,res,callback){
      var nameGame = req.params.nameGame;
      var nameCat = req.body.nameC;
      var descCat = req.body.desc;

      if(nameGame != "" && nameCat != ""){
        if(descCat == "undefined" || descCat == ""){
          descCat = "";
        }
        bd.newCategory(nameGame,nameCat,descCat,function(results){
          if(results=="errorDB"){
            res.status(400);
            res.json({
              "status": 400,
              "message": "Category already exists !"
            });
          }
          else {
              if(results){
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

    },//addCategory()


    /* Get all games set up by a category */
  getRunnedGames:function(req,res,callback){

    bd.getRunGames(function(results){

      if (!results || results == "") {
        res.status(400);
        res.json({
          "status": 400,
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
            return;
          }
        }
      }
    });
  },//getRunnedGames()

}


module.exports = games;
