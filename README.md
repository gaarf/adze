Coopr Angular UI
================

### for development:

`npm install && bower install`
`LOOM_USE_DUMMY_PROVISIONER=true ../loom/standalone/target/.../bin/loom.sh start`

and then, each in their own tab:
`gulp watch` (autobuild + livereload)
`npm start` (http-server + cors-anywhere)
`npm test` (run karma for unit tests)

UI runs on port `8080`
corsproxy runs on port `8081`
loom server API is expected to be on port `55054`

### for testing:

`npm run protractor` (end-to-end tests)
`npm run test-single-run` (unit tests)

protractor spins up a server on port `9090`

### for production:

first make a clean build into `./dist` folder:
`npm install && bower install`
`gulp clean build minify`

then to run the server, possibly on a different host:
`npm install --production`
`npm start` (http-server + cors-anywhere)
