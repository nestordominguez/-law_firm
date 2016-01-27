var assert = chai.assert;
var expect = chai.expect;

describe("template", function() {
  var $httpBackend, location, route, rootScope;
  beforeEach(function() {
    module('myApp');
    inject(function(_$rootScope_, _$route_, _$httpBackend_, _$location_) {
      location = _$location_;
      rootScope = _$rootScope_;
      route = _$route_;
      $httpBackend = _$httpBackend_;
    });
  });
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("loads the show template at /views/pages/show.html", function() {
    location.path('/');
    $httpBackend.expectGET('views/pages/show.html').respond(200);
    /*rootScope.$digest();*/
    $httpBackend.flush();
  });

});
