
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
.directive('unique', ['uniqueService', function(uniqueService) {
    return {
      restrict:'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        element.bind('blur', function() {
          if (!element.val()) { return };
          var currentValue = element.val();
          uniqueService.checkUniqueValue(currentValue)
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
            sendMsjServices.setSuccess("");
            sendMsjServices.setLocalSuccess("");
            sendMsjServices.setHostError("");
          }, 5000);
        };
      }

      scope.$on('send-msj', function() {
        msj();
      });
    }

  }
}]);
