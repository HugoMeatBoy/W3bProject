app.factory('SpeedrunFact', function($http,LINK) {
  var speedrunFactory = {};

  speedrunFactory.addSplits = function(cat,splits){
    var url = "/api/speedrun/newSplits";

    return $http({
           method: 'POST',
           url: LINK+url,
           data:{
             cat:cat,
             splits: splits
           }
         });
      },

  


    speedrunFactory.addRun = function(splits,cat,game,user,stringDate,runTime,splitsTime){

      return $http({
             method: 'POST',
             url: LINK+"/api/speedrun",
             data:{
               cat:cat,
               user:user,
               splits: splits,
               gameName: game,
               date: stringDate,
               time: runTime,
               splitsRun: splitsTime
             }
           });
        }


  return speedrunFactory;
});
