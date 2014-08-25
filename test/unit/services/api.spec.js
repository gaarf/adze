'use strict';

describe('service', function() {
  beforeEach(module('coopr-ngui.services'));

  describe('myApi', function() {
    var myApi, $rootScope, $httpBackend;

    beforeEach(inject(function($injector) {
      myApi = $injector.get('myApi');
      $rootScope = $injector.get('$rootScope');
      $httpBackend = $injector.get('$httpBackend');
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Cluster', function() {

      it('is a $resource with custom methods', function() {
        expect(myApi.Cluster.query).toEqual(jasmine.any(Function));
        expect(myApi.Cluster.get).toEqual(jasmine.any(Function));
        expect(myApi.Cluster.getStatus).toEqual(jasmine.any(Function));
        expect(myApi.Cluster.startAllServices).toEqual(jasmine.any(Function));
      });

      it('instance has custom methods', function() {
        var cluster = new myApi.Cluster({id:123});
        expect(cluster.$getStatus).toEqual(jasmine.any(Function));
        expect(cluster.$startAllServices).toEqual(jasmine.any(Function));
        expect(cluster.$delete).toEqual(jasmine.any(Function));
      });

      it('testing query()', function() {
        $httpBackend.expectGET(/v1\/loom\/clusters$/).respond([{foo:'bar'}]);

        var list = myApi.Cluster.query();
        $httpBackend.flush();
        expect(list[0].foo).toEqual('bar');
      });

      it('testing get()', function() {
        $httpBackend.expectGET(/v1\/loom\/clusters\/123$/).respond({foo:'bar'});

        var item = new myApi.Cluster({id:123});
        item.$get();
        $httpBackend.flush();
        expect(item.foo).toEqual('bar');
      });

    });

  });


});
