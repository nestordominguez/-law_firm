'use strict';

/* Services */

angular.module('myApp.services', [])
  .service('pageService', ["$http", function ($http) {

    var baseDir = 'https://localhost:3000/api/v1/pages/';

    return {

      index: function() {
        return $http({
          method: 'GET',
          url: baseDir
        })
      },

      show: function(link) {
        return $http({
          method: 'GET',
          url: baseDir + link
        })
      }

    }

  }])
  .service('linkLogIn', ["Auth", function(Auth) {
      var array = [
        {"symbol": "log-out", "value": "Cerrar Sesion", "loged": true, "link": "users/sign_out"},
        {"symbol": "user", "value": "Crear Cuenta", "loged": false, "link": "users/sign_up"},
        {"symbol": "log-in", "value": "Iniciar Sesion", "loged": false, "link": "users/sign_in"}
      ];

      var result =[];
      for (var i = array.length - 1; i >= 0; i--) {
        if (array[i].loged && Auth.isAuthenticated()) {
          result.push(array[i]);
        };
        if (!array[i].loged && !Auth.isAuthenticated()) {
          result.push(array[i]);
        };
      };
      $.apply();
      return result;
    }]);
