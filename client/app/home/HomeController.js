
app.controller('HomeController', ['$scope', function($scope) {
  $scope.timerInput = 15;

  $scope.currentFlows = [4, 8, 10, 30];

  $scope.currentPotentialSession = 100;

  $scope.currentFlowSession = 70;

  $scope.currentPotentialMinute = 5;

  $scope.currentFlowMinute = 3;

  $scope.startTimer = function() {
    console.log('starting the timer');
  };


}]);