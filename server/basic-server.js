/* Import node's http module: */
var http = require("http");
var handleRequest = require('./request-handler.js').requestHandler;
var urlParser = require('url');
var util = require('./util.js');
var port = 3000;

var ip = "127.0.0.1";

var routes = {
  '/classes/messages': require('./request-handler.js').requestHandler
};

var server = http.createServer(function(request, response){
  var parts = urlParser.parse(request.url);
  console.log(parts.pathname);
  var route = routes[parts.pathname];
  if(route){
    route(request, response);
  } else if(parts.pathname === '/') {
    console.log('directing home');
    util.loadFile(response, '/index.html', 'html');
  } else {
    util.loadFile(response, parts.pathname);
  }
});
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);


