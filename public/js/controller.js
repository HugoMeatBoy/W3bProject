app.factory('UserAuthFactory', function($window, $location, $http, TokenFact) {
/*  return {
    login: function(username, password) {
      return $http.post(APPLINK+'/login', {

      });
    },
    logout: function() {
      if (AuthenticationFactory.isLogged) {
        AuthenticationFactory.isLogged = false;
        delete $window.sessionStorage.token;
        delete $window.sessionStorage.com
        $location.path("/login");
      }
    }
  }*/
});
app.controller('DisplayCtrl', ['$scope','$window', '$location', 'TokenFact',
  function($scope,$window,  $location, TokenFact){

    $scope.logout = function() {
      if (TokenFact.log) {
        TokenFact.log = false;
        delete $window.sessionStorage.id;
        delete $window.sessionStorage.user;
        delete $window.sessionStorage.token;
        delete $window.sessionStorage.com;
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
            $scope.user = "";
            $scope.password = "";

           if (username !== undefined && password !== undefined) {

             LoginFact.userLogin(username,password).then(function successCallback(response) { //Success connection
                          TokenFact.log = true;
                          $window.sessionStorage.token = response.data.token;
                          $window.sessionStorage.id = response.data.id;
                          $window.sessionStorage.user = username;
                          $scope.alertMessage = "";
                          $location.path("/home");
                      }, function errorCallback(response) {
                          $scope.alertMessage = "/!\\ " + response.status;
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
          $scope.username = "";
          $scope.passwordOne = "";
          $scope.passwordTwo = "";


         if (userSignup !== undefined && passOne !== undefined && passTwo !== undefined) {
           if(passOne==passTwo){

             RegistrationFact.userReg(userSignup,passOne,passTwo).then(function successCallback(response) { //Success connection
                        $scope.alertMessage = response.data.message;;
                        $location.path("/");
                    }, function errorCallback(response) {
                        $scope.alertMessage = "/!\\ " + response.status;
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




                }, function errorCallback(response) {

                });



          $scope.speedrun = function(game,category){
            console.log(game);
            console.log('game ?');
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

app.controller('GamesCtrl',['$scope','$http','$window',  '$location','GamesFact','LINK',
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
                         i++;
                    }


                     var url = "/api/games/" + $window.sessionStorage.id;
                     $http({
                           method: 'GET',
                           url:  LINK+url,
                         }).then(function successCallback(res) {
                           $scope.jeux = res.data;
                         }, function errorCallback(response) {
                           $scope.messageAlert = "Error on request 2";
                           console.log(response.data.message + response.status);
                         });




/*

*/
                 }, function errorCallback(response) {
                   console.log(response.status);
                   console.log(response.data);
                   $scope.messageAlert = "Err 2";
         });


         //GET ALL GAMES
         $http({
                method: 'GET',
                url:  LINK+'/api/games',
              }).then(function successCallback(response) { //Success connection
                    console.log(response.data);
                    $scope.games = response.data;
                }, function errorCallback(response) {
                  console.log(response.data.message + response.status);
                });






            $scope.addGame = function(){
              nameGame = $scope.namegame;
              typeGame = $scope.typegame;
              descGame = $scope.descgame;
              $scope.namegame = "";
              $scope.typegame = "";
              $scope.descgame = "";
              $scope.messageAlert = "";

              if(nameGame != undefined && typeGame != undefined)

              GamesFact.newGame(nameGame,typeGame,descGame).then(function successCallback(response) {
                $location.path("/games");
              }, function errorCallback(response) {

                $scope.messageAlert = response.data.message;
              });
            }




            $scope.addCategory = function(){
              Game = $scope.game;
              nameCat = $scope.namecat;
              desCat = $scope.descat;
              $scope.game = "";
              $scope.namecat = "";
              $scope.descat = "";
              $scope.messageAlert = "";

              if(Game != undefined && nameCat != undefined){

              GamesFact.newCategory(Game,nameCat,desCat).then(function successCallback(response) {

                $location.path("/games");
              }, function errorCallback(response) {

                $scope.messageAlert = response.data.message;
              });

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

                console.log(k);
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


app.controller('SpeedrunCtrl',['$scope','$http','$window',  '$location','SpeedrunFact',
      function($scope, $http, $window, $location,SpeedrunFact){
        $scope.nameGame = $window.sessionStorage.SRgame;
        $scope.nameCat = $window.sessionStorage.SRcat;
        $scope.descCat = "GL HF";


         }]);
