
app.controller('HomeController', ['$scope', '$interval', 'Results', 'ColorIndexService', 'Time', 'Score', function($scope, $interval, Results, ColorIndexService, Time, Score) {


  $scope.unsubmitted = true;
  $scope.gameOver = false;

  // start the app with a perfect colorIndex
  ColorIndexService.set(10);

  var start;

  $scope.setTime = function(event){
    Time.setTime(event.timeStamp);
  };

  $scope.startTimer = function() {

    if (angular.isDefined(start)) return;

    var duration = parseInt($scope.timerInput);
    Time.setMinuteCount(duration);

    if (duration > 0) {

      $scope.unsubmitted = false;

      Time.setStartTime();

      Score.getScore(Time.getTime(), Time.getLastKeyPress());
      $scope.timer = Time.getTimer();

      start = $interval(function() {
        if (Time.checkForEnd()) {
          $scope.stopTimer();
          setResults(duration);
        } else {
          var currentScore = Score.getScore(Time.getTime(), Time.getLastKeyPress());
          $scope.score = currentScore;
          $scope.timer = Time.getTimer();
          var colorIndex = ColorIndexService.getRoundedIndex(currentScore, Score.getMaxScore());
          $scope.colorIndex = colorIndex;
          ColorIndexService.set(colorIndex);
        }
      }, 1000, 0);

    } else {
      $scope.timerInput = 'please enter a number of minutes';
    } 
  };

  // Stops and resets the timeout interval to end the session
  $scope.stopTimer = function() {
    if (angular.isDefined(start)) {
      $interval.cancel(start);
      start = undefined;
    }
  };

  // Stores session data in the Results service
  var setResults = function(duration) {
    Results.setDuration(duration);
    Results.setText($scope.textInput);
    Results.setScores(Score.getScores());
    $scope.gameOver = true;
    Score.reset();
  };


  // For debugging purposes only. Generates a set of results to pass to the results page and/or server.
  $scope.makeDebugResults = function() {

    var getRandomInt = function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    var valuesObj = {};

    valuesObj.session_time = getRandomInt(1, 15);
    valuesObj.scores = [];
    valuesObj.text = "Hello I am the raw text";
    valuesObj.minuteScores = [];
    valuesObj.wpm = getRandomInt(30, 120);
    valuesObj.cpm = getRandomInt(40, 200);
    valuesObj.total = getRandomInt(1000, valuesObj.session_time*600000);
    valuesObj.possible = valuesObj.session_time * 60 * 10000;
    valuesObj.consistency = getRandomInt(0, 11) / 10;
    valuesObj.word_count = valuesObj.wpm * valuesObj.session_time;
    valuesObj.char_count = valuesObj.cpm * valuesObj.session_time;

    // generates random scores for each second
    for (var i = 0; i < valuesObj.session_time*60; i++) {
      var randomScore = getRandomInt(0, 10000);
      valuesObj.scores.push(randomScore);
    }
    // generates random scores for each minute
    for (var i = 0; i < valuesObj.session_time; i++) {
      var randomScore = getRandomInt(0, 60*10000);
      valuesObj.minuteScores.push(randomScore);
    }
    
    // Store generated results in the Results service for use on the Results page
    Results.setDuration(valuesObj.session_time);
    Results.setText(valuesObj.text);
    Results.setScores(valuesObj.scores);
    $scope.gameOver = true;

    // Uncomment to send generated results directly to the server
    // Results.postResults(valuesObj);
  };

}]);
