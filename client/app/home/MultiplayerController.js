
app.controller('MultiplayerController', ['$scope', function($scope) {


  var socket = io.connect('http://localhost');

  $scope.username;

  $scope.colorIndex;

  $scope.sendUserData = function() {
    socket.emit('postUserUpdate', {username: $scope.username, colorIndex: $scope.colorIndex});
  };

  socket.on('getUserUpdate', function(data) {
    console.log(data);
  });
}]);