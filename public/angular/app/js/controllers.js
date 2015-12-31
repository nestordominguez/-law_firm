'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('appController', ['$scope', '$routeParams', 'pagesService',
    function($scope, $routeParams, pagesService) {
    pagesService.async().then(function(data) {
      $scope.links = data;
      $scope.page_link = $routeParams.page_link;
      $scope.select = function(link) {
        return link === $routeParams.page_link ? 'active' : '';
      }
    });
  }])
  .controller('showController', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
      $http({
        method: 'GET',
        url: '/api/v1/pages/' + $routeParams.page_link
      }).then(function(response) {
        $scope.title = response.data.title;
        $scope.content = response.data.content;
      })
  }]);
