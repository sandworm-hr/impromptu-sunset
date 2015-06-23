app.controller('SignUpController', ['$scope', 'Users', function ($scope, Users) {

  $scope.user = {};

  $scope.signup = function() {
    Users.signUp($scope.user)
  };

}]);


