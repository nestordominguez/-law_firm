'use strict';

/* Services */
var path = "https://localhost:3000/api/v1";
angular.module('myApp.services', [])
.factory('uniqueService', ['$http', function($http) {
  var dataFactory = {}
  dataFactory.checkUniqueValue = function(user) {
      return  $http({
        method: 'GET',
        url: path + '/users/unique/' + user
      });
  }
  return dataFactory;
}])
  .service('pageService', ["$http", function ($http) {

    var baseDir = path + '/pages/';

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
  .factory('usersService', ['$http', function($http) {
    var baseDir = path + "/users/";
    return {
      index: function() {return $http.get(baseDir)},
      show: function(id) {return $http.get(baseDir + id)},
      destroy: function(id) {return $http.delete(baseDir + id)},
      edit: function(user) {return $http.put(baseDir + user.id, {"user": user})}
    }
  }])
  .service('sendMsjServices', [function() {
    var msj = {
      error: {
        unautorized: "No esta autorizado a entrar a esta seccion",
        unlogued: "Por favor ingrese a su cuenta para continuar",
        errorLoguin: "Ha ocurrido un error y no se pudo ingresar a su cuenta"
      },
      success: {

      }

    }

     var msjData;

    function getMsj() {
        return msjData;
    }

    function setError (data) {
      msjData = msj.error[data];
    }

    function setSuccess(data) {
      msjData = msj.success[data]
    }

    return {
        getMsj: getMsj,
        setError: setError,
        setSuccess: setSuccess
    }
  }])
