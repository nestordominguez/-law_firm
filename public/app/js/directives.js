
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
        element.bind('blur', function(e) {
          if (!ngModel || !element.val()) { return };
          var currentValue = element.val();
          ngModel.$setValidity('unique', true)
          uniqueService.checkUniqueValue(currentValue)
          .then(function(unique) {
            if (unique.data != null) {
              return ngModel.$setValidity('unique', false)
            };
          })
        })
      }
    }
  }]);
