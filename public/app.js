var app = angular.module('SpeedRunners', ['ngRoute']);





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




app.config(function($routeProvider, $httpProvider) {
  $httpProvider.interceptors.push('TokenInterceptor');
  $routeProvider
  .when('/signup', {
    templateUrl: 'views/signIn.html',
    controller: 'LoginCtrl',
    permission: {
      login: false
    }
  }).when('/', {
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl',
    permission: {
      login: false
    }
  }).when('/home', {
    templateUrl: 'views/home.html',
    controller: 'LoginCtrl',
    permission: {
      login: true
    }
  }).when('/user/:id', {
    templateUrl: '',
    controller: '',
    permission: {
      login: true
    }
  }).otherwise({
    redirectTo: '/'
  });
});

app.run(function($rootScope, $window, $location, TokenFact) {

  // when the page refreshes, check if the user is already logged in
  TokenFact.checkLog();
  $rootScope.$on("$routeChangeSuccess", function(event, nextRoute, currentRoute) {
    if ((nextRoute.permission && nextRoute.permission.login) && !TokenFact.log) {


      $location.path("/");


    } else {

      // check if user object exists else fetch it. This is incase of a page refresh
    //  DisplayCtrl.isLogged();
      if (!TokenFact.user) TokenFact.user = $window.sessionStorage.user;

    }
  });

/*
  $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
    $rootScope.showMenu = AuthenticationFactory.isLogged;
    // if the user is already logged in, take him to the home page
    if (AuthenticationFactory.isLogged == true && $location.path() == '/login') {
      $location.path('/');
    }
    if(AuthenticationFactory.isLogged)
    {
      GetProfil.getProf().then(function(data) {
        if(data.data.data.attribute.role=="admin")
        {
          $rootScope.admin=true;
        }
        else {
          $rootScope.admin=false;
        }

      });
    }
    else {
      $rootScope.admin=false;
    }
*/  });


/***********************/
/* Directives :
  'E' : Element, 'A' : Attribute

  Modules à afficher suivant la navigation
  */

app.directive("header", function() {
  return {
    restrict: 'E',
    templateUrl: "./templates/header.html",
    controller: "DisplayCtrl"
  };
});


/*  $scope.isLogged = function() {

    console.log("ok");
    if($window.sessionStorage.token){
      console.log("TROU");
      return true;
    }else{
      console.log("AHAH");
      return false;
    }*/
  //};





app.constant('APPLINK','localhost:3000');
