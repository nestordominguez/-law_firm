'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('appController', ['$scope', '$routeParams', 'pageService', 'Auth',
    'linkLogIn',
    function($scope, $routeParams, pageService, Auth, linkLogIn) {

      $scope.signs = linkLogIn;

      pageService.index().then(function(response) {
        var links = [];
        for (var i = response.data.length - 1; i >= 0; i--) {
          links.push(response.data[i]);
        };

        $scope.links = links;
        $scope.page_link = $routeParams.page_link;

        $scope.select = function(link) {
          return link === $routeParams.page_link ? 'active' : '';
        }
      });

  }])
  .controller('showPageController', ['$scope', '$routeParams', 'pageService',
    function($scope, $routeParams, pageService) {

      pageService.show($routeParams.page_link)
      .then(function(response) {

        $scope.title = response.data.title;
        $scope.content = response.data.content;

      })
  }])

// login system

  .controller('signInUserController', ['$scope', '$location', 'Auth', 'linkLogIn',
    function($scope, $location, Auth, linkLogIn) {

    $scope.logIn = function(user) {
      var credentials = {
        email: user.email,
        password: user.password
      };
      var config = {
        headers: {
         'X-HTTP-Method-Override': 'POST'
        }
      }

      Auth.login(credentials, config).then(function(user) {
            console.log(user); // => {id: 1, ect: '...'}
            $location.path("/pages");
            $scope.signs = linkLogIn;
        }, function(error) {
          console.log(error);
          $location.path("/users/sign_in");
            // Authentication failed...
        });

        $scope.$on('devise:login', function(event, currentUser) {
            $scope.user = currentUser;
        });

        $scope.$on('devise:new-session', function(event, currentUser) {
            // user logged in by Auth.login({...})
        });
    }

  }])

  .controller('signUpUserController', ['$scope', function($scope) {
    // body...
  }]);
