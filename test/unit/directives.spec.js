'use strict';

describe('directive', function() {
  var $compile, scope;

  beforeEach(module('adze.directives'));

  beforeEach(inject(function(_$compile_, $rootScope){
    $compile = _$compile_;
    scope = $rootScope.$new();
  }));

  describe('myClickyBtn', function() {

    it('should get a btn class, and change color on click', function() {
      var el = $compile('<span my-clicky-btn></span>')(scope);
      scope.$digest();
      expect(el.hasClass('btn')).toBe(true);
      expect(el.hasClass('btn-success')).toBe(true);

      el.triggerHandler('click');
      expect(el.hasClass('btn-success')).toBe(false);
      expect(el.hasClass('btn-danger')).toBe(true);
    });

    it('should use the attr value', function() {
      var el = $compile('<span my-clicky-btn="testString"></span>')(scope);
      scope.$digest();
      expect(el.isolateScope().text).toBe("testString");
      expect(el.find('strong').text()).toBe("testString");

      el.triggerHandler('click');
      var text = el.isolateScope().text;
      expect(text).not.toBe("testString");
      expect(el.find('strong').text()).toBe(text);
    });


  });



});
