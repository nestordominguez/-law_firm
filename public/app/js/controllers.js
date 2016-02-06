'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('appController', ['$scope', '$routeParams', 'pageService', 'Auth',
    function($scope, $routeParams, pageService, Auth ) {

      Auth.currentUser().then(function(user) {
        $scope.isAuthenticated = function() {
          return Auth.isAuthenticated();
        }
      }, function(error) {

      })

      $scope.logout = function(user) {
        var config = {
              headers: {
                  'X-HTTP-Method-Override': 'DELETE'
              }
          };
          // Log in user...
          // ...
          Auth.logout(config).then(function(oldUser) {
              // alert(oldUser.name + "you're signed out now.");
          }, function(error) {
              // An error occurred logging out.
          });

          $scope.$on('devise:logout', function(event, oldCurrentUser) {
              // ...
        });
      }


      pageService.index().then(function(response) {
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
  .controller('showPageController', ['$scope', '$routeParams', 'pageService',
    function($scope, $routeParams, pageService) {

      pageService.show($routeParams.page_link)
      .then(function(response) {

        $scope.title = response.data.title;
        $scope.content = response.data.content;

      })
  }])

// login system

  .controller('signInUserController', ['$scope', '$location', 'Auth',
    function($scope, $location, Auth) {

    $scope.logIn = function(user) {
      var credentials = {
        email: user.email,
        password: user.password
      };
      var config = {
        headers: {
         'X-HTTP-Method-Override': 'POST'
        }
      }

      Auth.login(credentials, config).then(function(user) {

        $location.path("/pages");

        }, function(error) {

          $scope.msj = "ha ocurrido un error y no se pudo ingresar a su cuenta"
            // Authentication failed...
        });

        $scope.$on('devise:login', function(event, currentUser) {

        });

        $scope.$on('devise:new-session', function(event, currentUser) {

        });
    }

  }])

  .controller('signUpUserController', ['$scope', '$location', 'Auth',
    function($scope, $location, Auth) {
    $scope.signUp = function(user) {
      var credentials = {
            email: user.email,
            password: user.password,
            password_confirmation: user.password_confirmation
        };
      var config = {
            headers: {
                'X-HTTP-Method-Override': 'POST'
            }
        };

        Auth.register(credentials, config).then(function(registeredUser) {
            $location.path("/pages");
        }, function(error) {
            $scope.msj = "ha ocurrido un error y no se pudo crear la cuenta";
        });

        $scope.$on('devise:new-registration', function(event, user) {

        });

        $scope.$on('devise:login', function(event, currentUser) {

        });

        $scope.$on('devise:new-session', function(event, currentUser) {

        });
    }
  }]);
