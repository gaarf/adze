'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('adze', function() {


  describe('redirects', function() {

    it('should render homepage when navigated to /#/whatever', function() {
      browser.get('/#/whatever');
      expect(browser.getLocationAbsUrl()).toMatch("/#/");
    });

  });


});
