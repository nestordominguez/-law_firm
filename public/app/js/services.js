'use strict';

/* Services */

angular.module('myApp.services', [])
  .service('pageService', ["$http", function ($http) {
    return {
      show: function(link) {
        return $http({
          method: 'GET',
          url: 'http://localhost:3000/api/v1/pages' + link
        })
      }
    }
  }]);
