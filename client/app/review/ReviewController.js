
app.controller('ReviewController', ['$scope', '$stateParams', 'Review', 'Session', 'Sessions', function($scope, $stateParams, Review, Session, Sessions) {


  $scope.getSession = function (id) {
    Sessions.getSessionById(function(data){
      $scope.sessionInfo = data;
      $scope.editText = data.text;
      $scope.getComments(id);
    }, id);
  };

  $scope.saveComment = function() {
    if ($scope.commentInput !== '') {
      var comment = {};
      comment.comment = $scope.commentInput;
      comment.from = Session.getUser().userId;
      comment.UserId = $scope.sessionInfo.UserId;
      comment.SessionId = $scope.sessionInfo.id;
      console.log(comment);
      Review.postComment(comment)
        .success(function(data, status) {
           $scope.commentInput = '';
           // TO DO: display some sort of success message
        })
        .catch(function() {
          console.log('save failed');
       });
    }
  };

  $scope.getComments = function(id) {
    Review.getComments(id)
      .success(function(data, status) {
        console.log('got data from server: ', data);
        $scope.comments = data;
      })
      .catch(function() {
        console.log('failed to get comments');
      });
  };

  $scope.changeVisibility = function() {

  };

  $scope.saveEdits = function() {
    if ($scope.editText !== $scope.sessionInfo.text) {
      var edits = {};
      edits.text = $scope.editText;
      edits.id = $scope.sessionInfo.id;
      Sessions.editSession(edits)
        .success(function(data, status) {
          console.log('Success! Edits saved: ', data);
        })
        .catch(function() {
          console.log('Save failed');
        });
    }
  };

  $scope.editModeToggle = function() {
    $scope.editMode = !$scope.editMode;
  };

  $scope.editMode = false;
  $scope.comments = [];

  if ($stateParams.id) {
    $scope.getSession($stateParams.id);
  }

}]);
