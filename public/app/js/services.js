'use strict';

/* Services */

angular.module('myApp.services', [])
.factory('uniqueService', ['$http', function($http) {
  var dataFactory = {}
  dataFactory.checkUniqueValue = function(user) {
      return  $http({
        method: 'GET',
        url: 'https://localhost:3000/api/v1/users/unique/' + user
      });
  }
  return dataFactory;
}])
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
  // .factory('uniqueService', ['$http', function($http) {
  //   var dataFactory = {}
  //   dataFactory.checkUniqueValue = function(property, user) {
  //   };
  // }]);
