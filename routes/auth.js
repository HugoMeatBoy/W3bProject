var jwt = require('jwt-simple');
var pg = require('pg');
var CryptoJS = require("crypto-js");



var key = process.env.ENCODING_KEY;
var krypt = process.env.CRYPT_KEY;
var conString = process.env.DB_ACCESS;

var auth = {


    /******* LOGIN *********/

   login: function(req,res,callback){
     var user = req.body.username || "";
     var password = req.body.password || "";


     if(user && password){

       var passwordCrypt = CryptoJS.HmacSHA1(password, krypt);

       auth.authentication(user,passwordCrypt,function(results){


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



  },//login()

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




  /****** Sign Up *******/

  signUp: function(req,res,callback){

    var user = req.body.username || "";
    var passwordOne = req.body.passOne || "";
    var passwordTwo = req.body.passTwo || "";


      if(user && passwordOne && passwordTwo){

        var passwordCrypt = CryptoJS.HmacSHA1(passwordOne, krypt);

        auth.registration(user, passwordCrypt, function(results){
            if (!results || results == "") {
              res.status(401);
              res.json({
                "status": 401,
                "message": "Invalid sign up"
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
                if (results=="OK") {
                  res.status(200);
                  res.json({
                    "status": 200,
                    "message": "Successfull sign up ! Log in now :)"
                  });
                }
              }
            }
          });
        }else{
         res.status(401);
         res.json({
           "status": 401,
           "message": "Missing inputs for sign up"
         });
       }

  },

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


  getUser: function(req,res){},

  welcome: function(req,res){
      res.status(200).send("Okay");
  }

}






function genToken(user) {
  var expires = expiresIn(1); // 1 day
  var token = jwt.encode({
    user: user,
    exp: expires
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
