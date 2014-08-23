var module = angular.module(PKG.name+'.services');

/*
  inspired by https://medium.com/opinionated-angularjs/
    techniques-for-authentication-in-angularjs-applications-7bbf0346acec
 */

module.constant('MYAUTH_EVENT', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
});


module.constant('MYAUTH_ROLE', {
  all: '*',
  superadmin: 'superadmin',
  admin: 'admin'
});




module.run(function ($rootScope, myAuth, MYAUTH_EVENT, MYAUTH_ROLE) {
  $rootScope.currentUser = myAuth.currentUser;

  $rootScope.$on('$stateChangeStart', function (event, next) {
    var authorizedRoles = next.data && next.data.authorizedRoles;
    if (!authorizedRoles) { return; } // no role required, anyone can access

    var user = myAuth.currentUser;
    if (user) { // user is logged in
      if (authorizedRoles === MYAUTH_ROLE.all) { return; } // any logged-in user is welcome
      if (user.hasRole(authorizedRoles)) { return; } // user is legit
    }
    // in all other cases, prevent going to this state
    event.preventDefault();
    $rootScope.$broadcast(user ? MYAUTH_EVENT.notAuthorized : MYAUTH_EVENT.notAuthenticated);
  });

});







module.service('myAuth', function myAuthService (MYAUTH_EVENT, MyAuthUser, myAuthPromise, $rootScope, $sessionStorage) {

  this.currentUser = MyAuthUser.revive($sessionStorage.currentUser);

  var persist = angular.bind(this, function (u) {
    this.currentUser = u;
    $sessionStorage.currentUser = u;
    $rootScope.currentUser = u;
  });

  /**
   * login
   * @param {object} c credentials
   */
  this.login = function (c) {
    return myAuthPromise(c).then(
      function() {
        persist( new MyAuthUser(c) );
        $rootScope.$broadcast(MYAUTH_EVENT.loginSuccess);
      },
      function() {
        $rootScope.$broadcast(MYAUTH_EVENT.loginFailed);
      }
    );
  };

  /**
   * logout
   * @param {object} c credentials
   */
  this.logout = function () {
    persist(null);
    $rootScope.$broadcast(MYAUTH_EVENT.logoutSuccess);
  };

  /**
   * is there someone here?
   * @return {Boolean}
   */
  this.isAuthenticated = function () {
    return !!this.currentUser;
  };

});





module.factory('myAuthPromise', function myAuthPromiseFactory (MYAUTH_ROLE, $timeout, $q) {
  return function myAuthPromise (c) {
    var deferred = $q.defer();

    $timeout(function(){
      if (!c.password || !c.tenant || !c.username) {
        deferred.reject();
      }
      else {
        var a = MYAUTH_ROLE.admin;
        if (c.username===a && c.password!==a) {
          deferred.reject();
        }
        else {
          deferred.resolve(c);
        }
      }
    }, 500);

    return deferred.promise;
  }
});






module.factory('MyAuthUser', function MyAuthUserFactory (MYAUTH_ROLE) {

  /**
   * Constructor for currentUser data
   * @param {object} user data
   */
  function User(data) {
    this.username = data.username;
    this.tenant = data.tenant;

    // wholly insecure while we wait for real auth
    if(data.tenant===MYAUTH_ROLE.superadmin) {
      this.role = MYAUTH_ROLE.superadmin;
    }
    else if(data.tenant) {
      this.role = MYAUTH_ROLE.admin;
    }
  }

  /**
   * attempts to make a User from data
   * @param  {Object} stored data
   * @return {User|null}
   */
  User.revive = function(data) {
    return angular.isObject(data) ? new User(data) : null;
  };

  /**
   * do i haz one of given roles? 
   * @param  {String|Array} authorizedRoles
   * @return {Boolean}
   */
  User.prototype.hasRole = function(authorizedRoles) {
    if(this.role === MYAUTH_ROLE.superadmin) {
      return true;
    }
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return authorizedRoles.indexOf(this.role) !== -1;
  };

  return User;
});
