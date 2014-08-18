'use strict';

describe('controllers', function(){

  it('test env is ready', function() {
    expect(jasmine).toBeDefined();
    expect(angular).toBeDefined();
    expect(module).toBe(angular.mock.module);
    expect(inject).toBe(angular.mock.inject);
  });


  describe('BodyCtrl', function() {
    var $scope;

    beforeEach(module('adze'));

    beforeEach(inject(function($rootScope, $controller) {
      $scope = $rootScope.$new();
      $controller('BodyCtrl', {$scope: $scope});
    }));

    it('should init somebody', function() {
      expect($scope.somebody.name).toBe('Kenny');
    });

    it('should have a bodyAlertObj', function() {
      expect($scope.bodyAlertObj.type).not.toBeUndefined();
    });
  });


});
