'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'Devise'
])
.config(function($httpProvider){
  /*$httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');*/

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
  })
.config(function($httpProvider) {
  /*var interceptor = function($q, $rootScope, Auth) {
    return {
      'response': function(resp) {
        if (resp.config.url == '/users/sign_in') {
          Auth.setToken(resp.data.token);
        };
      },
      'responseError': function(rejection) {
        switch(rejection.status) {
          case 401:
            if (rejection.config.url !== '/users/sign_in') {
              $rootScope.$broadcast('auth:loginRequired');
            };
            break;
          case 403:
            $rootScope.$broadcast('auth:forbidden');
            break;
          case 404:
            $rootScope.$broadcast('page:notFound');
            break;
          case 500:
            $rootScope.$broadcast('server:error');
            break;
        }
        return $q.reject(rejection);
      }
    }
  }
  $httpProvider.interceptors.push(interceptor);*/
  /*$httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');*/
})
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/pages', {
    templateUrl: 'views/pages/show.html',
    controller: 'showPageController'
  })
  .when('/users/sign_in', {
    templateUrl: 'views/users/sign_in.html',
    controller: 'signInUserController'
  })
  .when('/users/sign_up', {
    templateUrl: 'views/users/sign_up.html',
    controller: 'signUpUserController'
  })
  .otherwise({redirectTo: '/pages'});
}])
.config(function(AuthProvider, AuthInterceptProvider) {
        // Customize login
        // AuthProvider.loginMethod('GET');
        AuthProvider.loginPath('https://localhost:3000/users/sign_in');

        // Customize logout
        // AuthProvider.logoutMethod('POST');
        // AuthProvider.logoutPath('/user/logout.json');

        // Customize register
        /*AuthProvider.registerMethod('PATCH');
        AuthProvider.registerPath('/user/sign_up.json');*/

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
    });
