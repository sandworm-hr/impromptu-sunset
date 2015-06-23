
app.controller('MultiplayerController', ['$scope', function($scope) {


  var socket = io.connect('http://localhost');

  $scope.sendUserData = function() {
    socket.emit('postUserUpdate', {username: 'jd', colorIndex: 8});
  };
}]);