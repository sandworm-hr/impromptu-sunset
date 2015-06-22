
app.controller('HomeController', ['$scope', '$interval', function($scope, $interval) {

  $scope.lastTime = 1;

  $scope.timerInput = 15;

  $scope.scores = [];

  $scope.latestScore = 0;

  $scope.totalScore = 0;

  $scope.minute = 0;

  $scope.startTime;

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

  $scope.startTimer = function() {

    if (angular.isDefined(start)) return;

    var duration = parseInt($scope.timerInput);

    if (duration) {
      console.log('starting the timer');

      // $scope.potentialSession = $scope.timerInput * 60 * 10000;
      $scope.startTime = getTime();
      $scope.scores = createScoresArray(duration);

      start = $interval(getScore, 1000, 0);

    } else {
      console.log('invalid time');
    } 
  };

}]);
