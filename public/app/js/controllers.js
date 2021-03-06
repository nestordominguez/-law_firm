'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('appController', ['$scope', '$routeParams', 'Auth',
  'sendMsjServices', 'pageService', 'rolesService',
    function($scope, $routeParams, Auth, sendMsjServices, pageService,
      rolesService) {

      $scope.isAuthenticated = function() {
        return Auth.isAuthenticated();
      }
      Auth.currentUser().then(function(user) {
        rolesService.setRol(user);
        $scope.role = rolesService.getRol();
        $scope.admin = function(){
          return rolesService.getRol() == 2;
        };
        $scope.superuser = function(){
          return rolesService.getRol() == 3;
        };
      }, function(error) {
        rolesService.setLocalRol(0);
        $scope.role = rolesService.getRol();
      });
      $scope.logout = function() {
        var config = {
          headers: {
            'X-HTTP-Method-Override': 'DELETE'
          }
        };
        Auth.logout(config).then(function(oldUser) {
          sendMsjServices.setLocalSuccess("signed_out", oldUser.email);
          Auth.logout().then(function () {});
          $scope.$broadcast('send-msj', function() {
          });
          $route.reload();
        }, function(error) {
          sendMsjServices.setHostError(error.data.error);
        });
      }

      pageService.index().then(function(response) {
        var links = [];
        for (var i = response.data.length - 1; i >= 0; i--) {
          links.push(response.data[i]);
        };
        $scope.links = links;
      });

      $scope.$on("update:links", function() {
          pageService.index().then(function(response) {
          var links = [];
          for (var i = response.data.length - 1; i >= 0; i--) {
            links.push(response.data[i]);
          };
          $scope.links = links;
        });

      })
      $scope.page_link = $routeParams.page_link;
      $scope.select = function(link) {
        $scope.page_link = $routeParams.page_link;
        return link === $routeParams.page_link ? 'active' : '';
      }
  }])

