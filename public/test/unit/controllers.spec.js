var assert = chai.assert;
var expect = chai.expect;
var baseDir = "https://localhost:3000/api/v1/pages/"
describe("Controllers", function() {
  beforeEach(module('myApp'));

  describe("When app controller", function() {
    beforeEach(function() {
      inject(function($injector, $rootScope) {
        $scope = $rootScope.$new();
        $httpBackend = $injector.get("$httpBackend");
        $controller = $injector.get("$controller");
        $routeParams = $injector.get("$routeParams");
        pageService = $injector.get("pageService");
        $controller("appController", {$scope:$scope, $routeParams:$routeParams});
        $httpBackend.when("GET", baseDir)
            .respond(200, {});
        $httpBackend.when("GET", "views/pages/show.html")
          .respond(200, {});
        $httpBackend.when("POST", "https://localhost:3000/users/sign_in")
          .respond(200, {});
        $httpBackend.flush();
      })
      $routeParams.page_link = "estudio";
      $scope.links = ['asd'];
    })

    it("respond with a links array", function() {
      assert.isArray($scope.links);
      assert.equal($scope.links, "asd");
    });

    it("respond with link params", function() {
      assert.equal($routeParams.page_link, "estudio");
    });

    describe("When return with active class", function() {
      it("have active class", function() {
        assert.equal($scope.select(), "");
      });

      it("not have active class", function() {
        assert.equal($scope.select("estudio"), "active");
      });
    })

    // describe("When is unloged",function() {
    //   it("respond with Iniciar Sesion links", function() {
    //     assert.equal($scope.signs[0].value, "Iniciar Sesion");
    //   })

    //   it("respond with Crear Cuenta links", function() {
    //     assert.equal($scope.signs[1].value, "Crear Cuenta");
    //   })

    // })

    // describe("When is loged", function() {

      // it('respond with Cerrar Sesion link pending...')
      //it("respond with Cerrar Sesion link pending...", function() {

        /*var user = {};
        $httpBackend.when("POST", "https://localhost:3000/users/sign_in", user)
          .respond(200, {});
        assert.equal($scope.signs[0].value, "Cerrar Sesion");
        $httpBackend.flush(); */

        //pending test...
      //})
    // })
  })

  describe("When show controller", function() {
    beforeEach(function() {
      inject(function($injector, $rootScope, $routeParams) {
        $scope = $rootScope.$new();
        pageService = $injector.get("pageService");
        $httpBackend = $injector.get("$httpBackend");
        $controller = $injector.get("$controller");
        $routeParams = $injector.get("$routeParams");
        $httpBackend.when("GET", baseDir + "estudio")
          .respond(200, {
            id: 1,
            title: "estudios",
            link: "estudio",
            content: "estudio content",
            slug: "estudio",
            priority: 1
          })
        $routeParams.page_link = "estudio";
        $controller("showPageController", {$scope:$scope, pageService:pageService});
        $httpBackend.flush();
      })
    })

    it("have title", function() {
      assert.equal($scope.title, "estudios");
    })

    it("not have title", function() {
      assert.notEqual($scope.title, "estudio");
    })

    it("have content", function() {
      assert.equal($scope.content, "estudio content");
    })

    it("not have content", function() {
      assert.notEqual($scope.content, "estudio content other");
    })
  })
});
