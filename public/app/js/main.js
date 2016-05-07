'use strict';

angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'Devise',
  'ngScrollbars',
  'ui.tinymce'
])
.config(function($httpProvider){

    var interceptor = ['$location', '$rootScope', '$q', function($location, $rootScope, $q) {
        function success(response) {
            return response
        };

        function error(response) {
            if (response.status == 401) {
                $rootScope.$broadcast('event:unauthorized');
                $location.path('/users/sign_in');
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
  .when('/pages/index', {
    templateUrl: 'views/pages/index.html',
    controller: 'indexPageController',
    data: {authorized: [3]}
  })
  .when('/pages', {
    templateUrl: 'views/pages/show.html',
    controller: 'showPageController',
    data: {authorized: [3, 2, 1, 0]}
  })
  .when('/pages/create', {
    templateUrl: 'views/pages/create.html',
    controller: 'createPageController',
    data: {authorized: [3]}
  })
  .when('/pages/edit', {
    templateUrl: 'views/pages/edit.html',
    controller: 'editPageController',
    data: {authorized: [3]}
  })
  .when('/users/sign_in', {
    templateUrl: 'views/users/devise/sign_in.html',
    controller: 'signInUserController',
    data: {authorized: [3,2,1,0]}
  })
  .when('/users/sign_up', {
    templateUrl: 'views/users/devise/sign_up.html',
    controller: 'signUpUserController',
    data: {authorized: [3,2,1,0]}
  })
  .when('/users/index', {
    templateUrl: 'views/users/index.html',
    controller: 'indexUserController',
    data: {authorized: [3]}
  })
  .when('/users/show', {
    templateUrl: 'views/users/show.html',
    controller: 'showUserController',
    data: {authorized: [3]}
  })
  .when('/users/edit', {
    templateUrl: 'views/users/edit.html',
    controller: 'editUserController',
    data: {authorized: [3]}
  })
  .when('/messages/index', {
    templateUrl: 'views/messages/index.html',
    controller: 'indexMessageController',
    data: {authorized: [3, 2]}
  })
  .when('/messages/show', {
    templateUrl: 'views/messages/show.html',
    controller: 'showMessageController',
    data: {authorized: [3, 2]}
  })
  .when('/messages/create', {
    templateUrl: 'views/messages/create.html',
    controller: 'createMessageController',
    data: {authorized: [3, 2, 1 ,0]}
  })
  .when('/staff/index', {
    templateUrl: 'views/staff/index.html',
    controller: 'indexStaffController',
    data: {authorized: [3, 2, 1 ,0]}
  })
  .when('/staff/create', {
    templateUrl: 'views/staff/create.html',
    controller: 'createStaffController',
    data: {authorized: [3]}
  })
  .otherwise({redirectTo: '/pages', data: {authorized: [0,1,2,3]}});
}])
.config(function(AuthProvider, AuthInterceptProvider) {
        AuthProvider.loginPath('https://localhost:3000/users/sign_in');
        AuthProvider.logoutPath('https://localhost:3000/users/sign_out');
        AuthProvider.registerPath('https://localhost:3000/users');
    })
.run(['$location', '$rootScope', 'rolesService', 'Auth',
  function($location, $rootScope, rolesService, Auth) {
    $rootScope.$on('$routeChangeStart', function(event ,next) {

      function config() {
          var authorized;
          function set() {
            authorized = false;
            if (next.data) {
              for (var i = 0; i < next.data.authorized.length; i++) {
                if (next.data.authorized[i] == rolesService.getRol()) {
                  authorized = true;
                }
              }
            }
          }

          function get() {
            return authorized;
          }

          set();
          if (!get()) {
            switch(rolesService.getRol()) {
              case 0:
                $location.path("/users/sign_in");
                break;
              case 1:
              case 2:
                $location.path("/pages");
                break;
            }
          }
      }

      Auth.currentUser().then(function(user) {
        rolesService.setRol(user);
        config();
      }, function(error) {
        rolesService.setLocalRol(0);
        config();
      });
    });

}])
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
        theme: 'thick',
        autoHideScrollbar: true,
        setHeight: 500
    };
});
