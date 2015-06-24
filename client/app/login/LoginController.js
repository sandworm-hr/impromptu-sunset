app.controller('LoginController', ['$scope', 'Users', function ($scope, Users) {

  $scope.user = {};

  $scope.login = function () {
    Users.login($scope.user);
  };

}]);
