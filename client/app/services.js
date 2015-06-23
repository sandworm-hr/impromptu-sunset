angular.module('app.services', [])
  .factory('Results', function(){
  var services = {};
  var duration = 0, text = "hello world", scores = [0];
  
  services.setDuration = function(minutes){
    duration = minutes;
  };
  services.setText = function(string) {
    text = string;
  };
  services.setScores = function(array) {
    scores = array;
  };
  services.getDuration = function() {
    return duration;
  };
  services.getText = function() {
    return text;
  };
  services.getScores = function() {
    return scores;
  };
  return services;
});