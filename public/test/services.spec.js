var assert = chai.assert;
var expect = chai.expect;

describe("Services", function() {
  describe("when page services", function() {
    it("have a property page as object response", function() {
      module('myApp');
      inject(function($injector) {
        pagesService = $injector.get("pagesService");
      });

      expect(pagesService.async().then(function(response) {
        // body...
      })).to.be.an('object');
    })
  })
});
