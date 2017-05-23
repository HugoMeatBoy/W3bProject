var jwt = require('jwt-simple');
var data = process.env.ENCODING_KEY;


module.exports = function(req, res, next) {

  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];;

    if (token !== "") {
     try {

         var decoded = jwt.decode(token, data);

         if (decoded.exp <= Date.now()) {
           res.status(400);
           res.json({
             "status": 400,
             "message": "Token Expired"
           });
           return;
         }else{
           next();//Success
         }

  } catch (err) {
      res.status(500);
      res.json({
        "status": 500,
        "message": "Something went wrong",
        "error": err
      });
    }
  } else {
    res.status(401);
    res.json({
      "status": 401,
      "message": "Invalid Token"
    });
    return;
  }

}
