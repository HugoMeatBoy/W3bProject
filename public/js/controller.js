
app.controller('DisplayCtrl', ['$scope','$window', '$location', 'TokenFact',
  function($scope,$window,  $location, TokenFact){

    $scope.logout = function() {
      if (TokenFact.log) {
        TokenFact.log = false;
        delete $window.sessionStorage.id;
        delete $window.sessionStorage.user;
        delete $window.sessionStorage.token;
        delete $window.sessionStorage.com;
        delete $window.sessionStorage.SRgame;
        delete $window.sessionStorage.SRcat;
      }
      $location.path("/");
    }

    $scope.isLogged = function(){
      if(TokenFact.log){
        return true;
      }else{
        return false;
      }
    }

    $scope.goHome = function(){
      $location.path("/home");
    }

    $scope.goGames = function(){
      $location.path("/games");
    }

}]);

app.controller('LoginCtrl', ['$scope', '$http','$window',  '$location', 'TokenFact','LoginFact','RegistrationFact',
        function($scope, $http, $window, $location, TokenFact, LoginFact, RegistrationFact) {


          $scope.login = function() {

            username = $scope.user;
            password = $scope.password;


           if (username !== undefined && password !== undefined) {
             $scope.user = "";
             $scope.password = "";

             LoginFact.userLogin(username,password).then(function successCallback(response) { //Success connection
                          TokenFact.log = true;
                          $window.sessionStorage.token = response.data.token;
                          $window.sessionStorage.id = response.data.id;
                          $window.sessionStorage.user = username;
                          $scope.alertMessage = "";
                          $location.path("/home");
                      }, function errorCallback(response) {
                          $scope.alertMessage = "/!\\ " + response.data.message;
                          $location.path("/");
                      });


          }else{
            $scope.alertMessage = "Missing id or password";
            $location.path("/");

          };
        };




        $scope.signUp = function() {

          userSignup = $scope.username;
          passOne = $scope.passwordOne;
          passTwo = $scope.passwordTwo;



         if (userSignup !== undefined && passOne !== undefined && passTwo !== undefined) {
           if(passOne==passTwo){
             $scope.username = "";
             $scope.passwordOne = "";
             $scope.passwordTwo = "";

             RegistrationFact.userReg(userSignup,passOne,passTwo).then(function successCallback(response) { //Success connection
                        $scope.alertMessage = response.data.message;;
                        $location.path("/");
                    }, function errorCallback(response) {
                        $scope.alertMessage = "/!\\ " + response.data.message;
                        $location.path("/");
                    });
              }else{
                  $scope.alertMessage = "/!\\ Error on validating password";
              }


            //};
        }else{
          $scope.alertMessage = "/!\\  Missing inputs for registration";
          $location.path("/");

        };

      };


}]);




app.controller('UserCtrl',['$scope', '$http','$window', '$location','GamesFact','LINK',
        function($scope, $http, $window, $location,GamesFact,LINK){
          $scope.activeUser =  $window.sessionStorage.user;

          var url = "/api/games/" + $window.sessionStorage.id;

          $scope.message;
          $scope.jeux = [];
          $http({
                method: 'GET',
                url: LINK+url,
              }).then(function successCallback(response) { //Success connection
                      $scope.message = response.data.message;
                      $scope.datas = response.data;
                      var i = 0;
                      if($scope.datas[i].descriptioncategorie == undefined || $scope.datas[i].descriptioncategorie == "undefined"){
                        $scope.datas[i].descriptioncategorie = " ";
                      }

                }, function errorCallback(response) {

                });


          $scope.speedrun = function(game,category){
            $window.sessionStorage.SRgame = game;
            $window.sessionStorage.SRcat = category;
            $location.path("/speedrun");
          }

        $scope.active = function(){
            if($scope.message == "No games founds"){
              $scope.messageAlert = "Look on games to start a speedrun or add a new game !"
              return true;
            }else{
              return false;
            }
        }


}]);








/****************** GAMES CONTROLLER **********************/

