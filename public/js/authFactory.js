app.factory('TokenFact', function($window) {

      var token = {
      log: true,

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

app.factory('LoginFact', function($http,LINK) {
  var loginFactory = {};


  loginFactory.userLogin = function(username,password){
     return $http({
          method: 'POST',
          url: LINK+'/home',
          data:{
            username: username,
            password: password
          }
        });
      }
    return loginFactory;

});



app.factory('RegistrationFact', function($http,LINK) {
   var registrationFactory = {};

   registrationFactory.userReg = function(user,passOne,passTwo){
      return $http({
             method: 'POST',
             url: LINK+'/registration',
             data:{
               username: userSignup,
               passOne: passOne,
               passTwo: passTwo
             }
           });
        }

      return registrationFactory;

});
