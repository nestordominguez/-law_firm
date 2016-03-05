'use strict';

/* Services */
var protocol = "https://";
var hostname = "localhost:3000";
var basePath = "/api/v1";
var baseUrl = protocol + hostname;
var baseUrlPath = baseUrl + basePath;

angular.module('myApp.services', [])
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
    },
    unique: function(link) { return $http.get(baseDir + 'unique/' + link)}}
  }])

.service('usersService', ['$http', function($http) {
  var baseDir = baseUrlPath + "/users/";
  return {
    index: function() {return $http.get(baseDir)},
    show: function(id) {return $http.get(baseDir + id)},
    edit: function(user) {return $http.put(baseDir + user.id, {"user": user})},
    destroy: function(id) {return $http.delete(baseDir + id)},
    uniqueEmail: function(email) {return $http.get(baseDir + "unique/" + email)}
  }
}])

.service('sendMsjServices', [function() {
  var obj = {
    success: {
      signed_in: "ha iniciado sesión satisfactoriamente.",
      signed_out: "ha cerrado la sesión satisfactoriamente.",
      signed_up: "¡Bienvenido! Usted ha sido identificado.",
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
    toolbar1: 'insertfile undo redo | styleselect | bold italic | ' +
    'alignleft aligncenter alignright alignjustify | ' +
    'bullist numlist outdent indent | link image',
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
.service('linksService', ['pageService', function(pageService) {
  var links;

  function setLink() {
    links = [];
    pageService.index().then(function(response) {
      for (var i = response.data.body.length - 1; i >= 0; i--) {
        links.push(response.data.body[i]);
      };
    });
  }

  function getLink() {
    setLink();
    return links;
  }

  return {
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
}])
.service('rolNameService', [function() {
  var name, role;
  var options = ["Usuario", "Abogado"];

  function set(rol) {
    if (rol == 1) {
      name = "Usuario";
    } else if (rol == 2 ){
      name = "Abogado";
    } else if (rol == 3 ) {
      name = "Super Usuario";
    }
  };
  function get() {
    return name;
  }
  function setNameToRole(name) {
    if (name == "Usuario") {
      role = 1;
    } else if (name == "Abogado") {
      role = 2;
    } else if (name == "Super Usuario") {
      role = 3;
    }
  }
  function getNameToRole() {
    return role;
  }
  function getOptions() {
    return options;
  }
  return {
    set: set,
    get: get,
    setNameToRole: setNameToRole,
    getNameToRole: getNameToRole,
    getOptions: getOptions
  }
}])
.service('staffService', ['$http', function($http) {
  var baseDir = baseUrlPath + '/staff/';
  return {
    index: function() {return $http.get(baseDir)},
    show: function(id) {return $http.get(baseDir + id)},
    create: function(person) {return $http.post(baseDir, {"staff": person})},
    edit: function(person) {return $http.put(baseDir + person.id, {"staff": person})},
    destroy: function(id) {return $http.delete(baseDir + id)}
  }
}]);
