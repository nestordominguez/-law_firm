var assert = chai.assert;
var expect = chai.expect;

describe("Services", function() {
  beforeEach(module('myApp'));
  describe("When page services", function() {
    var baseDir = "https://localhost:3000/api/v1/pages/"
    beforeEach(function() {
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

  describe("When linkLogIn", function() {
    beforeEach(function() {
      inject(function($injector) {
        linkLogIn = $injector.get("linkLogIn");
      })
    });

    it("respond with an array", function() {
      expect(linkLogIn).to.be.an('array');
    })

  })
});
