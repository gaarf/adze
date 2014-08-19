var module = angular.module('adze.services');


module.factory('ChuckNorris', function($resource){

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
