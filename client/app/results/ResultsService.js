angular.module('app.services')

  .factory('Results', ['$http', function($http) {
    var results = {};
    var duration, text, scores;

    var funcs = {};

    // Returns a sum of every score from the session
    funcs.getTotalScore = function() {
      return _.reduce(scores, function(memo, score) {
        return memo + score;
      }, 0);
    };

    // Calculates the agregate score for each minute of play, and returns an array
    funcs.getScoresPerMinute = function() {
      var result = [];
      // if there are no scores (if the user goes directly to the results page)
      if (!scores) {
        return null;
      } else {
        for (var i = 0; i < scores.length; i++) {
          if (!(i % 60)) result.push(0);
          result[Math.floor(i / 60)] += scores[i];
        }
        return result;
      }
      
    };

    // returns the number of words in the text, based on spaces
    funcs.getWordCount = function() {
      // if there are no text (if the user goes directly to the results page)
      if (!text) {
        return null;
      }
      return text.split(' ').length;
    };

    // returns character count
    funcs.getCharacterCount = function() {
      // if there are no text (if the user goes directly to the results page)
      if (!text) {
        return null;
      }
      return text.length;
    };

    // Stores minutes (an integer) in the factory 
    funcs.setDuration = function(minutes){
      duration = minutes;
    };

    // Stores the full text from the text box in the factory 
    funcs.setText = function(string) {
      text = string;
    };

    // Stores an array of the scores for each second of play
    funcs.setScores = function(array) {
      scores = array;
    };

    // Provides length of the session, in minutes
    funcs.getDuration = function() {
      return duration;
    };

    // Provides full text of the last session
    funcs.getText = function() {
      return text;
    };

    // Provides the array of raw scores
    funcs.getScores = function() {
      return scores;
    };

    // DEBUG FUNCS
    // Sends the results (formatted in the results controller) to the server
    funcs.postResults = function(valuesObj) {
      return $http({
        method: 'POST',
        url: '/api/sessions',
        data: valuesObj
      })
      .success(function(response) {
        console.log(response);
      });
    };
    return funcs;
  }]);