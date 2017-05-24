app.factory('GamesFact', function($http) {
  var gamesFactory = {};

  gamesFactory.addGame = function(name,type,desc){
    return $http({
           method: 'POST',
           url: '/api/newgame',
           data:{
             name: name,
             type: type,
             desc: desc
           }
         });
      }

    return gamesFactory;
});
