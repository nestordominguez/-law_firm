
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
.directive('msj', ['$timeout', 'Auth', 'sendMsjServices',
  function($timeout, Auth, sendMsjServices) {
  return{
    restrict: 'A',

    link: function(scope, element, attrs) {
      scope.$on("$routeChangeStart", function() {
        if (sendMsjServices.getMsj()) {
          scope.error = sendMsjServices.getMsj();
          $timeout(function() {
            scope.error = "";
            sendMsjServices.setHostError("");
          }, 5000);
        };
      })
    }

  }
}]);
