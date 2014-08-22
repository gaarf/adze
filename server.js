var port = process.env.COOPR_UI_PORT || 8080;

require('http-server')
  .createServer({
    root: __dirname + '/dist',
    logFn: function (req) {
      console.log('\n[http-server] %s', (new Date).toUTCString());
      console.log('%s %s', req.method, req.url);
    }
  })
  .listen(port, '0.0.0.0', function () {
    console.log('[http-server] listening on port %s', port);
  });


require('cors-anywhere')
  .createServer({
    requireHeader: [],
    removeHeaders: ['cookie', 'cookie2']
  })
  .listen(8081, '0.0.0.0', function() {
    console.log('[cors-anywhere] listing on port 8081');
  })
  .proxy.on('proxyResponse', function (res) {
    console.log('\n[cors-anywhere] %s', (new Date).toUTCString());
    console.log('%s %s', res.method, res.corsAnywhereRequestState.location.full_url);
  });