app.controller('GamesCtrl',['$scope','$http','$window','$location','GamesFact','LINK',
        function($scope, $http, $window, $location,GamesFact, LINK){

          $scope.act = 1;
          $scope.messageAdd = "New Game";
          $scope.messageAlert = "";
          $scope.jeux = [];


          //GET ALL RUNNED GAMES


          $http({
                 method: 'GET',
                 url: LINK+'/api/gamesRun',
               }).then(function successCallback(response) { //Success connection
                   var i = 0;
                     $scope.datas = response.data;

                     while(i<$scope.datas.length){

                           if($scope.datas[i].descriptioncategorie == undefined || $scope.datas[i].descriptioncategorie == 'undefined'){
                             $scope.datas[i].descriptioncategorie = "";
                           };
                           if($scope.datas[i].descriptionjeu == undefined || $scope.datas[i].descriptionjeu == 'undefined' || $scope.datas[i].descriptionjeu == 'NULL'){
                             $scope.datas[i].descriptionjeu  = " ";
                           };
                         i++;
                    }


                     var url = "/api/games/" + $window.sessionStorage.id;
                     $http({
                           method: 'GET',
                           url:  LINK+url,
                         }).then(function successCallback(res) {
                           $scope.jeux = res.data;
                         }, function errorCallback(res) {
                           if(res.data){
                              $scope.messageAlert = res.data.message;
                           }
                         });
                 }, function errorCallback(response) {
                   $scope.messageAlert = "No categories yet, add one !";
         });


         //GET ALL GAMES
         $http({
                method: 'GET',
                url:  LINK+'/api/games',
              }).then(function successCallback(response) { //Success connection
                    var j = 0;
                    $scope.games = response.data;
                }, function errorCallback(response) {

                });






            $scope.addGame = function(){
              nameGame = $scope.namegame;
              typeGame = $scope.typegame;
              descGame = $scope.descgame;

              $scope.messageAlert = "";

              if(nameGame != undefined && typeGame != undefined){

              GamesFact.newGame(nameGame,typeGame,descGame).then(function successCallback(response) {

              }, function errorCallback(response) {
                if(response.data){
                  $scope.messageAlert = response.data.message;
                }
              });

                $scope.namegame = "";
                $scope.typegame = "";
                $scope.descgame = "";

                $window.location.reload();

              }

            }




            $scope.addCategory = function(){
              Game = $scope.game;
              nameCat = $scope.namecat;
              desCat = $scope.descat;

              $scope.messageAlert = "";

              if(Game != undefined && nameCat != undefined){

              GamesFact.newCategory(Game,nameCat,desCat).then(function successCallback(response) {


              }, function errorCallback(response) {
                if(response.data){
                  $scope.messageAlert = response.data.message;
                }
              });
              $scope.game = "";
              $scope.namecat = "";
              $scope.descat = "";

              $window.location.reload();
            }
          }



            $scope.addUserGame = function(cat,game){

              var user = $window.sessionStorage.id;
              if(cat != undefined && user != undefined  && game != undefined){
                GamesFact.newUserGame(cat,user,game).then(function successCallback(response) {
                  $location.path("/home");
                });

              }

            }



            $scope.gamebutton = function(nomJ,nomC){
              var k = 0;
              var show = false;

              for(k;k<$scope.jeux.length;k++){
                if(nomC == $scope.jeux[k].nomcategorie && nomJ == $scope.jeux[k].nomjeu){
                    show = true
                    return show;
                }else{
                   show = false;
                }

              }
              return show;
            }







            $scope.active = function(tab){
                  if($scope.act == tab){
                    return true;
                  }else{
                    return false;
                  }
              }

            $scope.activate = function(tab){
                $scope.act = tab;
                if(tab==1){
                  $scope.messageAdd = "New Game";

                }
                else{
                  $scope.messageAdd = "New Category";
                  $scope.messageAddCat="Game must exists yet";
              }
              $scope.messageAlert = "";
            }

        }]);





