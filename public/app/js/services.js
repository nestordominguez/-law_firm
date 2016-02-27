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
    destroy: function(id) {return $http.delete(baseDir + id)},
    priorityAvailable: function() {
      return $http.get(baseDir + "availability_priority/list")
    }
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
      page_updated: "se actualizó correctamente",
      page_created: "se creó correctamente",
      deleted: "se borro correctamente"
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
}])
.service('tinymce', [function() {
  return {
    selector: 'textarea',
    resize: false,
    height: 100,
    theme: 'modern',
    mode: 'textarea',
    language : "es",
    plugins: [
      'advlist autolink lists link image charmap print preview hr anchor pagebreak',
      'searchreplace wordcount visualblocks visualchars code fullscreen',
      'insertdatetime media nonbreaking save table contextmenu directionality',
      'emoticons template paste textcolor colorpicker textpattern imagetools'
    ],
    toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    toolbar2: 'print preview media | forecolor backcolor emoticons',
    image_advtab: true,
    templates: [
      { title: 'Test template 1', content: 'Test 1' },
      { title: 'Test template 2', content: 'Test 2' }
    ],
    content_css: [
      '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
      '//www.tinymce.com/css/codepen.min.css'
    ]
   };
}])
.service('rolesService', [function() {
  var rol;
  function setRol(user) {
    if (!user) {
      rol = 0;
    } else {
      rol = user.role;
    }
  }
  function setLocalRol(role) {
    rol = role;
  }
  function getRol() {
    return rol;
  }
  return {
    setRol: setRol,
    getRol: getRol,
    setLocalRol: setLocalRol
  }
}])
.service('linksService', [function() {
  var links = [];

  function setLink(received) {
    links = received;
  }

  function getLink() {
    return links;
  }

  return {
    setLink: setLink,
    getLink: getLink
  }
}])
.service('messagesService', ['$http', function($http) {
  var baseDir = baseUrlPath + '/messages/';
  return {
    index: function() {return $http.get(baseDir)},
    show: function(id) {return $http.get(baseDir + id)},
    create: function(message) {return $http.post(baseDir, {"message": message})},
    destroy: function(id) {return $http.delete(baseDir + id)}
  }
}]);
