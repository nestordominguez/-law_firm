var assert = chai.assert;
var expect = chai.expect;

describe("Filters", function() {
  describe("When work with first priority filter", function() {
    var $filter;
    beforeEach(function () {
      module("myApp");
      inject(function($injector){
        $filter = $injector.get('$filter')('firstPriority');
      });

    });

    it("have priority of 1", function() {
      array = [
        {"link":3, "priority": 3},
        {"link": "link", "priority": 1},
        {"link": 2, "priority": 2}
      ];
      assert.equal($filter(array), "link");
    });
  })
});
