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
      console.log("coucou");
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
            var username = $scope.user;
            var password = $scope.password;

            console.log(username + password);
           if (username !== undefined && password !== undefined) {


                $http({
                      method: 'POST',
                      url: '/home',
                      data:{
                        username: username,
                        password: password
                      }
                    }).then(function successCallback(response) {
                          TokenFact.log = true;
                          $window.sessionStorage.token = response.data.token;
                          console.log("okay " + $window.sessionStorage.token);
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



}]);
