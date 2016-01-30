var assert = chai.assert;
var baseDir = "https://localhost:3000/api/v1/pages/"

describe("Services", function() {
  describe("when page services", function() {
    var expect = chai.expect;
    beforeEach(function() {
      module('myApp');
      inject(function($injector) {
        pageService = $injector.get("pageService");
        $httpBackend = $injector.get("$httpBackend");
      });
    })

    it("have a property page as object response", function() {
      expect(pageService.index()).to.be.an('object');
    })

    it("have index response", function() {
      pageService.index();
      $httpBackend.expectGET(baseDir)
        .respond(200, []);
      $httpBackend.flush();
    })

    it("have show response", function() {
      pageService.show("link");
      $httpBackend.expectGET(baseDir + "link")
        .respond(200, []);
      $httpBackend.flush();
    })
  })
});
