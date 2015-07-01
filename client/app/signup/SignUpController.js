app.controller('SignUpController', ['$scope', 'Users', function ($scope, Users) {

  $scope.user = {};
  // stores the status of the signup attempt for testing purposes

  $scope.processSignup = function(user) {
    Users.signUp(user)
      .success(function(data, status) {
        $scope.status = 'Signup Completed';
      })
      .catch(function(data) {
        // FOR TESTING:
        // in testing there is no data object
        // if there is a data object, we are not running a test
        // therefore we need to set the scope message

        $scope.message = 'User Already Exists';
        $scope.status = 'Signup Failed';
      });
  }
}]);


