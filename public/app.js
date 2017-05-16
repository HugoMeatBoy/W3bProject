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
  .when('/login', {
    templateUrl: '',
    controller: '',
    permission: {
      login: false
    }
  }).when('/signup', {
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
    redirectTo: '/login'
  });
});

app.constant('APPLINK','localhost:3000');
