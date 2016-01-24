'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pages', {
    templateUrl: 'views/pages/show.html',
    controller: 'showController'
  });
  $routeProvider.otherwise({redirectTo: '/pages'});
}]);