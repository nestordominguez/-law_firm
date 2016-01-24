'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('appController', ['$scope', '$routeParams', 'pageService',
    function($scope, $routeParams, pageService) {

      pageService.show("").then(function(response) {

        var links = [];
          for (var i = response.data.length - 1; i >= 0; i--) {
            links.push(response.data[i]);
          };

        $scope.links = links;
        $scope.page_link = $routeParams.page_link;

        $scope.select = function(link) {
          return link === $routeParams.page_link ? 'active' : '';
        }
      });

  }])
  .controller('showController', ['$scope', '$routeParams', 'pageService',
    function($scope, $routeParams, pageService) {

      pageService.show("/" + $routeParams.page_link)
      .then(function(response) {

        $scope.title = response.data.title;
        $scope.content = response.data.content;

      })
  }]);
