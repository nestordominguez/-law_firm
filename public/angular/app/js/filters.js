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
  }])
  .filter('orderByPriority', [function() {
    return function(items) {
      if (items) {
        var newItem = [];
        var lowPriority;
        for (var i = items.length - 1; i >= 0; i--) {
          if (items[i].priority != 0 ) {
            lowPriority = items[i].priority;
            for (var j = items.length - 1; j >= 0; j--) {
              if (items[i].priority > items[j].priority) {
                lowPriority = items[j].priority
              };
            };
            newItem.push(lowPriority);
          };
        };
        return newItem;
      };
    };
  }]);;
