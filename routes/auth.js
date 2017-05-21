var jwt = require('jwt-simple');
var pg = require('pg');


var key = process.env.ENCODING_KEY;
var conString = process.env.DB_ACCESS;

var auth = {


   login: function(req,res,callback){
     var user = req.body.username || "";
     var password = req.body.password || "";


     if(user && password){
       auth.authentication(user,password,function(results){

          if (!results || results == "") { 
            res.status(401);
            res.json({
              "status": 401,
              "message": "Invalid inputs"
            });
            return;
          }
          else {

            if(results=="errorDB"){
              res.status(501);
              res.json({
                "status": 501,
                "message": "Error on database"
              });
              return;
            }
            else {
              if (results) {
                var d = new Date();
                var time = d.getTime();
                res.status(200);
                res.json(genToken(results.idme,time));
              }
            }
          }
        });
      }else{
       res.status(401);
       res.json({
         "status": 401,
         "message": "Missing inputs"
       });
     }



  },

  authentication: function(user,password,callback){
    pg.connect(conString, function(err, client, done) {
       if(err) {
         return console.error('error fetching client from pool', err);

       }


       var sql = "SELECT * FROM ME WHERE nom=\'"+ user +"\';";

       client.query(sql,  function(err, result) {
         //call `done()` to release the client back to the pool
         done();

         if(err) {
           callback("errorDB ");
           return;
         }else {

           callback(result.rows);
           return;
        }
       });
    });
  },


  getUser: function(req,res){},

  welcome: function(req,res){
      res.status(200).send("Okay");
  }

}






function genToken(user,time) {
  var expires = expiresIn(1); // 1 day
  var token = jwt.encode({
    exp: expires,
    user: user,
    time: time
  },key);

  return {
    token: token,
    expires: expires,
    user: user
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;
