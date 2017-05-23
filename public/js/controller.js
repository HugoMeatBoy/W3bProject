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
app.controller('DisplayCtrl', ['$scope','$window', '$location', 'TokenFact', function($scope,$window,  $location, TokenFact){

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

           if (username !== undefined && password !== undefined) {

             LoginFact.userLogin(username,password).then(function successCallback(response) { //Success connection
                          TokenFact.log = true;
                          $window.sessionStorage.token = response.data.token;
                          $window.sessionStorage.id = response.data.id;
                          console.log($window.sessionStorage.id);
                          $window.sessionStorage.user = username;
                          $scope.alertMessage = "";
                          $location.path("/home");
                      }, function errorCallback(response) {
                          $scope.alertMessage = "/!\\ " + response.data.message;
                          $location.path("/");
                      });



              //};
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

app.controller('UserCtrl',['$scope', '$http','$window',  '$location',
        function($scope, $http, $window, $location){
          $scope.activeUser =  $window.sessionStorage.user;



          var url = "/api/games/" + $window.sessionStorage.id;


          $scope.jeux = [];
          $http({
                method: 'GET',
                url: url,
              }).then(function successCallback(response) { //Success connection
                    var i = 0;
                    $scope.datas = response.data;

                }, function errorCallback(response) {

                });


}]);

app.controller('GamesCtrl',['$scope', '$http','$window',  '$location',
        function($scope, $http, $window, $location){

          $scope.jeux = [];
          $http({
                 method: 'GET',
                 url: '/api/games',
               }).then(function successCallback(response) { //Success connection
                     var i = 0;
                     $scope.datas = response.data;
                     console.log($scope.datas);
                     while(i<$scope.datas.length){

                         $scope.jeux[i] = $scope.datas[i].nomjeu;


                         i++;
                     }
                 }, function errorCallback(response) {

                 });


        }]);
