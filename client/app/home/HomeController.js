
app.controller('HomeController', ['$scope', '$interval', function($scope, $interval) {

  $scope.lastTime = 1;

  $scope.unsubmitted = true;

  $scope.timerInput = 15;

  $scope.scores = [];

  $scope.latestScore = 0;

  $scope.totalScore = 0;

  $scope.minute = 0;

  $scope.startTime;

  $scope.timer = 0;

  var start;

  $scope.setTime = function(event){
    $scope.lastTime = event.timeStamp;
  };

  var getTime = function() {
    var date = new Date();
    return date.getTime();
  };

  var updateMinute = function() {
    $scope.minute = Math.floor((getTime() - $scope.startTime) / 60000);
  };

  var getScore = function() {
    var score = 10000;
    var diff = getTime() - $scope.lastTime;

    if (diff > 2000 && diff <= 12000) {
      score -= (diff - 2000);
    } else if (diff > 12000) {
      score = 1;
    }

    updateMinute();

    $scope.scores[$scope.minute] += score;
    $scope.latestScore = score;
  };

  var createScoresArray = function(minutes) {
    var array = [];
    for (var i = 0; i < minutes; i++) {
      array.push(0);
    }
    return array;
  };

  var getTimer = function(elapsed) {
    var mins = (parseInt($scope.timerInput) - Math.floor(elapsed / 60000) - 1).toString();
    var seconds = (60 - Math.floor(((elapsed % 60000) / 1000)) - 1).toString();
    if (seconds.length === 1) seconds = '0' + seconds;

    return mins + ':' + seconds;
  }

  var checkForEnd = function(elapsed) {
    return elapsed >= parseInt($scope.timerInput) * 60000;
  }

  $scope.startTimer = function() {

    if (angular.isDefined(start)) return;

    var duration = parseInt($scope.timerInput);

    if (duration) {

      $scope.unsubmitted = false;

      // $scope.potentialSession = $scope.timerInput * 60 * 10000;
      $scope.startTime = getTime();
      $scope.scores = createScoresArray(duration);

      start = $interval(function() {
        var elapsed = getTime() - $scope.startTime;
        if (checkForEnd(elapsed)) {
          $scope.stopTimer();
        } else {
          getScore();
          $scope.timer = getTimer(elapsed);
        }
      }, 1000, 0);

    } else {
      console.log('invalid time');
    } 
  };

  $scope.stopTimer = function() {
    if (angular.isDefined(start)) {
      $interval.cancel(start);
      start = undefined;
    }
  };

}]);
