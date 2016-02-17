'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('appController', ['$scope', '$routeParams', '$route',
    'pageService', 'Auth', 'sendMsjServices',
    function($scope, $routeParams, $route, pageService, Auth,
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
        Auth.logout().then(function(oldUser) {
            Auth.currentUser().then(function(user) {
              $scope.isAuthenticated();
            })
        }, function(error) {
            sendMsjServices.setHostError(error.data.error);
            $route.reload();
        });
        $scope.$on('devise:logout', function(event, oldCurrentUser) {
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
    '$route', 'sendMsjServices',
    function($scope, $location, Auth, $route, sendMsjServices) {

    $scope.logIn = function(user) {
      var credentials = {
        email: user.email,
        password: user.password
      };

      Auth.login(credentials).then(function(user) {
          $location.path("/pages");
        }, function(error) {
          sendMsjServices.setHostError(error.data.error);
          $route.reload();
        });
        $scope.$on('devise:login', function(event, currentUser) {
        });
        $scope.$on('devise:new-session', function(event, currentUser) {
        });
    }

  }])

  .controller('signUpUserController', ['$scope', '$location', '$route', 'Auth',
    'sendMsjServices',
    function($scope, $location, $route, Auth, sendMsjServices) {
      $scope.signUp = function(user) {
      var credentials = {
            email: user.email,
            password: user.password,
            password_confirmation: user.password_confirmation
        };

        Auth.register(credentials).then(function(registeredUser) {
            $location.path("/pages");
        }, function(error) {
          sendMsjServices.setHostError(error.data.error);
          $route.reload();
        });

        $scope.$on('devise:new-registration', function(event, user) {
        });
        $scope.$on('devise:login', function(event, currentUser) {
        });
        $scope.$on('devise:new-session', function(event, currentUser) {
        });
    }
  }])

  .controller('indexUserController', ['$route', '$location', '$scope', 'Auth',
    'usersService', 'sendMsjServices',
    function($route, $location, $scope, Auth, usersService, sendMsjServices) {
      Auth.currentUser().then(function(user) {
          usersService.index().then(function(response) {
            if (!response.data.error) {
              $scope.users = response.data.body;
            } else {
              sendMsjServices.setHostError(response.data.error);
              $location.path("/users/pages");
            };
          });

          $scope.id = function(id) {
            usersService.show(id).then(function(response) {
              $scope.email = response.data.body.email;
            });
            $scope.destroy = function() {
              usersService.destroy(id).then(function(response) {
                sendMsjServices.setSuccess(response.data.base[0]);
                usersService.index().then(function(response) {
                  $scope.users = response.data.body;
                });
              }, function(error) {
                sendMsjServices.setHostError(error.data.base[0]);
                $route.reload();
              })
            }
          }


      }, function(error) {
        sendMsjServices.setHostError(error.data.error);
        $location.path("/users/sign_in");
      })
  }])

  .controller('showUserController', ['$location', '$scope', '$routeParams',
    'usersService', 'Auth', 'sendMsjServices',
    function($location, $scope, $routeParams, usersService, Auth, sendMsjServices) {
      Auth.currentUser().then(function(user) {
        usersService.show($routeParams.user).then(function(response) {
          if (!response.data.error) {
            $scope.user = response.data.body;
          } else{
            sendMsjServices.setHostError(response.data.error);
            $location.path("/users/pages");
          };
        })
      }, function(error) {
        sendMsjServices.setHostError(error.data.error);
        $location.path("/users/sign_in");
    });
  }])

  .controller('editUserController', ['Auth', '$location', '$scope',
    '$routeParams', 'usersService', 'sendMsjServices', '$rootScope', '$timeout',
    function(Auth, $location, $scope, $routeParams, usersService, sendMsjServices,
      $rootScope, $timeout) {
      Auth.currentUser().then(function(user) {
        usersService.show($routeParams.user).then(function(response) {
          if (!response.data.error) {
            $scope.user = response.data;
          } else{
            sendMsjServices.setHostError(response.data.error);
            $location.path("/pages");
          };
        });
      }, function(error) {
        sendMsjServices.setHostError(error.data.error);
        $location.path("/users/sign_in");
      })
      $scope.update = function(user) {
        usersService.edit(user).then(function(response) {
          $location.path("/users/show");
        })
      }
  }]);
