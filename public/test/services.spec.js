var assert = chai.assert;
var expect = chai.expect;

describe("Services", function() {
  describe("when page services", function() {
    beforeEach(function() {
      module('myApp');
      inject(function($injector) {
        pageService = $injector.get("pageService");
        $httpBackend = $injector.get("$httpBackend");
      });
    })
    it("have a property page as object response", function() {

      expect(pageService.show().then(function(response) {
        // body...
      })).to.be.an('object');
    })

    it("have to call to backend", function() {
      $httpBackend.expectGET('http://localhost:3000/api/v1/pages')
        .respond(200, []);
      $httpBackend.flush();
    })
  })
});
