'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('appController', ['$scope', '$routeParams', '$route',
    'pageService', 'Auth', 'sendMsjServices', 'linksService',
    function($scope, $routeParams, $route, pageService, Auth,
      sendMsjServices, linksService) {

      Auth.currentUser().then(function(user) {
        $scope.isAuthenticated();
        $scope.reload = function() {
          $scope.isAuthenticated();
        };
      })

      $scope.isAuthenticated = function() {
        return Auth.isAuthenticated();
      }

      $scope.logout = function() {
        Auth.logout().then(function(oldUser) {
          sendMsjServices.setLocalSuccess("signed_out", oldUser.email);
          $scope.isAuthenticated();
        }, function(error) {
            sendMsjServices.setHostError(error.data.error);
            $route.reload();
        });
        $scope.$on('devise:logout', function(event, oldCurrentUser) {
        });
      }
      $scope.$on('$routeChangeStart', function() {
        pageService.index().then(function(response) {
          var links = [];
          for (var i = response.data.body.length - 1; i >= 0; i--) {
            links.push(response.data.body[i]);
          };

          linksService.setLink(links);
          $scope.links = linksService.getLink();
          $scope.page_link = $routeParams.page_link;
          $scope.select = function(link) {
            $scope.page_link = $routeParams.page_link;
            return link === $routeParams.page_link ? 'active' : '';
          }
        });

      });
  }])

// page controller...

  .controller('indexPageController', ['$scope', '$route', 'pageService',
    'linksService',
    function($scope, $route, pageService, linksService) {
    pageService.index().then(function(response) {
      $scope.pages = response.data.body;
    });

    $scope.id = function(id) {
      pageService.show(id).then(function(response) {
        $scope.link = response.data.link;
      });
      $scope.destroy = function() {
        pageService.destroy(id).then(function(response) {
          pageService.index().then(function(response) {
            $scope.pages = response.data.body;
            console.log(response.data.body);
            // $route.reload();
            // linksService.setLink(response.data.body);
          });
        }, function(error) {
          $route.reload();
        })
      }
    }

  }])

  .controller('createPageController', ['$scope', '$location', 'Auth',
    'pageService', 'sendMsjServices', 'tinymce',
    function($scope, $location, Auth, pageService, sendMsjServices, tinymce) {

      $scope.tinymceOptions = tinymce;

      Auth.currentUser().then(function(user) { // continue changing new validations
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
        if (response.data) {
          $scope.page = response.data;
          $scope.title = response.data.title;
          $scope.content = $sce.trustAsHtml(response.data.content);
        } else {
          $scope.page = "";
          $scope.title = "";
          $scope.content = "";
        }
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
  }])

// message system
  .controller('indexMessageController', ['$scope', 'messagesService',
    function($scope, messagesService) {
    messagesService.index().then(function(response) {
      $scope.messages = response.data.body;
    });
  }])
  .controller('showMessageController', ['$scope', '$routeParams',
    'messagesService',
    function($scope, $routeParams, messagesService) {
    messagesService.show($routeParams.id).then(function(response) {
      $scope.message = response.data.body;
    });
  }])
  .controller('createMessageController', ['$scope', 'messagesService',
    function($scope, messagesService) {
    // body...// finish this
  }]);
