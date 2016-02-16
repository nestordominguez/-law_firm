'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('appController', ['$scope', '$routeParams', '$timeout',
    'pageService', 'Auth', 'sendMsjServices',
    function($scope, $routeParams, $timeout, pageService, Auth,
      sendMsjServices) {
      $scope.isAuthenticated = function() {
        return Auth.isAuthenticated();
      }
      Auth.currentUser().then(function(user) {
        $scope.isAuthenticated();
        $scope.reload = function() {
          $scope.isAuthenticated();
        };
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
              Auth.currentUser().then(function(user) {
                $scope.isAuthenticated();
              })
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
    'sendMsjServices',
    function($scope, $location, Auth, sendMsjServices) {

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
          sendMsjServices.setError("errorLoguin");
          $location.path("/users/sign_in");
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
  }])
  .controller('indexUserController', ['$location', 'Auth', '$scope',
    'usersService', 'sendMsjServices',
    function($location, Auth, $scope, usersService, sendMsjServices) {
      Auth.currentUser().then(function(user) {
        if (user.superuser == true) {
          usersService.index().then(function(response) {
            $scope.users = response.data;
          });
          $scope.id = function(id) {
            usersService.show(id).then(function(response) {
              $scope.email = response.data.email;
            });
            $scope.destroy = function() {
              usersService.destroy(id).then(function(response) {
                usersService.index().then(function(response) {
                  $scope.users = response.data;
                });
              })
            }
          }
        } else{
          sendMsjServices.setError("unautorized")
          $location.path("/users/pages");
        };
      }, function(error) {
        sendMsjServices.setError("unlogued");
        $location.path("/users/sign_in");
      })
  }])
  .controller('showUserController', ['$location', '$scope', '$routeParams',
    'usersService', 'Auth', 'sendMsjServices',
    function($location, $scope, $routeParams, usersService, Auth, sendMsjServices) {
      Auth.currentUser().then(function(user) {
        if (user.superuser == true) {
          usersService.show($routeParams.user).then(function(response) {
            $scope.user = response.data;
          })
        } else {
          sendMsjServices.setError("unautorized");
          $location.path("/users/pages");
        };
      }, function(error) {
        sendMsjServices.setError("unautorized");
        $location.path("/users/sign_in");
    });
  }])
  .controller('editUserController', ['Auth', '$location', '$scope',
    '$routeParams', 'usersService', 'sendMsjServices', '$rootScope', '$timeout',
    function(Auth, $location, $scope, $routeParams, usersService, sendMsjServices,
      $rootScope, $timeout) {
      Auth.currentUser().then(function(user) {
        if (user.superuser == true) {
          usersService.show($routeParams.user).then(function(response) {
            $scope.user = response.data;
          });
        } else{
          sendMsjServices.setError("unautorized");
          $location.path("/pages");
        };
      }, function(error) {
        sendMsjServices.setError("unlogued");
        $location.path("/users/sign_in");
      })
      $scope.update = function(user) {
        usersService.edit(user).then(function(response) {
          $location.path("/users/show");
        })
      }
  }]);
