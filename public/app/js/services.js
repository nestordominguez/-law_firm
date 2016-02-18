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
    var obj = {
      signed_in: "Ha iniciado sesión satisfactoriamente.",
      signed_out: "Ha cerrado la sesión satisfactoriamente.",
      already_signed_out: "Ha cerrado la sesión satisfactoriamente."
    };
    var msjData = {};

    function getMsj() {
        return msjData;
    }

    function setHostError (data) {
      msjData.error = true;
      msjData.data = data;
      return msjData;
    }

    function setSuccess(data) {
      msjData.error = false;
      msjData.data = data;
      return msjData;
    }

    function setLocalSuccess(msj, data) {
      msjData.error = false;
      if (data) {
        msjData.data = data + " " + obj[msj]
      } else{
        msjData.data = obj[msj]
      };
    }

    return {
        getMsj: getMsj,
        setSuccess: setSuccess,
        setLocalSuccess: setLocalSuccess,
        setHostError: setHostError
    }
  }]);
