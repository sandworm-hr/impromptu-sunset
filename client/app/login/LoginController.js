app.controller('LoginController', ['$scope', 'Users', function ($scope, Users) {

  $scope.user = {};

  $scope.message;

  $scope.status;

  // ERROR CODE GUIDE: (use this for testing)
  // 401 : User and/or Password incorrect
  // 200 : Login successful

  $scope.processLogin = function () {
    Users.login($scope.user)
      .success(function(data, status) {
        $scope.status = status;
        console.log($scope.status);
      })
      .catch(function(data) {
        $scope.message = data.data.message;
        $scope.status = data.status;
        console.log($scope.status);

      });
  };

}]);
