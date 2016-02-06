'use strict';

/* Services */

angular.module('myApp.services', [])
  .service('pageService', ["$http", function ($http) {

    var baseDir = 'https://localhost:3000/api/v1/pages/';

    return {

      index: function() {
        return $http({
          method: 'GET',
          url: baseDir
        })
      },

      show: function(link) {
        return $http({
          method: 'GET',
          url: baseDir + link
        })
      }

    }

  }]);
