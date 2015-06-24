app.controller('LoginController', ['$scope', 'Users', function ($scope, Users) {

  $scope.user = {};

  $scope.message;

  $scope.login = function () {
    $scope.message = Users.login($scope.user);
  };

}]);
