var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $http.get("/")
    .then(function(response) {
        console.log("TEST");
        $scope.message = response.data;
    });
});
