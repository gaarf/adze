'use strict';

describe('service', function() {

  beforeEach(module('adze.services'));

  describe('ChuckNorris', function() {
    var ChuckNorris, $httpBackend;

    beforeEach(inject(function($injector) {
      ChuckNorris = $injector.get('ChuckNorris');
      $httpBackend = $injector.get('$httpBackend');

      $httpBackend.whenJSONP(/.*/).respond({value:{joke:'haha!'}});
      $httpBackend.expectJSONP(/.*/);
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('can tell a joke (jasmine async)', function() {
      var joke;

      runs(function() {
        joke = ChuckNorris.getJoke();
        $httpBackend.flush();
      });

      waitsFor(function() {
          return joke.$resolved;
        },
        "The joke promise should be resolved",
        2000
      );

      runs(function() {
        expect(joke.joke).toBe('haha!');
      });

    });

    it('can tell a joke (short and sweet)', function() {
      var joke = ChuckNorris.getJoke();
      $httpBackend.flush();
      expect(joke.joke).toBe('haha!');
    });

  }); 

});
