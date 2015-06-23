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
  });
  