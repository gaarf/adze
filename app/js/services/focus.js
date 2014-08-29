var module = angular.module(PKG.name+'.services');


module.factory('myFocusManager', function myFocusManagerFactory ($rootScope) {

  function Manager () {
    this._last = null;
    this.is = $rootScope.$new(true);
  }

  Manager.prototype._set = function(k, v) {
    this.is[this._last] = false;
    this.is[k] = {};
    this.is[k][v] = Date.now();
    this._last = k;
  };

  Manager.prototype.focus = function(k) {
    this._set(k, 'focus');
  };

  Manager.prototype.select = function(k) {
    this._set(k, 'select');
  };

  return new Manager();
});
