
app.controller('HomeController', ['$scope', '$interval', function($scope, $interval) {

  $scope.lastTime = 1;

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

    console.log(score);
  };


  $scope.timerInput = 15;

  $scope.scores = [4, 8, 10, 30];

  $scope.potentialSession = 0;

  $scope.latestScore = 0;

  $scope.totalScore = 0;

  $scope.minute = 3;

  $scope.startTime;

  $scope.startTimer = function() {
    // $interval.cancel(getScore);
    $scope.timerInput = parseInt($scope.timerInput);
    if ($scope.timerInput) {
      console.log('starting the timer');

      $scope.potentialSession = $scope.timerInput * 60 * 10000;
      $scope.startTime = getTime();

      $interval(getScore, 1000, 0);

      $scope.scores = [];
      for (var i = 0; i < $scope.timerInput; i++) {
        $scope.scores.push(0);
      };

    } else {
      console.log('invalid time');
    } 
  };

}]);
