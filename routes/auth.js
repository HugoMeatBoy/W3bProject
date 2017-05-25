var jwt = require('jwt-simple');
var bd = require('./bdConnections.js');
var CryptoJS = require("crypto-js");
require('dotenv').load();


var key = process.env.ENCODING_KEY;
var krypt = process.env.CRYPT_KEY;


var auth = {


    /******* LOGIN *********/

   login: function(req,res,callback){
     var user = req.body.username || "";
     var password = req.body.password || "";

     if(user && password){

       var passwordCrypt = CryptoJS.HmacSHA1(password, krypt);

       bd.authentication(user,passwordCrypt,function(results){

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
                res.status(200);
                res.json(genToken(results[0].idmembre,results[0].pseudomembre));
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






  /****** Sign Up *******/

  signUp: function(req,res,callback){

    var user = req.body.username || "";
    var passwordOne = req.body.passOne || "";
    var passwordTwo = req.body.passTwo || "";


      if(user && passwordOne && passwordTwo){

        var passwordCrypt = CryptoJS.HmacSHA1(passwordOne, krypt);

        bd.registration(user, passwordCrypt, function(results){
            if (!results || results == "") {
              res.status(400);
              res.json({
                "status": 400,
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
                  res.status(201);
                  res.json({
                    "status": 201,
                    "message": "Successfull sign up ! Log in now :)"
                  });
                  return;
                }
              }
            }
          });
        }else{
         res.status(400);
         res.json({
           "status": 400,
           "message": "Missing inputs for sign up"
         });
       }

  },




  getUser: function(req,res){},

  welcome: function(req,res){
      res.status(200).send("Okay");
  }

}






function genToken(id,user) {
  var expires = expiresIn(1); // 1 day
  var token = jwt.encode({
    user: user,
    exp: expires
  },key);

  return {
    id: id,
    user: user,
    token: token,
    expires: expires
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;
