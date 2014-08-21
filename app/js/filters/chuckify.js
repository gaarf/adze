var module = angular.module(PKG.name+'.filters');



module.filter('myChuckify', function(myChuckNorrisJoke) {

  return function(input) {
    return input + ' - ' + (myChuckNorrisJoke.joke||'a joke goes here');
  };

});