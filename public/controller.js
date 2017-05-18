/*app.controller('',  [ '$scope', '$http', function($scope, $http) {
    $scope.message = "o";

      this.test = function(){
        var req = {
          method: 'GET',
          url: '/',
          data: { test: 'test' }
        };

        $http(req).then(function successCallback(response) {
            $scope.message = response.data.status;
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });

      };

*/
app.factory('TokenFact', function($window) {

      var token = {
      log: false,

      checkLog: function() {
        if ($window.sessionStorage.token) {
          this.log = true;
        } else {
          this.log = false;
          delete this.user;
        }
      }
    }
    return token;
});

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

app.controller('LoginCtrl', ['$scope', '$http','$window',  '$location', 'TokenFact',
        function($scope, $http, $window, $location, TokenFact) {

          $scope.login = function() {
            var username = $scope.user;
            var password = $scope.password;

            console.log(username + password);
           if (username !== undefined && password !== undefined) {

            //  UserAuthFactory.login(username, password).success(function(data) {

                TokenFact.log = true;

                //$window.sessionStorage.token = "test";

                $http({
                      method: 'POST',
                      url: '/home',
                      data:{
                        username: username,
                        password: password
                      }
                    }).then(function successCallback(response) {
                        $window.sessionStorage.token = response.data.token;
                      }, function errorCallback(response) {
                      });

                  $location.path("/home");

              //};
          }else{
            $location.path("/login");
          };
        };

        $scope.logout = function() {
          if (TokenFact.log) {
            TokenFact.log = false;
            delete $window.sessionStorage.token;
            delete $window.sessionStorage.com;
            $location.path("/login");
          };
        };

}]);
