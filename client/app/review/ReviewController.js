
app.controller('ReviewController', ['$scope', '$stateParams', 'Sessions', function($scope, $stateParams, Sessions) {


  $scope.getSession = function (id) {
    Sessions.getSessionById(function(data){
      $scope.sessionInfo = data;
    }, id);
  };

  if ($stateParams.id) {
    $scope.getSession($stateParams.id);
  }

}]);
