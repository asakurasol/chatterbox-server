var data = require('./messages.js').data;
var fs = require('fs');

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/JSON"
};

var sendResponse = function(response, statusCode, data) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};

var loadFile = function(response, url, fileType) {
  fileType = fileType || 'css';
  fs.readFile('../client'+url, function(err, data){
    if(err){
      response.writeHead(404, headers);
      response.end('');
    } else {
      response.writeHead(200, {'Content-Type': 'text/'+fileType, 'Content-Length':data.length});
      response.write(data);
      response.end();
    }
  });
};

var processData = function(request, response, callback) {
  var message = '';

  request.on('data', function(chunk){
    message += chunk;
  });

  request.on('end', function() {
    var msg = JSON.parse(message);
    data.add(msg.username, msg.text);
    callback(response, 201);
  });
};

module.exports.sendResponse = sendResponse;
module.exports.loadFile = loadFile;
module.exports.processData = processData;
