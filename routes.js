var express = require('express');
var router = express.Router();

var auth = require('./auth.js');

var games = require('./games.js');
var speedrun = require('./speedrun.js');
var html = 'OH';


router.get('/', auth.hello);



/* Routes for members */
//router.get('/api/user/:idU', auth.getUser);


//router.get('/api/user/:idU/speedrun/:idS', speedrun.setRun);
//router.post('/api/user/:idU/speedrun/:idS', speedrun.postRun);
//router.post('/api/game/:idG/speedrun/:idS', speedrun.addSplits);

//router.get('/api/games', games.getAllGames);
//router.get('/api/game/:idG', games.getGame);
//router.post('/api/game/:idG', games.addGame);





module.exports = router;
