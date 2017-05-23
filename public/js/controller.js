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

}]);

app.controller('LoginCtrl', ['$scope', '$http','$window',  '$location', 'TokenFact',
        function($scope, $http, $window, $location, TokenFact) {


          $scope.login = function() {

            username = $scope.user;
            password = $scope.password;

           if (username !== undefined && password !== undefined) {


                $http({
                      method: 'POST',
                      url: '/home',
                      data:{
                        username: username,
                        password: password
                      }
                    }).then(function successCallback(response) { //Success connection
                          TokenFact.log = true;
                          $window.sessionStorage.token = response.data.token;
                          $window.sessionStorage.user = username;
                          $scope.alertMessage = "";
                          $location.path("/api/home");
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

              $http({
                    method: 'POST',
                    url: '/registration',
                    data:{
                      username: userSignup,
                      passOne: passOne,
                      passTwo: passTwo
                    }
                  }).then(function successCallback(response) { //Success connection
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
        function($scope, $http, $window, $location) {
          $scope.activeUser =  $window.sessionStorage.user;


}]);
