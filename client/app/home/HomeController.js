
app.controller('HomeController', ['$scope', function($scope) {
  $scope.timerInput = 15;

  $scope.Flows = [4, 8, 10, 30];

  $scope.PotentialSession = 100;

  $scope.FlowSession = 70;

  $scope.PotentialMinute = 5;

  $scope.FlowMinute = 3;

  $scope.startTimer = function() {
    console.log('starting the timer');
  };


}]);
