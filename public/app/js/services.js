'use strict';

/* Services */
var protocol = "https://";
var hostname = "localhost:3000";
var basePath = "/api/v1";
var baseUrl = protocol + hostname;
var baseUrlPath = baseUrl + basePath;

angular.module('myApp.services', [])

.service('uniqueService', ['$http', function($http) {
  var dataFactory = {}
  dataFactory.checkUniqueValue = function(user) {
      return  $http.get(baseUrlPath + '/users/unique/' + user);
  }
  return dataFactory;
}])

.service('pageService', ["$http", function ($http) {
  var baseDir = baseUrlPath + '/pages/';
  return {
    index: function() {return $http.get(baseDir)},
    show: function(id) {return $http.get(baseDir + id)},
    create: function(page) {return $http.post(baseDir, {"page": page})},
    edit: function(page) {return $http.put(baseDir + page.id, {"page": page})},
    destroy: function(id) {return $http.delete(baseDir + id)}
  }

  }])

.service('usersService', ['$http', function($http) {
  var baseDir = baseUrlPath + "/users/";
  return {
    index: function() {return $http.get(baseDir)},
    show: function(id) {return $http.get(baseDir + id)},
    edit: function(user) {return $http.put(baseDir + user.id, {"user": user})},
    destroy: function(id) {return $http.delete(baseDir + id)}
  }
}])

.service('sendMsjServices', [function() {
  var obj = {
    success: {
      signed_in: "ha iniciado sesión satisfactoriamente.",
      signed_out: "ha cerrado la sesión satisfactoriamente.",
      already_signed_out: "ha cerrado la sesión satisfactoriamente.",
      page_updated: "se actualizo correctamente"
    },
    error: {
      unauthorized: "No esta autorizado a entrar a esta sección."
    }
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

  function setLocalError (data) {
    msjData.error = true;
    msjData.data = obj.error[data];
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
      msjData.data = data + " " + obj.success[msj]
    } else{
      msjData.data = obj.success[msj]
    };
  }

  return {
      getMsj: getMsj,
      setSuccess: setSuccess,
      setLocalSuccess: setLocalSuccess,
      setHostError: setHostError,
      setLocalError: setLocalError
  }
}]);
