'use strict';

describe('controller', function(){
  beforeEach(module('coopr-ngui.controllers'));


  it('test env is ready', function() {
    expect(jasmine).toBeDefined();
    expect(angular).toBeDefined();
    expect(module).toBe(angular.mock.module);
    expect(inject).toBe(angular.mock.inject);
  });

  describe('LoginCtrl', function() {
    var $scope;

    beforeEach(inject(function($rootScope, $controller) {
      $scope = $rootScope.$new();
      $controller('LoginCtrl', {$scope: $scope});
    }));

    it('should init credentials', function() {
      expect($scope.credentials).toBeDefined();
    });

    it('has a doLogin method', function() {
      expect($scope.doLogin).toEqual(jasmine.any(Function));
    });

  });


});
