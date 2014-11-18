/*
create data base structure for our messages
handle url queries

/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var querystring = require('querystring');
var data = require('./messages.js').data;
var fs = require('fs');
var body;

if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function(searchString, position) {
      position = position || 0;
      return this.lastIndexOf(searchString, position) === position;
    }
  });
}

var requestHandler = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var statusCode = 200;
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "text/plain";
  var responseMessage = '';
  if(request.method === 'OPTIONS'){

    var headers = {};
    // IE8 does not allow domains to be specified, just the *
    // headers["Access-Control-Allow-Origin"] = req.headers.origin;
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
    headers["Access-Control-Allow-Credentials"] = false;
    headers["Access-Control-Max-Age"] = '86400'; // 24 hours
    headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
    response.writeHead(200, headers);
    response.end();

  } else if(request.url === '/'){

    fs.readFile('../client/index.html', function(err, data){
      response.writeHead(200, {'Content-Type': 'text/html', 'Content-Length':data.length});
      response.write(data);
      response.end();
    });

  }else if((request.url.startsWith('/classes/messages') || request.url === '/classes/room1') && request.method === 'GET'){

    responseMessage = data;
    headers['Content-Type'] = "application/JSON";
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(responseMessage));

  } else if((request.url.startsWith('/classes/messages') || request.url === '/classes/room1') && request.method === 'POST'){

    var body = '';
      request.on('data', function(data){
      body += data;
    });

    request.on('end', function() {
      body = querystring.parse(body);
      var msg;
      for(var key in body){
        msg = JSON.parse(key);
        data.add(msg.username, msg.text);
      }
      statusCode = 201;
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(responseMessage));
    });

  } else {

    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end('');

  }

};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
exports.requestHandler = requestHandler;
