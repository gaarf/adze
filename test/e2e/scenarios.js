'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('adze', function() {


  describe('redirects', function() {

    it('should go to homepage when navigated to /#/whatever', function() {
      browser.get('/#/whatever');
      expect(browser.getLocationAbsUrl()).toMatch("/#/");
    });

    it('should go to "about" when navigated to /#/foo/bar', function() {
      var bar = "thisIsAComplexString";
      browser.get('/#/foo/'+bar);

      expect( browser.getLocationAbsUrl() )
        .toMatch("/#/about/"+bar);

      expect( element(by.css('[ui-view] pre')).getText() )
        .toMatch(bar);
    });

  });

  describe('modal', function() {

    it('dropdown links to contact/modal', function() {
      browser.get('/');
      element( by.css('header .dropdown-toggle') ).click();

      expect( element(by.css('header .dropdown-menu')).isDisplayed() )
        .toBe(true);

      var link = element(by.partialLinkText('Contact/modal'));
      expect( link.getAttribute('href') )
        .toMatch("/#/contact/modal");

      expect( element(by.css('body')).isElementPresent(by.css('.modal')) )
        .toBe(false);

      link.click();

      expect( browser.getLocationAbsUrl() )
        .toMatch("/#/contact/modal");

      expect( element(by.css('body > div.modal')).isDisplayed() )
        .toBe(true);
    });

    it('can be triggered via button on contact', function() {
      browser.get('/#/contact');

      expect( element(by.css('body')).isElementPresent(by.css('.modal')) )
        .toBe(false);

      element(by.css('[ui-view] button')).click();

      expect( browser.getLocationAbsUrl() )
        .toMatch("/#/contact/modal");

      expect( element(by.css('body > div.modal')).isDisplayed() )
        .toBe(true);
    });


  });

});
