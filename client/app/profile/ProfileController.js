app.controller('ProfileController', ['$scope', 'Sessions', function ($scope, Sessions) {

  $scope.sessions = {};

  $scope.getSessions = function () {
    Sessions.getSessions(function(data){
      $scope.sessions = data;
    });
  };

  $scope.getSessions();

}]);
