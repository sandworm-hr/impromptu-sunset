
app.controller('HomeController', ['$scope', '$rootScope', '$interval', 'Results', 'ColorIndexService', 'Time', 'Score', '$stateParams', 'Session', 'Sessions', 'RandomPrompt', function($scope, $rootScope, $interval, Results, ColorIndexService, Time, Score, $stateParams, Session, Sessions, RandomPrompt) {

  $rootScope.socket = io();
  $scope.unsubmitted = true;
  $scope.gameOver = false;
  $scope.done = false;
  $scope.prompt = null;
  $scope.promptHide = true;

  // start the app with a perfect colorIndex
  ColorIndexService.set(10);

  var start;

  $scope.getSession = function (id) {
    Sessions.getSessionById(function(data){
      $scope.textInput = data.text;
    }, id);
  };

  if ($stateParams.id) {
    $scope.getSession($stateParams.id);
  }

  // pulls timeStamp from the keyUp event and stores it in the Time service
  $scope.setTime = function(event){
    Time.setTime(event.timeStamp);
  };

  // initializes and runs the timer and score calculator
  $scope.startTimer = function(num) {
    
    // prevents simultaneous sessions
    if (angular.isDefined(start)) return;

    // Delete any scores currently stored in the Score service.
    Score.reset();

    // stores length of session in Time service
    var duration = num || parseInt($scope.timerInput);
    Time.setMinuteCount(duration);

    // only works if duration is a positive number
    if (duration > 0) {

      $scope.unsubmitted = false;

      Time.setStartTime();

      // Starts the timer and begins scoring immediately
      Score.getScore(Time.getTime(), Time.getLastKeyPress());
      $rootScope.timer = Time.getTimer();

      // Generates one score and one color index every second until the session times out,
      // and then destroys the session and saves the data.
      start = $interval(function() {
        if (Time.checkForEnd()) { 
          $scope.stopTimer();
          $scope.timer = 0;
          $scope.done = true;
          setResults(duration);
        } else {
          var currentScore = Score.getScore(Time.getTime(), Time.getLastKeyPress());
          $rootScope.timer = Time.getTimer();
          var colorIndex = ColorIndexService.getRoundedIndex(currentScore, Score.getMaxScore());
          ColorIndexService.set(colorIndex);
        }
      }, 1000, 0);

    } else {
      $scope.timerInput = '';
    } 
  };

  $scope.timerDisplay = function(num) {

    // stores length of session in Time service
    $scope.stopTimer();
    Time.setMinuteCount(num);

    Time.setStartTime();
    
    $scope.unsubmitted = false;
    $scope.done = true;
    $scope.timeDisplay = Time.getTimer();

    // Destroys the session on timeout.
    start = $interval(function() {
      if (Time.checkForEnd()) { 
        $scope.stopTimer();
        $scope.timeDisplay = undefined;
      } else {
        $scope.timeDisplay = Time.getTimer();
      }
    }, 1000, 0);
  };

  $scope.randomPrompt = function() {
    $scope.promptHide = false;
    RandomPrompt.getPrompt(function(prompt) {
      $scope.prompt = prompt;
    });
  };

  $scope.hidePrompt = function() {
    $scope.promptHide = true;
  };

  $scope.roundRobin = function(num) {
    num--;
    $scope.currentPlayer = Session.getUser().username;
    $scope.socket.emit('roundStart', $scope.currentPlayer, num);
    if (num !== 0) { $scope.socket.emit('getNext', $scope.currentPlayer);}
    // prevents simultaneous sessions
    $scope.stopTimer();
    // Delete any scores currently stored in the Score service.
    Score.reset();

    // stores length of session in Time service
    Time.setSecondCount(30);

    // only works if duration is a positive number

    $scope.unsubmitted = false;
    $scope.done = false;

    Time.setStartTime();

    // Starts the timer and begins scoring immediately
    Score.getScore(Time.getTime(), Time.getLastKeyPress());
    $rootScope.timer = Time.getTimerSeconds();

    // Generates one score and one color index every second until the session times out,
    // and then destroys the session and saves the data.
    start = $interval(function() {
      if (Time.checkForEndSeconds()) { 
        $scope.stopTimer();
        $scope.timer = undefined;
        $scope.done = true;

        $scope.previousText = $scope.previousText || '';
        $scope.textInput = $scope.textInput || '';
        if (num === 0) { 
          $scope.socket.emit('endGame', $scope.previousText + $scope.textInput);
        } else { 
          $scope.socket.emit('endRound', num, $scope.previousText + $scope.textInput + "\n");  
        }
        $scope.textInput = '';
      } else {
        var currentScore = Score.getScore(Time.getTimerSeconds(), Time.getLastKeyPress());
        $rootScope.timer = Time.getTimerSeconds();
        var colorIndex = ColorIndexService.getRoundedIndex(currentScore, Score.getMaxScore());
        ColorIndexService.set(colorIndex);
        $scope.socket.emit('gameInfo', $scope.textInput, $rootScope.timer);
      }
    }, 100, 0);
  };

  $scope.socket.on('nextPlayer', function (player) {
    $scope.nextPlayer = player;
  });

  $scope.socket.on('sharedText', function (text, timer) {
    $scope.sharedText = text;
    $scope.timeDisplay = timer;
  });

  $scope.socket.on('nextRound', function(num, text) {
    var name = $scope.nextPlayer;
    $scope.nextPlayer = '';
    if (name === Session.getUser().username) { 
      $scope.roundRobin(num);
    }

    $scope.previousText = text || '';
  });

  $scope.socket.on('lockRoundRobin', function(name, num) {
    if (num === 5) {
      $scope.previousText = '';
    }
    $scope.currentPlayer = name;
    if (name !== Session.getUser().username) {
      $scope.timerDisplay(30);
    }
  });

  $scope.socket.on('userExit', function (user, username) {
    if ($scope.currentPlayer === username) {
      $scope.gameEnd();
    } else if ($scope.nextPlayer === username) {
      $scope.socket.emit('getNext',username);
    }
  });

  $scope.socket.on('gameEnd', function(text) {
    $scope.previousText = text;
    $scope.gameEnd();
  });

  $scope.gameEnd = function () {
    $scope.stopTimer();
    $scope.unsubmitted = true;
    $scope.gameOver = false;
    $scope.done = false;
  };

  $scope.cancelSession = function() {
    var duration = parseInt($scope.timerInput);
    $scope.stopTimer();
    $scope.done = true;
    setResults(duration);
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
    // Score.reset();
  };


  // For debugging purposes only. Generates a set of results to pass to the results page and/or server.
  // $scope.makeDebugResults = function() {

  //   var getRandomInt = function (min, max) {
  //     return Math.floor(Math.random() * (max - min)) + min;
  //   }

  //   var valuesObj = {};

  //   valuesObj.session_time = getRandomInt(1, 15);
  //   valuesObj.scores = [];
  //   valuesObj.text = "Hello I am the raw text";
  //   valuesObj.minuteScores = [];
  //   valuesObj.wpm = getRandomInt(30, 120);
  //   valuesObj.cpm = getRandomInt(40, 200);
  //   valuesObj.total = getRandomInt(1000, valuesObj.session_time*600000);
  //   valuesObj.possible = valuesObj.session_time * 60 * 10000;
  //   valuesObj.consistency = getRandomInt(0, 11) / 10;
  //   valuesObj.word_count = valuesObj.wpm * valuesObj.session_time;
  //   valuesObj.char_count = valuesObj.cpm * valuesObj.session_time;

  //   // generates random scores for each second
  //   for (var i = 0; i < valuesObj.session_time*60; i++) {
  //     var randomScore = getRandomInt(0, 10000);
  //     valuesObj.scores.push(randomScore);
  //   }
  //   // generates random scores for each minute
  //   for (var i = 0; i < valuesObj.session_time; i++) {
  //     var randomScore = getRandomInt(0, 60*10000);
  //     valuesObj.minuteScores.push(randomScore);
  //   }
    
  //   // Store generated results in the Results service for use on the Results page
  //   Results.setDuration(valuesObj.session_time);
  //   Results.setText(valuesObj.text);
  //   Results.setScores(valuesObj.scores);
  //   $scope.gameOver = true;

  //   // Uncomment to send generated results directly to the server
  //   // Results.postResults(valuesObj);
  // };

}]);
