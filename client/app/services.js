angular.module('app.services', [])

  .factory('Results', function(){
    var results = {};
    var duration, text, scores;
    
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

  .factory('Users', function ($http) {
    var login = function(user) {
      $http({
        method: 'POST',
        url: '/api/users/login',
        data: user
      })
      .then(function(response) {
        console.log(response);
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
      });
    };

    return {
      login: login,
      signUp: signUp,
    };
  })
