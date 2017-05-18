var jwt = require('jwt-simple');
var data = process.env.ENCODING_KEY;


module.exports = function(req, res, next) {

  var token = req.headers['x-access-token'];


    if (!token) {
      res.status(401);
      res.json({
        "status": 401,
        "message": "No I"
      });
      return;
    }

/*       try {

         var decoded = jwt.decode(token, data);



         if (decoded.exp <= Date.now()) {
           res.status(400);
           res.json({
             "status": 400,
             "message": "Token Expired"
           });
           return;
         }else{
           res.status(200);
           res.json({
             "status": 200,
             "message": "Your Okay"
           });
           return;
         }

  } catch (err) {
      res.status(500);
      res.json({
        "status": 500,
        "message": "Oops something went wrong",
        "error": err
      });
    }
  } else {
    res.status(401);
    res.json({
      "status": 401,
      "message": "Invalid Token or Key"
    });
    return;
  }*/

}
