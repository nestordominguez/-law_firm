'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }])
  .filter('priority',[function() {
    return function(input) {
      if (input) {
        for (var i = input.length - 1; i >= 0; i--) {
          if (input[i].priority == 0) {
            return input[i].link
          };
        };
      };
    }
  }]);
