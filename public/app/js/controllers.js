'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('appController', ['$scope', '$routeParams', '$route',
    'pageService', 'Auth', 'sendMsjServices', 'rolesService',
    function($scope, $routeParams, $route, pageService, Auth,
      sendMsjServices, rolesService) {
      // rolesService.setRol();

      $scope.isAuthenticated = function() {
        return Auth.isAuthenticated();
      }

      Auth.currentUser().then(function(user) {
        rolesService.setRol(user);
        $scope.isAuthenticated();
        $scope.reload = function() {
          rolesService.setRol(user);
          $scope.isAuthenticated();
        };
      })

      $scope.logout = function() {
        Auth.logout().then(function(oldUser) {
          sendMsjServices.setLocalSuccess("signed_out", oldUser.email);
          $scope.isAuthenticated();
          rolesService.setRol();
        }, function(error) {
            sendMsjServices.setHostError(error.data.error);
            $route.reload();
        });
        $scope.$on('devise:logout', function(event, oldCurrentUser) {
        });
      }

      pageService.index().then(function(response) {
        var links = [];
        for (var i = response.data.body.length - 1; i >= 0; i--) {
          links.push(response.data.body[i]);
        };
        $scope.links = links;
        $scope.page_link = $routeParams.page_link;
        $scope.select = function(link) {
          $scope.page_link = $routeParams.page_link;
          return link === $routeParams.page_link ? 'active' : '';
        }
      });
  }])

// page controller...

  .controller('indexPageController', ['$scope', '$route', 'pageService',
    function($scope, $route, pageService) {
    pageService.index().then(function(response) {
      $scope.pages = response.data.body;
    });

    $scope.id = function(id) {
      pageService.show(id).then(function(response) {
        $scope.link = response.data.link;
      });
      $scope.destroy = function() {
        pageService.destroy(id).then(function(response) {
          // sendMsjServices.setSuccess("response.data.base[0]");
          pageService.index().then(function(response) {
            $scope.pages = response.data.body;
          });
        }, function(error) {
          // sendMsjServices.setHostError("error.data.base[0]");
          $route.reload();
        })
      }
    }

  }])

  .controller('createPageController', ['$scope', '$location', 'Auth',
    'pageService', 'sendMsjServices', 'tinymce',
    function($scope, $location, Auth, pageService, sendMsjServices, tinymce) {

      $scope.tinymceOptions = tinymce;

      $scope.create = function(page) {
        pageService.ccreate(page).then(function(response) {
          sendMsjServices.setLocalSuccess("page_created");
          $location.path("/pages/index");
        });
      }

      Auth.currentUser().then(function(user) {
        if (user.role == 3 ) {
          $scope.create = function(page) {
            pageService.create(page).then(function(user) {
              $location.path("/pages/index");
            });
          }
        } else{
          sendMsjServices.setLocalError("unauthorized");
          $location.path("/pages");
        };
      }, function(error) {
        sendMsjServices.setHostError(error.data.error);
        $location.path("/users/sign_in");
      });
  }])

  .controller('showPageController', ['$scope', '$routeParams', '$sce', 'pageService',
    function($scope, $routeParams, $sce, pageService) {
      pageService.show($routeParams.page_link)
      .then(function(response) {
          $scope.title = response.data.title;
          $scope.content = $sce.trustAsHtml(response.data.content);
      })
  }])

  .controller('editPageController', ['$scope', '$routeParams', '$location',
    'pageService', 'sendMsjServices', 'tinymce',
    function($scope, $routeParams, $location, pageService, sendMsjServices, tinymce) {

      $scope.tinymceOptions = tinymce;

      pageService.show($routeParams.page).then(function(response) {
        $scope.page = response.data;
      });

      $scope.update = function(page) {
        pageService.edit(page).then(function(response) {
          sendMsjServices.setLocalSuccess("page_updated", response.data.link);
          $location.path("/pages/index");
        });
      };

  }])

// login system

  .controller('signInUserController', ['$scope', '$location', 'Auth',
    '$route', 'sendMsjServices', 'rolesService',
    function($scope, $location, Auth, $route, sendMsjServices, rolesService) {

    $scope.logIn = function(user) {
      var credentials = {
        email: user.email,
        password: user.password
      };

      Auth.login(credentials).then(function(user) {
          sendMsjServices.setLocalSuccess("signed_in", user.email);
          rolesService.setRol(user);
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
    'sendMsjServices', 'rolesService',
    function($scope, $location, $route, Auth, sendMsjServices, rolesService) {
      $scope.signUp = function(user) {
      var credentials = {
            email: user.email,
            password: user.password,
            password_confirmation: user.password_confirmation
        };

        Auth.register(credentials).then(function(registeredUser) {
          rolesService.setRol(registeredUser);
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
    '$routeParams', 'usersService', 'sendMsjServices', '$rootScope',
    function(Auth, $location, $scope, $routeParams, usersService, sendMsjServices,
      $rootScope) {
      Auth.currentUser().then(function(user) {
        usersService.show($routeParams.user).then(function(response) {
          if (!response.data.error) {
            $scope.user = response.data.body;
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
