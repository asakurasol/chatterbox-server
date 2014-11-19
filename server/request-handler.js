var data = require('./messages.js').data;

var util = require('./util.js');

var requestHandler = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);

  if(request.method === 'OPTIONS'){
    util.sendResponse(response, 200);
  } else if(request.url === '/'){
    util.loadFile(response, '/index.html');
  } else if(request.method === 'GET'){
    util.sendResponse(response, 200, data);
  } else if(request.method === 'POST'){
    util.processData(request, response, util.sendResponse);
  } else {
    util.loadFile(response, request.url);
  }
};

module.exports.requestHandler = requestHandler;
