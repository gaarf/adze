'use strict';

describe('service', function() {

  beforeEach(module('adze.services'));

  describe('Chuck Norris', function() {
    var resource, result, $httpBackend;

    beforeEach(inject(function($injector) {
      resource = $injector.get('myChuckNorrisAPI');

      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.whenJSONP(/.*/).respond({value:{joke:'haha!'}});
      $httpBackend.expectJSONP(/.*/);
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('can tell a joke', function() {
      result = resource.getJoke();
      $httpBackend.flush();
      expect(result.joke).toBe('haha!');
    });

    it('can tell a joke (jasmine async style)', function() {
      runs(function() {
        result = resource.getJoke();
        setTimeout($httpBackend.flush, 200);
      });
      waitsFor(function() {
          return result.$resolved;
        },
        "The joke promise should be resolved",
        1000
      );
      runs(function() {
        expect(result.joke).toBe('haha!');
      });
    });


  }); 

});
