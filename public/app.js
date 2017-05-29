/* Starting angular app */
var app = angular.module('SpeedRunners', ['ngRoute','timer']);

//app.constant('LINK',"");


/* Link of the app */
app.constant('LINK',"https://w3bproject.herokuapp.com") ;



/*
Config for request headers
Setting up the token
*/

app.factory('TokenInterceptor', function($q, $window) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers['X-Access-Token'] = $window.sessionStorage.token;
        config.headers['Content-Type'] = "application/json";
      }
      return config || $q.when(config);
    },
    response: function(response) {
      return response || $q.when(response);
    }
  };
});



/* Routing managment by Angular */

app.config(function($routeProvider, $httpProvider) {
  $httpProvider.interceptors.push('TokenInterceptor');
  $routeProvider
  .when('/', {
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl',
    permission: {
      login: false
    }
  }).when('/home', {
    templateUrl: 'views/home.html',
    controller: 'UserCtrl',
    permission: {
      login: true
    }
  }).when('/games', {
    templateUrl: 'views/games.html',
    controller: 'GamesCtrl',
    permission: {
      login: true
    }
  }).when('/speedrun', {
    templateUrl: 'views/speedrun.html',
    controller: 'SpeedrunCtrl',
    permission: {
      login: true
    }
  }).when('/datas', {
    templateUrl: 'views/stats.html',
    controller: 'SpeedRunCtrl',
    permission: {
      login: true
    }
  }).otherwise({
    redirectTo: '/'
  });
});

app.run(function($rootScope, $window, $location, TokenFact) {

  // when the page changes, check if the user is already logged in
  TokenFact.checkLog();
  $rootScope.$on("$routeChangeSuccess", function(event, nextRoute, currentRoute) {
    if ((nextRoute.permission && nextRoute.permission.login) && !TokenFact.log) {
      $location.path("/");
    } else {
      if (!TokenFact.user) TokenFact.user = $window.sessionStorage.user;
    }
    if (TokenFact.log == true && $location.path() == '/') {
      $location.path('/home');
    }
  });

});


/***********************/
/* Directives :
  'E' : Element, 'A' : Attribute

  Header displayed if connection
*/

app.directive("header", function() {
  return {
    restrict: 'E',
    templateUrl: "./templates/header.html",
    controller: "DisplayCtrl"
  };
});
