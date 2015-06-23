angular.module('app.services', [])

  .factory('Results', function(){
    var results = {};
    var duration = 0, text = 'hello world', scores = [0];
    
    results.setDuration = function(minutes){
      duration = minutes;
    };
    results.setText = function(string) {
      text = string;
    };
    results.setScores = function(array) {
      scores = array;
    };
    results.getDuration = function() {
      return duration;
    };
    results.getText = function() {
      return text;
    };
    results.getScores = function() {
      return scores;
    };
    return results;
  })

  .factory('Session', function(){
    var session = {};
    session.create = function (userId, userName) {
      this.userId = userId;
      this.username = userName;
    };
    session.destroy = function () {
      this.userId = null;
      this.username = null;
    };
    session.isAuthenticated = function(){
      return (!!this.userId);
    };

    return session;
  })

  .factory('Users', function ($http, Session) {
    var logout = function() {
      $http({
        method: 'GET',
        url: '/api/users/logout'
      })
      .then(function(response) {
        console.log(response);
        Session.destroy();
      });
    };

    var login = function(user) {
      $http({
        method: 'POST',
        url: '/api/users/login',
        data: user
      })
      .then(function(response) {
        console.log(response);
        Session.create(
          response.data.username, 
          response.data.id
        );
      });
    };

    var signUp = function(user) {
      $http({
        method: 'POST',
        url: 'api/users/signup',
        data: user
      })
      .then(function(response) {
        console.log(response);
        Session.create(
          response.data.username, 
          response.data.id
        );
      });
    };

    return {
      login: login,
      signUp: signUp,
      logout: logout
    };
  })
