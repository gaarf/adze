var port = process.env.COOPR_UI_PORT || 8080,
    httpLabel = '\x1B[7m http-server \x1B[27m',
    corsLabel = '\x1B[7m cors-anywhere \x1B[27m';

require('http-server')
  .createServer({
    root: __dirname + '/dist',
    logFn: function (req) {
      console.log(
        '\n%s %s\n\x1B[1m%s\x1B[22m \x1B[36m%s\x1B[39m',
        httpLabel,
        (new Date).toUTCString(),
        req.method,
        req.url
      );
    }
  })
  .listen(port, '0.0.0.0', function () {
    console.log(httpLabel+' listening on port %s', port);
  });


require('cors-anywhere')
  .createServer({
    requireHeader: ['x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
  })
  .listen(8081, '0.0.0.0', function() {
    console.log(corsLabel+' listening on port 8081');
  })
  .proxy.on('proxyResponse', function (res) {
    var location = res.corsAnywhereRequestState.location;
    console.log(
      '\n%s %s\n\x1B[1m%s\x1B[22m %s\x1B[36m%s\x1B[39m',
      corsLabel,
      (new Date).toUTCString(),
      res.method, 
      (location.isHttps ? 'https://' : 'http://') + location.host,
      location.pathAndQueryString || '/'
    );
  });


