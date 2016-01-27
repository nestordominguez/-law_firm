'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('firstPriority',[function() {
    return function(input) {
      if (input) {
        for (var i = input.length - 1; i >= 0; i--) {
          if (input[i].priority == 1) {
            return input[i].link
          };
        };
      };
    }
  }]);
