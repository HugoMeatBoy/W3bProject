/**

Speerun request receiver

**/

var bd = require('./bdConnections.js');


var speedrun = {

    /* Get datas to setup the run */
    setRun: function(req,res,callback){

      var user = req.params.idUser;
      var category = req.params.cat;

      if(category != "" && user != ""){

        bd.setSpeedrun(category,user,function(results){

          if (!results || results == "") {
            res.status(200);
            res.json({
              "status": 200,
              "message": "Create a split before start"
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
      }else{
        if(results=="errorDB"){
          res.status(401);
          res.json({
            "status": 401,
            "message": "Error on inputs"
          });
          return;
        }
      }
    },//setRun()


    /*  Save a run */
    newRun: function(req,res,callback){


        var category = req.body.cat;
        var user = req.body.user;
        var splitsSelection = req.body.splits || "";
        var game = req.body.gameName || "";
        var dateRun = req.body.date || "";
        var time = req.body.time || "";
        var splitsTime = req.body.splitsRun || "";

        if(category != "" && user != "" && game != "" && dateRun != "" && splitsSelection != "" && time != "" && splitsTime != ""){


          bd.saveSpeedrun(splitsSelection,category,game,user,dateRun,time,splitsTime,function(results){

            console.log(results);
              if(results=="errorDB"){
                res.status(501);
                res.json({
                  "status": 501,
                  "message": "Error on database"
                });
                return;
             }
             else {
                res.status(200);
                res.json({
                  "status": 200,
                  "message": "Saved run"
                });
                return;
              }

              });
          }else{
              res.status(401);
              res.json({
                "status": 401,
                "message": "Error missing datas"
              });
              return;
          }

    },//postRun()

    /* Add a set of splits for a category of speedrun */
    addSplits: function(req,res,callback){
          var splits = req.body.splits || "";
          var cat = req.body.cat || "";

          if(splits != ""){
              bd.newSplits(cat,splits,function(results){


                  if(results!="errorDB"){
                    res.status(200);
                    res.json({
                      "status": 200,
                      "message": "NEW SPLITS"
                    });
                    return;
                  }else{
                    res.status(500);
                    res.json({
                      "status": 500,
                      "message": "Error on db"
                    });
                    return;
                  }

              });
          }

    },//addSplits()


    /* Get the best time of a player on a category */
    getPB: function(req,res,callback){
          var user = req.params.idU || "";
          var cat = req.params.idcat || "";

          if(user != "" && cat != ""){
              bd.getPBSpeedrun(user,cat,function(results){

                  if(results!="errorDB"){
                    res.status(200);
                    res.json(results);
                    return;
                  }else{
                    res.status(500);
                    res.json({
                      "status": 500,
                      "message": "Error on db"
                    });
                    return;
                  }

              });
          }

    },//getPB()

}


module.exports = speedrun;
