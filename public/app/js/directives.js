
'use strict';

/* Directives */

angular.module('myApp.directives', [])
.directive('pwCheck', [function () {
  return {
    require: 'ngModel',
    link: function (scope, elem, attrs, ctrl) {
      var firstPassword = '#' + attrs.pwCheck;
      elem.add(firstPassword).on('keyup', function () {
        scope.$apply(function () {
          ctrl.$setValidity('pwmatch', elem.val() === $(firstPassword).val());
        });
      });
    }
  }
}])
.directive('unique', ['usersService', function(usersService) {
    return {
      restrict:'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        element.bind('blur', function() {
          if (!element.val()) { return };
          var currentValue = element.val();
          usersService.uniqueEmail(currentValue)
          .then(function(unique) {
            if (unique.data == true) {
              ngModel.$setValidity('unique', true)
            } else{
              ngModel.$setValidity('unique', false)
            };
          })
        })
      }

    }
  }])
.directive('uniquelink', ['pageService', function(pageService) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      element.bind('blur', function() {
        if (!element.val()) { return };
        var currentValue = element.val();
        pageService.unique(currentValue).then(function(unique) {
          if (unique.data != true) {
            ngModel.$setValidity("uniquelink", true)
          } else {
            ngModel.$setValidity("uniquelink", false)
          };
        });
      });
    }

  }
}])
.directive('msj', ['$timeout', 'sendMsjServices',
  function($timeout, sendMsjServices) {
  return{
    restrict: 'A',
    link: function(scope, element, attrs) {
      function msj(argument) {
        if (sendMsjServices.getMsj()) {
          scope.classMsj = sendMsjServices.getMsj().error;
          scope.message = sendMsjServices.getMsj().data;
          $timeout(function() {
            scope.message = "";
          }, 5000);
          sendMsjServices.setSuccess("");
          sendMsjServices.setLocalSuccess("");
          sendMsjServices.setHostError("");
        };
      }

      scope.$on('send-msj', function() {
        msj();
      });
    }

  }
}])
.directive('staff', ['$route', '$timeout', '$sce', 'staffService', 'rolesService', 'tinymce',
  function($route, $timeout, $sce, staffService, rolesService, tinymce) {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/staff.html',
    scope: {},
    link: function(scope, element, attrs) {
      scope.showUpdate = false;

      staffService.index().then(function(response) {
        scope.staff = response.data.body;
      });

      scope.show = function(id) {
        scope.showing = false;
        staffService.show(id).then(function(response) {
          scope.showing = true;
          if (response.data) {
            scope.lawyer = response.data.body;
            scope.lawyer_cv = $sce.trustAsHtml(response.data.body.cv);
          } else {
            scope.lawyer = "";
            scope.lawyer_cv = "";
          }

        });
      }
      scope.leave = function() {
        scope.showUpdate = false;
        scope.showing = false;
      }

      var create = false;
      scope.update = function(person) {
        if (rolesService.getRol() == 3) {
          create = false;
          scope.tinymceOptions = tinymce;
          scope.showUpdate = true;
          scope.person = person;
            scope.updateAction = function(edited_person) {
              if (create) {
                staffService.create(edited_person).then(function(response) {
                  staffService.index().then(function(response) {
                    scope.staff = response.data.body;
                    scope.leave();
                  });
                });
              } else {
                staffService.edit(edited_person).then(function(response) {
                  scope.person = response.data;
                  scope.showing = false;
                });
              }

            }
        }
      };
      scope.delete = function(id_person) {
        staffService.show(id_person).then(function(response) {
          scope.name = response.data.body.names;
        });
        scope.destroy = function() {
          staffService.destroy(id_person).then(function(response) {
            staffService.index().then(function(response) {
              scope.staff = response.data;
              $route.reload();
            });
          });
        }
      }

      scope.create = function() {
        scope.person = {};
        create = true;
      }

    }
  }
}]);
