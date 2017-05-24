app.factory('GamesFact', function($http) {
  var gamesFactory = {};

  gamesFactory.newGame = function(name,type,desc){
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

   gamesFactory.newCategory = function(nameGame,nameCat,desc){
     var url = "/api/"+nameGame+"/newcategory";

     return $http({
            method: 'POST',
            url: url,
            data:{
              nameC: nameCat,
              desc: desc
            }
          });
       }

    gamesFactory.newUserGame = function(cat,user,game){

      var url = "/api/"+user+"/newgame";

      return $http({
             method: 'POST',
             url: url,
             data:{
              categorie: cat,
              game: game
             }
           });
        }


    return gamesFactory;
});
