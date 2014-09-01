'use strict';

describe('service', function() {
  beforeEach(module('coopr-ngui.services'));

  describe('myAuth', function() {
    var myAuth, $rootScope, $sessionStorage;
    beforeEach(inject(function($injector) {
      myAuth = $injector.get('myAuth');
      $rootScope = $injector.get('$rootScope');
      $sessionStorage = $injector.get('$sessionStorage');
    }));

    it('has a currentUser property', function() {
      expect(myAuth.currentUser).toBeDefined();
      expect(myAuth.currentUser).toBeNull();
    });

    it('has isAuthenticated method', function() {
      expect(myAuth.isAuthenticated()).toBe(false);
    });

    describe('login', function() {
      var $rootScope, $sessionStorage, $timeout;
      beforeEach(inject(function($injector) {
        $timeout = $injector.get('$timeout');
        $rootScope = $injector.get('$rootScope');
        $sessionStorage = $injector.get('$sessionStorage');
        spyOn($rootScope, '$broadcast').andCallThrough();
      }));

      describe('with missing password', function() {
        beforeEach(function() {
          myAuth.login({username:'test'});
          $timeout.flush();
        });

        it('does not authenticate', function() {
          expect(myAuth.isAuthenticated()).toBe(false);
          expect($rootScope.$broadcast).toHaveBeenCalledWith('myauth-login-failed');
        });
      });

      describe('with all credentials', function() {
        beforeEach(function() {
          myAuth.login({username:'test', tenant:'test', password:'test'});
          $timeout.flush();
        });

        it('is persisted', function() {
          expect(myAuth.isAuthenticated()).toBe(true);
          expect($sessionStorage.currentUser.username).toEqual('test');
          expect($rootScope.currentUser.username).toEqual('test');
          expect($rootScope.currentUser.hasRole).toEqual(jasmine.any(Function));
          expect($rootScope.$broadcast).toHaveBeenCalledWith('myauth-login-success');
        });

        describe('logout', function() {
          it('is persisted', function() {
            expect(myAuth.isAuthenticated()).toBe(true); // from test above
            myAuth.logout();

            expect(myAuth.isAuthenticated()).toBe(false);
            expect($sessionStorage.currentUser).toBeFalsy();
            expect($rootScope.currentUser).toBeFalsy();
            expect($rootScope.$broadcast).toHaveBeenCalledWith('myauth-logout-success');
          });
        });
      });

    });

    it('has login and logout methods', function() {
      expect(myAuth.login).toEqual(jasmine.any(Function));
      expect(myAuth.logout).toEqual(jasmine.any(Function));
    });

  });

  describe('MyAuthUser', function() {
    var MyAuthUser;
    beforeEach(inject(function($injector) {
      MyAuthUser = $injector.get('MyAuthUser');
    }));

    it('instance has a hasRole method', function() {
      var bob = new MyAuthUser({username:'bob'});
      expect(bob.hasRole).toEqual(jasmine.any(Function));
      expect(bob.hasRole(undefined)).toBe(true);
      expect(bob.hasRole('admin')).toBe(false);
    });

    it('sets admin role', function() {
      var bob = new MyAuthUser({username:'admin', tenant:'test', password:'admin'});
      expect(bob.hasRole('admin')).toBe(true);
      expect(bob.hasRole('superadmin')).toBe(false);
      expect(bob.hasRole('anything')).toBe(false);
    });

    it('sets superadmin role', function() {
      var bob = new MyAuthUser({username:'admin', tenant:'superadmin', password:'admin'});
      expect(bob.hasRole('admin')).toBe(true);
      expect(bob.hasRole('superadmin')).toBe(true);
      expect(bob.hasRole('anything')).toBe(true);
    });

    it('class has a revive method', function() {
      var bob = MyAuthUser.revive({username:'bob', tenant:'test'});
      expect(bob.username).toBe('bob');
      expect(bob).toEqual(jasmine.any(MyAuthUser));
    });

  });

});
