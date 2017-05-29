/*
Routage
*/

// Routeur d'Express.js
var express = require('express');
var router = express.Router();


//Data treatment functions
var auth = require('./auth.js');
var games = require('./games.js');
var speedrun = require('./speedrun.js');


/*
Open to all users
*/
//Connection
router.post('/home', auth.login);
//Registration
router.post('/registration', auth.signUp);

/*
Allowed to members
*/
// Speedrun routing
router.post('/api/speedrun', speedrun.newRun);
router.get('/api/:idUser/speedrun/:cat', speedrun.setRun);
router.get('/api/:idU/speedrun/:idcat/pbest', speedrun.getPB);
router.post('/api/speedrun/newSplits', speedrun.addSplits);


//Games runned by player
router.post('/api/:id/newgame',games.addUserGame);
router.get('/api/games/:id', games.getUserGames);

//Adders of games/categories
router.post('/api/:nameGame/newcategory', games.addCategory);
router.post('/api/newgame', games.addGame);

//Getters games/categories
router.get('/api/gamesRun', games.getRunnedGames);
router.get('/api/games', games.getAllGames);




module.exports = router;
