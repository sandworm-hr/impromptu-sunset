app.controller('LoginController', ['$scope', 'Users', function ($scope, Users) {

  $scope.user = {};

  $scope.message;

  $scope.processLogin = function () {
    Users.login($scope.user)
      .then(function(data) {
      console.log('login was successful', data);
      })
      .catch(function(error) {
        $scope.message = error.data.message;
      });
  };

}]);
