
app.controller('ReviewController', ['$scope', '$stateParams', 'Sessions', function($scope, $stateParams, Sessions) {


  $scope.getSession = function (id) {
    Sessions.getSessionById(function(data){
      console.log(data);
      $scope.textInput = data.text;
    }, id);
  };

  if ($stateParams.id) {
    $scope.getSession($stateParams.id);
  }

}]);