app.controller('SpeedrunCtrl',['$scope','$http','$window','$location','$timeout','SpeedrunFact','LINK',
      function($scope, $http, $window, $location,$timeout,SpeedrunFact,LINK){
        $scope.nameGame = $window.sessionStorage.SRgame;
        $scope.idCat = $window.sessionStorage.SRcat;
        $scope.descCat = "GL HF";
        $scope.display = 2;
        $scope.dataRun = [];
        $scope.splitsTime = [];
        $scope.splitsSel = [];
        var splitsCpt = 0;
        var splitsLength;
        var runSplits = "";
        var bool;
        var url;


      $scope.setSplits = function(){
          runSplits = "{\"run\":"+ $scope.splitsSel + "}";
          $scope.runS = JSON.parse(runSplits);
          splitsLength = $scope.runS.run.length;
        }



        url = "/api/"+$window.sessionStorage.id+"/speedrun/"+$scope.idCat;
        $http({
              method: 'GET',
              url:LINK+url,
            }).then(function successCallback(response) {
              $scope.dataRun = response.data;

              if($scope.dataRun[0].datasplits ){
                if(!$scope.splitsSel){
                  $scope.splitsSel = $scope.dataRun[0].datasplits;
                  $scope.setSplits();
                }
              }else{
                $scope.messageAlert = "Add the firsts splits";
              }
            }, function errorCallback(response) {
              if(response.data){
                $scope.messageAlert = response.data.message || response.status;
             }
        });



        var url2 = "/api/"+$window.sessionStorage.id+"/speedrun/"+$scope.idCat+"/pbest";
        $http({
                  method: 'GET',
                  url:LINK+url2,
                }).then(function successCallback(response) {

                  $scope.pb = response.data[0].min;

                  parseInt($scope.pb);
                  //parseInt($scope.pb);
                  $scope.pbSecs = ($scope.pb % 60);
                  $scope.pbMins = ($scope.pb - $scope.pbSecs) / 60;

                }, function errorCallback(response){
                  $scope.pb = response.data.status;
         });




        $scope.addSplits = function(){
            $scope.bestSplits =[];
            $scope.bestSplits  = $scope.newsplits.split(',');
            var i = 0;
            if($scope.bestSplits.length>0){
              while(i<$scope.bestSplits.length){
                if(i==0){
                  stringSplits = "[\"" + $scope.bestSplits[i] + "\"";
                }else{
                  stringSplits += ",\"" + $scope.bestSplits[i] + "\"";
                }
                i++;
              }
              stringSplits += "]";

              cat = $scope.idCat;
              SpeedrunFact.addSplits(cat,stringSplits).then(function successCallback(response) {
                  $scope.messageAlert = response.data.message;
                  $window.location.reload();
              }, function errorCallback(response) {
                if(response.data){
                  $scope.messageAlert = response.data.message;
                }
            });
          }
        };


















          var timer = null;


          $scope.counter = 0;
          $scope.counterMin = 0;


          $scope.btnActive = function(tab){
            if($scope.display == tab){
              return true;
            }else{
              return false;
            }
          };










          /* CHRONO */
          $scope.Counter = function(){
            if($scope.btnActive(2)){
              $scope.startCounter(0)
            }else if($scope.btnActive(3)){
              $scope.splits();
            }else if($scope.btnActive(1)){
              $scope.stopCounter();
            }else{
              $scope.saveRun();
            }
          };



          $scope.startCounter = function() {
              if (timer == null){

                timer = $timeout(updateCounter, 1000);
                if(splitsLength == 1) {
                  $scope.display = 1;
                }else{
                  $scope.display = 3;
                }

              }
          };


          $scope.splits = function(){

              if(splitsCpt==splitsLength-2){
                $scope.splitsTime[splitsCpt] = $scope.counterMin + ":" + $scope.counter;
                $scope.display = 1;
              }else{
                $scope.splitsTime[splitsCpt] = $scope.counterMin + ":" + $scope.counter;


              }
              splitsCpt++;
          };

          $scope.stopCounter = function() {
              $scope.splitsTime[splitsCpt] = $scope.counterMin + ":" + $scope.counter;
              $scope.display = 4;
              $timeout.cancel(timer);
          };



            $scope.resetCounter = function(){
              $timeout.cancel(timer);
              timer = null;
              $scope.counter = 0;
              $scope.counterMin = 0;
              splitsCpt = 0;
              $scope.splitsTime = [];
              $scope.display = 2;

            };


          var updateCounter = function() {
              $scope.counter++;
              if($scope.counter == 60){
                $scope.counterMin++;
                $scope.counter = 0;
              }
              timer = $timeout(updateCounter, 1000);
          };



          /*DB access for speedrun */

          $scope.saveRun = function(){
            user = $window.sessionStorage.id;
            splits = $scope.splitsSel;
            cat = $scope.idCat;
            game = $scope.nameGame;
            date = new Date();
            runTime = $scope.counter + ($scope.counterMin * 60);
            splitsTime = $scope.splitsTime.toString();

            stringDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();


            SpeedrunFact.addRun(splits,cat,game,user,stringDate,runTime,splitsTime).then(function successCallback(response) {
                $scope.messageAlert = response.data.message;
                $scope.resetCounter();
            }, function errorCallback(response) {
              if(response.data){
                $scope.messageAlert = response.data.message;
              }
            });
            }





      }]);
