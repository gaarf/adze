var module = angular.module(PKG.name+'.services');

/*
  inspired by https://medium.com/opinionated-angularjs/techniques-for-authentication-in-angularjs-applications-7bbf0346acec
 */

module.constant('MYAUTH_EVENT', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout', // TODO
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
});


module.constant('MYAUTH_ROLE', {
  all: '*',
  superadmin: 'superadmin',
  admin: 'admin'
});

module.run(function ($rootScope, $alert, myAuth, MYAUTH_EVENT, MYAUTH_ROLE) {
  $rootScope.currentUser = myAuth.currentUser;

  $rootScope.$on('$stateChangeStart', function (event, next) {
    var authorizedRoles = next.data && next.data.authorizedRoles;
    if (!authorizedRoles) { return; } // no role required, anyone can access

    var user = myAuth.currentUser;
    if (user) { // user is logged in
      if (authorizedRoles === MYAUTH_ROLE.all) { return; } // any loggedin user is welcome
      if (user.hasRole(authorizedRoles)) { return; } // user is legit
    }
    // in all other cases, prevent going to this state
    event.preventDefault();
    $rootScope.$broadcast(user ? MYAUTH_EVENT.notAuthorized : MYAUTH_EVENT.notAuthenticated);
  });

});


module.service('myAuth', function (MYAUTH_EVENT, MyAuthUser, $rootScope, $localStorage, $sessionStorage) {

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
    if(c.username && c.password) {
      persist( new MyAuthUser(c) );
      $rootScope.$broadcast(MYAUTH_EVENT.loginSuccess);
    }
    else {
      $rootScope.$broadcast(MYAUTH_EVENT.loginFailed);
    }
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



module.factory('MyAuthUser', function (MYAUTH_ROLE) {

  /**
   * Constructor for currentUser data
   * @param {object} c credentials
   */
  function User(c) {
    this.username = c.username;
    this.tenant = c.tenant;

    // wholly insecure while we wait for real auth
    var a = MYAUTH_ROLE.admin;
    if(c.username===a && c.password===a) {
      if(c.tenant===MYAUTH_ROLE.superadmin) {
        this.role = MYAUTH_ROLE.superadmin;
      }
      else if(c.tenant) {
        this.role = a;
      }
    }
  }

  /**
   * make a User from data instead of credentials
   * @param  {Object} stored data
   * @return {User}
   */
  User.revive = function(data) {
    if(data) {
      var user = new User(data);
      user.role = data.role;
      return user;
    }
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
