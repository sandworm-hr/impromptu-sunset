
app.controller('ReviewController', ['$scope', '$stateParams', 'Review', 'Session', 'Sessions', function($scope, $stateParams, Review, Session, Sessions) {


  $scope.getSession = function (id) {
    Sessions.getSessionById(function(data){
      $scope.sessionInfo = data;
      $scope.editText = data.text;
      $scope.visibility = data.visibility;
      $scope.getComments(id);
      $scope.isCurrentUser = Session.getUser().userId === $scope.sessionInfo.UserId;
    }, id);
  };

  $scope.saveComment = function() {
    if ($scope.commentInput !== '') {
      var comment = {};
      comment.comment = $scope.commentInput;
      comment.from = Session.getUser().userId;
      comment.UserId = $scope.sessionInfo.UserId;
      comment.SessionId = $scope.sessionInfo.id;
      Review.postComment(comment)
        .success(function(data, status) {
           $scope.commentInput = '';
           $scope.getComments($stateParams.id);
           // TO DO: display some sort of success message
        })
        .catch(function() {
          console.log('save failed');
       });
    }
  };

  $scope.isCurrentUser = function() {
   return $scope.sessionInfo && (Session.getUser().userId === $scope.sessionInfo.id);
  };

  $scope.getComments = function(id) {
    Review.getComments(id)
      .success(function(data, status) {
        $scope.comments = data;
      })
      .catch(function() {
        console.log('failed to get comments');
      });
  };

  $scope.changeVisibility = function() {
   var newVisibility = $scope.visibility === 'public' ? 'private' : 'public';
   Sessions.editSession({id: $scope.sessionInfo.id, visibility: newVisibility})
     .success(function(data, status) {
       $scope.visibility = newVisibility;
     })
     .catch(function() {
      console.log('Failed to change visibility');
     })
  };

  $scope.saveEdits = function() {
    if ($scope.editText !== $scope.sessionInfo.text) {
      var edits = {};
      edits.text = $scope.editText;
      edits.id = $scope.sessionInfo.id;
      Sessions.editSession(edits)
        .success(function(data, status) {
          $scope.editMode = false;
          $scope.getSession($stateParams.id);
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
  $scope.isCurrentUser = false;

  if ($stateParams.id) {
    $scope.getSession($stateParams.id);
  }

}]);
