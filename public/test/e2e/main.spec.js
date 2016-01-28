describe('end to end test', function() {
  it("have to work", function(done) {
    browser.get('http://localhost:8080');
    element.all(by.repeater('obj in links'))
      .then(function(links) {
        var first = links[0];
        var text = first.getText();
        expect(text).toEqual("links");
        done();
      });
  })
})
