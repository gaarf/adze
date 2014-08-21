var module = angular.module(PKG.name+'.services');


module.factory('myChuckNorrisAPI', function($resource){
  return $resource( 'http://api.icndb.com/jokes/random', 
    { 
      callback: 'JSON_CALLBACK' 
    }, 
    {
      getJoke: { 
        method: 'JSONP',
        transformResponse: function(data, headers) {
          return data.value;
        }
      }
    }
  );
});


module.factory('myChuckNorrisJoke', function(myChuckNorrisAPI){
  return myChuckNorrisAPI.getJoke();
});

