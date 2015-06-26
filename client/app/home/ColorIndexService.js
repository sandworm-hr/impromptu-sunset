angular.module('app.services')
  .service('ColorIndexService', function() {

  var currentColorIndex;

  return {
    get: function() {
      return currentColorIndex;
    },
    set: function(value) {
      currentColorIndex = value;
    },
    getRoundedIndex : function(score, maxScore) {
      return Math.floor((score / maxScore) * 10);
    }
  }

    
});