// page controller...

  .controller('indexPageController', ['$scope', '$route', 'pageService',
    function($scope, $route, pageService) {
    pageService.index().then(function(response) {
      $scope.pages = response.data;
    });

    $scope.id = function(id) {
      pageService.show(id).then(function(response) {
        $scope.link = response.data.link;
      });
      $scope.destroy = function() {
        pageService.destroy(id).then(function(response) {
          pageService.index().then(function(res) {
            $scope.pages = res.data;
            $scope.$emit("update:links", function() {
            });
            $route.reload();
          });
        }, function(error) {
          $route.reload();
        })
      }
    }

  }])

  .controller('createPageController', ['$scope', '$location', 'pageService',
    'tinymce',
    function($scope, $location, pageService, tinymce) {
      $scope.tinymceOptions = tinymce;
      pageService.priorityAvailable().then(function(response) {
        var list_available = response.data.body
        list_available.push(response.data.body[list_available.length -1] +1);
        $scope.list_available = list_available;
      });
      $scope.create = function(page) {
        pageService.create(page).then(function(page) {
          $scope.$emit("update:links", function() {
          });
          $location.path("/pages/index");
        }, function(error) {
        });
      }
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

      pageService.priorityAvailable().then(function(response) {
        $scope.list_available = response.data.body;
      });

      $scope.update = function(page) {
        pageService.edit(page).then(function(response) {
          sendMsjServices.setLocalSuccess("page_updated", response.data.link);
          $scope.$emit("update:links", function() {
          });
          $location.path("/pages/index");
        });
      };

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
      };

      Auth.login(credentials, config).then(function(user) {
        sendMsjServices.setLocalSuccess("signed_in", user.email);
        $scope.$emit('send-msj', function() {
        });
        $location.path("/pages");
      }, function(error) {
        sendMsjServices.setHostError(error.data.error);
        $scope.$emit('send-msj', function() {
        });
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

        var config = {
            headers: {
                'X-HTTP-Method-Override': 'POST'
            }
        };

        Auth.register(credentials, config).then(function(registeredUser) {
          rolesService.setRol(user);
          sendMsjServices.setLocalSuccess("signed_up");
          $scope.$emit('send-msj', function() {
          });
          $location.path("/pages");
        }, function(error) {
          sendMsjServices.setHostError(error.data.error);
          $route.reload();
        });
      }
  }])

  .controller('indexUserController', ['$route', '$location', '$scope',
    'usersService', 'sendMsjServices', 'rolNameService',
    function($route, $location, $scope, usersService, sendMsjServices,
      rolNameService) {
          usersService.index().then(function(response) {
            if (!response.data.error) {
              var users = response.data;
              for (var i = 0; i < users.length; i++) {
                rolNameService.set(users[i].role);
                users[i].role = rolNameService.get();
              }
              $scope.users = users;
            } else {
              sendMsjServices.setHostError(response.data.error);
              $location.path("/users/pages");
            };
          });
          $scope.id = function(id) {
            usersService.show(id).then(function(response) {
              $scope.email = response.data.email;
            });
            $scope.destroy = function() {
              usersService.destroy(id).then(function(response) {
                sendMsjServices.setSuccess(response.data.base[0]);
                usersService.index().then(function(response) {
                  if (!response.data.error) {
                    var users = response.data;
                    for (var i = 0; i < users.length; i++) {
                      rolNameService.set(users[i].role);
                      users[i].role = rolNameService.get();
                    }
                    $scope.users = users;
                  } else {
                    sendMsjServices.setHostError(response.data.error);
                    $location.path("/users/pages");
                  };
                });
              }, function(error) {
                sendMsjServices.setHostError(error.data.base[0]);
                $route.reload();
              })
            }
          }

  }])

  .controller('showUserController', ['$location', '$scope', '$routeParams',
    'usersService', 'sendMsjServices', 'rolNameService',
    function($location, $scope, $routeParams, usersService, sendMsjServices,
      rolNameService) {
        usersService.show($routeParams.user).then(function(response) {
          if (!response.data.error) {
            rolNameService.set(response.data.role);
            $scope.user = response.data;
            $scope.user.role = rolNameService.get();
          } else{
            sendMsjServices.setHostError(response.data.error);
            $location.path("/users/pages");
          };
        })

  }])

  .controller('editUserController', ['$location', '$scope',
    '$routeParams', 'usersService', 'sendMsjServices', 'rolNameService',
    function($location, $scope, $routeParams, usersService, sendMsjServices,
      rolNameService) {
        usersService.show($routeParams.user).then(function(response) {
          if (!response.data.error) {
            $scope.user = response.data;
            rolNameService.set(response.data.role);
            $scope.user.role = rolNameService.get();
            $scope.options = rolNameService.getOptions();
          } else{
            sendMsjServices.setHostError(response.data.error);
            $location.path("/pages");
          };
        });
      $scope.update = function(user) {
        rolNameService.setNameToRole(user.role);
        user.role = rolNameService.getNameToRole();
        usersService.edit(user).then(function(response) {
          $location.path("/users/show");
        })
      }
  }])

// message system
  .controller('indexMessageController', ['$scope', '$route', 'messagesService',
    function($scope, $route, messagesService) {
          messagesService.index().then(function(response) {
              $scope.messages = response.data;
            if (!response.data.error) {
            } else {
              $location.path("/messages/index");
            };
          });

          $scope.id = function(id) {
            messagesService.show(id).then(function(response) {
              $scope.name = response.data.name;
            });
            $scope.destroy = function() {
              messagesService.destroy(id).then(function(response) {
                messagesService.index().then(function(response) {
                  $scope.users = response.data;
                  $route.reload();
                });
              }, function(error) {
                $route.reload();
              })
            }
          }

  }])
  .controller('showMessageController', ['$scope', '$routeParams',
    'messagesService',
    function($scope, $routeParams, messagesService) {
    messagesService.show($routeParams.id).then(function(response) {
      $scope.message = response.data;
    });
  }])
  .controller('createMessageController', ['$scope', 'messagesService', '$route',
    function($scope, messagesService, $route) {
    $scope.create = function(message) {
      messagesService.create(message).then(function(response) {
        $route.reload();
      })
    }
  }])
  .controller('indexStaffController', ['$scope',function($scope) {
  }])
  .controller('createStaffController', ['$scope', '$location', 'tinymce',
  'staffService', function($scope, $location, tinymce, staffService) {
    $scope.tinymceOptions = tinymce;
    $scope.create = function(person) {
      staffService.create(person).then(function(response) {
        $location.path("/staff/index");
      })
    }
  }]);
