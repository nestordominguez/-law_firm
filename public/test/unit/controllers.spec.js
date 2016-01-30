var assert = chai.assert;
var expect = chai.expect;
var baseDir = "https://localhost:3000/api/v1/pages/"
describe("Controllers", function() {
  describe("When app controller", function() {
    beforeEach(function() {
      module('myApp');
      inject(function($injector, $rootScope, $routeParams) {
        $scope = $rootScope.$new();
        pageService = $injector.get("pageService");
        $httpBackend = $injector.get("$httpBackend");
        $controller = $injector.get("$controller");
        $routeParams = $injector.get("$routeParams");
        $httpBackend.when("GET", baseDir)
          .respond(200, {})
        $routeParams.page_link = "estudio";
        $controller("appController", {$scope:$scope, pageService:pageService});
        $httpBackend.flush();
      })
    })

    it("respond with a links array", function() {
      assert.isArray($scope.links);
    });

    it("respond with link params", function() {
      assert.equal($scope.page_link, "estudio", "link equal to estudio");
    });
    describe("When return with active class", function() {
      it("have active class", function() {
        assert.equal($scope.select("estudio"), "active");
      });

      it("not have active class", function() {
        assert.equal($scope.select(), "");
      });
    })
  })

  describe("When show controller", function() {
    beforeEach(function() {
      module('myApp');
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
