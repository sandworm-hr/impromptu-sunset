angular.module('app.services')
  .factory('Score', function() {

    var services = {};
    
    // How long to wait before score starts to decrease (in ms)
    var gracePeriod = 1000;
    // Length of time from end of grace period to score of zero (in ms)
    var countdown = 10000; 
    // Maximum score per second
    var maxScore = 10000;
    // Start score at maximum
    var currentScore = maxScore;
    // maximum score increase per second
    var base = 1000;

    var scores = [];

    services.getScore = function(currentTime, lastKeyPress) {
         
      var score = 0;

      var diff = currentTime - lastKeyPress;

      if (diff < gracePeriod) {
        score = base;
      } else {
        score = -base;
      }

      currentScore += score;

      if (currentScore > maxScore) currentScore = maxScore;
      if (currentScore < 0) currentScore = 0;

      scores.push(currentScore);

      console.log(currentScore);

      return currentScore;

    };

    services.getMaxScore = function(){
      return maxScore;
    };

    services.getScores = function() {
      return scores;
    };

    return services;

  });

