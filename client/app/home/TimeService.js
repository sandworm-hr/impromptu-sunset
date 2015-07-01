angular.module('app.services')
  .factory('Time', function() {

    var services = {};

    var lastKeyPress, minute, totalMinutes, elapsed, startTime;

    // stores the time of the last keypress, in ms since 1970
    services.setTime = function(time){
      lastKeyPress = time;
    };

    // returns time of last key press
    services.getLastKeyPress = function() {
      return lastKeyPress;
    };

    // returns the time of the current moment
    services.getTime = function() {
      var date = new Date();
      return date.getTime();
    };
    
    // Stores the length of the current session in minutes, based on user input
    // services.setMinuteCount = function(timerInput) {
    services.setSecondCount = function(timerInput) {
      // totalMinutes = timerInput;
      totalSeconds = timerInput;
    };

    // Stores the start time of the session
    services.setStartTime = function(time) {
      startTime = this.getTime();
    };

    // Generates a visualization of the timer as a string. Counts down to zero.
    services.getTimer = function() {
      elapsed = this.getTime() - startTime;
      // console.log(elapsed);
      // var mins = (totalMinutes - Math.floor(elapsed / 60000) - 1).toString();
      // var seconds = (60 - Math.floor(((elapsed % 60000) / 1000)) - 1).toString();
      var seconds = (totalSeconds - Math.floor(elapsed / 1000) - 1).toString();
      // console.log(seconds);
      if (seconds.length === 1) seconds = '0' + seconds;

      // return mins + ':' + seconds;
      return seconds;
    };

    // Checks whether the session is over.
    services.checkForEnd = function() {
      elapsed = this.getTime() - startTime;
      // return elapsed >= totalMinutes * 60000;
      return elapsed >= totalSeconds * 1000;
    };

    return services;

  });
