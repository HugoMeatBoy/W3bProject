var jwt = require('jwt-simple');
var key = process.env.ENCODING_KEY;

var auth = {


  hello: function(req, res) {
      res.status(200).render('lol');
  },

   login: function(req,res){
     console.log("WOW");
      res.status(200).json(genToken("Boy"));
  },


  getUser: function(req,res){},

  welcome: function(req,res){
      res.status(200).send("Okay");
  }

}






function genToken(user) {
  var expires = expiresIn(1); // 1 day
  var token = jwt.encode({
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
