var express = require('express');
var router = express.Router();

var auth = require('./auth.js');

var games = require('./games.js');
var speedrun = require('./speedrun.js');
var html = 'OH';


router.post('/home', auth.login);

router.post('/registration', auth.signUp);

router.get('/api', auth.welcome);
/* Routes for members
router.get('/api/user/:idU', auth.getUser);

router.get('/api/user/:idU/speedrun/:idS', speedrun.setRun);
router.post('/api/user/:idU/speedrun/:idS', speedrun.chooseRun);
router.post('/api/user/:idU/speedrun/:idS/submit', speedrun.postRun);

router.post('/api/games/:idG/speedrun/:idS/newSplits', speedrun.addSplits);


router.get('/api/game/:idG', games.getGame);
router.post('/api/game/:idG', games.addGame);
*/
router.get('/api/games/:id', games.getUserGames);
router.get('/api/games', games.getAllGames);



module.exports = router;
