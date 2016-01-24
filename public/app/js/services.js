'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .service('pagesService', ["$http", function($http) {
    /*var pagesService = {
      async: function() {
        var promise = $http({
          method: 'GET',
          url: 'http://localhost:3000/api/v1/pages'
        }).then(function(response) {
          var links = [];
          for (var i = response.data.length - 1; i >= 0; i--) {
            links.push(response.data[i]) ;
          };
          return links;
        });
        return promise;
        }
      }
    return pagesService;*/

    var promise = $http({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/pages'
    });
    return promise;
  }]);
