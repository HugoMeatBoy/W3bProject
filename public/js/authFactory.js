

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
