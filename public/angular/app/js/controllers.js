'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('appController', ['$scope', 'pagesService', function($scope, pagesService) {
    pagesService.async().then(function(data) {
      $scope.links = data;
    });
  }])
  .controller('MyCtrl2', [function() {

  }]);
