angular.module('app.services')
  .factory('Score', function() {

    var services = {};
    
    // How long to wait before score starts to decrease (in ms)
    var gracePeriod = 1000;
    // Length of time from end of grace period to score of zero (in ms)
    var countdown = 10000; 
    // Maximum score per second
    var maxScore = 10000;
    // Score for this second
    var currentScore = maxScore;
    // maximum score increase per second
    var base = 1000;
    // holds raw scores for each second
    var scores = [];


    // Calculates one score, based on how long it's been since the user typed.
    services.getScore = function(currentTime, lastKeyPress) {
         
      var score = 0;

      // number of milliseconds since last key press
      var diff = currentTime - lastKeyPress;

      // either add or subtract points from currentScore
      if (diff < gracePeriod) {
        score = base;
      } else {
        score = -base;
      }
      currentScore += score;

      // enforce minimum and maximum score
      if (currentScore > maxScore) currentScore = maxScore;
      if (currentScore < 0) currentScore = 0;

      // add score to the array of scores
      scores.push(currentScore);

      // return score for use in controller
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

