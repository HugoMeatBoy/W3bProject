/*
Routage


*/


var express = require('express');
var router = express.Router();



var auth = require('./auth.js');
var games = require('./games.js');
var speedrun = require('./speedrun.js');



router.post('/home', auth.login);

router.post('/registration', auth.signUp);



router.post('/api/speedrun', speedrun.newRun);
router.get('/api/:idUser/speedrun/:cat', speedrun.setRun);

router.get('/api/:idU/speedrun/:idcat/pbest', speedrun.getPB);

router.post('/api/speedrun/newSplits', speedrun.addSplits);


router.post('/api/:id/newgame',games.addUserGame);
router.get('/api/games/:id', games.getUserGames);


router.post('/api/:nameGame/newcategory', games.addCategory);
router.post('/api/newgame', games.addGame);


router.get('/api/gamesRun', games.getRunnedGames);
router.get('/api/games', games.getAllGames);




module.exports = router;
