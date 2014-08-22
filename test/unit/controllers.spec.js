'use strict';

describe('controller', function(){
  beforeEach(module('coopr-ngui.controllers'));


  it('test env is ready', function() {
    expect(jasmine).toBeDefined();
    expect(angular).toBeDefined();
    expect(module).toBe(angular.mock.module);
    expect(inject).toBe(angular.mock.inject);
  });

  // describe('BodyCtrl', function() {
  //   var $scope;

  //   beforeEach(inject(function($rootScope, $controller) {
  //     $scope = $rootScope.$new();
  //     $controller('BodyCtrl', {$scope: $scope});
  //   }));

  //   it('should init somebody', function() {
  //     expect($scope.somebody.name).toBe('Kenny');
  //   });

  // });


});
