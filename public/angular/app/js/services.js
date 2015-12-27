'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1')
  .factory('pagesService', ["$http", function($http) {
    var pagesService = {
      async: function() {
        var promise = $http({
          method: 'GET',
          url: '/api/v1/pages'
        }).then(function(response) {
          var links = [];
          for (var i = response.data.length - 1; i >= 0; i--) {
            links.push(response.data[i].link) ;
          };
          return links;
        });
        return promise;
        }
      }

    return pagesService;
  }]);
