angular.module('app.services')
  .service('ColorIndexService', function() {

  var currentColorIndex;

  return {
    
    // returns current color index
    get: function() {
      return currentColorIndex;
    },

    // stores current color index
    set: function(value) {
      currentColorIndex = value;
    },

    // generates a number between 0 and 10, based on the score for this second
    getRoundedIndex : function(score, maxScore) {
      return Math.floor((score / maxScore) * 10);
    }
  }

    
});