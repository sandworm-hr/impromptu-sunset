
app.controller('HomeController', ['$scope', function($scope, $interval) {

  $scope.lastTime = 1;

  $scope.setTime = function(event){
    $scope.lastTime = event.timeStamp;
  }

  var getTime = function() {
    var date = new Date();
    return date.getTime();
  }

  var getScore = function() {
    var score = 10000;
    var diff = getTime() - $scope.lastTime;

    if (diff > 2000 && diff <= 12000) {
      score -= (diff - 2000);
    } else if (diff > 12000) {
      score = 1;
    }
    $scope.totalFlow += score;
    console.log(score);
  }

  // $interval(getScore, 1000, 0);
  
  $scope.timerInput = 15;

  $scope.Flows = [4, 8, 10, 30];

  $scope.PotentialSession = 100;

  $scope.FlowSession = 70;

  $scope.totalFlow = 0;

  $scope.FlowMinute = 3;

  $scope.startTime;

  $scope.startTimer = function() {
    $scope.startTime = getTime();
    console.log('starting the timer');
    setInterval(getScore, 1000);
  };

}]);
