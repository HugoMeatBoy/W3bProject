var bd = require('./bdConnections.js');


var speedrun = {
  setRun: function(req,res,callback){

    var category = req.params.idCat;


    console.log(category);

    if(category != ""){
      bd.setSpeedrun(category,function(results){

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

  chooseRun: function(req,res){},

  postRun: function(req,res){},

  addSplits: function(req,res){}
}


module.exports = speedrun;
