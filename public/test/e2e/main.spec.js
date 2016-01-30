describe('law_firm: end to end test', function() {
  beforeEach(function() {
    browser.get('http://localhost:8080');
  });
  it('should have a title', function() {

    expect(browser.getTitle()).toEqual('Law Firm -- App');
  });
  it("have to work", function(done) {
    element.all(by.repeater('obj in links'))
      .then(function(links) {
        var first = links[0];
        var text = first.getText();
        expect(text).toEqual("links");
        done();
      });
  })
});
