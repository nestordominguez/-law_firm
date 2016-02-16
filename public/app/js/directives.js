
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
.directive('errorMsj', ['$timeout', 'sendMsjServices', 'Auth',
  function($timeout, sendMsjServices, Auth) {
  return{
    restrict: 'A',
    link: function(scope, element, attrs, signInUserController) {

      scope.$on("$routeChangeStart", function() {
        if (sendMsjServices.getMsj()) {
          scope.showMsj = true;
          scope.error = sendMsjServices.getMsj();
          $timeout(function() {
            scope.error = "";
            scope.showMsj = false;
            sendMsjServices.setError("");
          }, 5000);
        };
      })

    }
  }
}]);
