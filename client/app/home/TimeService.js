angular.module('app.services')
  .factory('Time', function() {

    var services = {};

    var lastKeyPress, minute, totalMinutes, elapsed, startTime;

    services.setTime = function(time){
      lastKeyPress = time;
    };

    services.getLastKeyPress = function() {
      return lastKeyPress;
    };

    services.getTime = function() {
      var date = new Date();
      return date.getTime();
    };

    services.updateMinute = function() {
      minute = Math.floor((services.getTime() - $scope.startTime) / 60000);
    };

    services.setMinuteCount = function(timerInput) {
      totalMinutes = timerInput;
    };

    services.setStartTime = function(time) {
      startTime = this.getTime();
    };

    services.getTimer = function() {
      elapsed = this.getTime() - startTime;
      var mins = (totalMinutes - Math.floor(elapsed / 60000) - 1).toString();
      var seconds = (60 - Math.floor(((elapsed % 60000) / 1000)) - 1).toString();
      if (seconds.length === 1) seconds = '0' + seconds;

      return mins + ':' + seconds;
    };

    services.checkForEnd = function() {
      elapsed = this.getTime() - startTime;
      return elapsed >= totalMinutes * 60000;
    };

    return services;

  });
