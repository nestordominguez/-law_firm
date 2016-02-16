'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'Devise',
  'ngScrollbars',
  'ui.validate'
])
.config(function($httpProvider){

    var interceptor = ['$location', '$rootScope', '$q', function($location, $rootScope, $q) {
        function success(response) {
            return response
        };

        function error(response) {
            if (response.status == 401) {
                $rootScope.$broadcast('event:unauthorized');
                $location.path('/users/login');
                return response;
            };
            return $q.reject(response);
        };

        return function(promise) {
            return promise.then(success, error);
        };
    }];
    $httpProvider.interceptors.push(interceptor);
    $httpProvider.defaults.withCredentials = true;
  })
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/pages', {
    templateUrl: 'views/pages/show.html',
    controller: 'showPageController'
  })
  .when('/users/sign_in', {
    templateUrl: 'views/users/devise/sign_in.html',
    controller: 'signInUserController'
  })
  .when('/users/sign_up', {
    templateUrl: 'views/users/devise/sign_up.html',
    controller: 'signUpUserController'
  })
  .when('/users/index', {
    templateUrl: 'views/users/index.html',
    controller: 'indexUserController'
  })
  .when('/users/show', {
    templateUrl: 'views/users/show.html',
    controller: 'showUserController'
  })
  .when('/users/edit', {
    templateUrl: 'views/users/edit.html',
    controller: 'editUserController'
  })
  .otherwise({redirectTo: '/pages'});
}])
.config(function(AuthProvider, AuthInterceptProvider) {
        // Customize login
        // AuthProvider.loginMethod('GET');
        AuthProvider.loginPath('https://localhost:3000/users/sign_in');

        // Customize logout
        AuthProvider.logoutMethod('DELETE');
        AuthProvider.logoutPath('https://localhost:3000/users/sign_out');

        // Customize register
        // AuthProvider.registerMethod('PATCH');
        AuthProvider.registerPath('https://localhost:3000/users');

        // Customize the resource name data use namespaced under
        // Pass false to disable the namespace altogether.
        // AuthProvider.resourceName('customer');

        // Customize user parsing
        // NOTE: **MUST** return a truth-y expression
        /*AuthProvider.parse(function(response) {
            return response.data.user;
        });*/

        // Intercept 401 Unauthorized everywhere
        // Enables `devise:unauthorized` interceptor
        // AuthInterceptProvider.interceptAuth(true);
    })
.config(function (ScrollBarsProvider) {
    // the following settings are defined for all scrollbars unless the
    // scrollbar has local scope configuration
    ScrollBarsProvider.defaults = {
        autoHideScrollbar: true,
        scrollButtons: {
            scrollAmount: 'auto', // scroll amount when button pressed
            enable: true // enable scrolling buttons by default
        },
        advanced:{
            updateOnContentResize: true
        },
        scrollInertia: 400, // adjust however you want
        axis: 'yx', // enable 2 axis scrollbars by default,
        theme: 'dark-thick',
        autoHideScrollbar: true,
        setHeight: 500
    };
});
