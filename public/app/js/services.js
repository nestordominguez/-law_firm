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
     var msjData

    function getMsj() {
        return msjData;
    }

    function setHostError (data) {
      msjData = data;
    }

    function setSuccess(data) {
      msjData = data;
    }

    return {
        getMsj: getMsj,
        setSuccess: setSuccess,
        setHostError: setHostError
    }
  }]);
