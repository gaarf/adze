'use strict';

describe('service', function() {

  beforeEach(module('adze.services'));

  describe('Chuck Norris', function() {
    var req, res, $httpBackend;

    beforeEach(inject(function($injector) {
      req = $injector.get('MyChuckNorrisRequest');

      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.whenJSONP(/.*/).respond({value:{joke:'haha!'}});
      $httpBackend.expectJSONP(/.*/);
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('can tell a joke', function() {
      res = req.getJoke();
      $httpBackend.flush();
      expect(res.joke).toBe('haha!');
    });

    it('can tell a joke (jasmine async style)', function() {
      runs(function() {
        res = req.getJoke();
        setTimeout($httpBackend.flush, 200);
      });
      waitsFor(function() {
          return res.$resolved;
        },
        "The joke promise should be resolved",
        1000
      );
      runs(function() {
        expect(res.joke).toBe('haha!');
      });
    });


  }); 

});
