var express  = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var data = require('./server/messages.js').data;

app.use(express.static(path.join(__dirname + '/client')));

//home page redirect to index
app.get('/', function(req, res){
  res.redirect('/index.html');
});

//get messages
app.get('/classes/messages', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.json(data);
});

//post messages

var jsonParser = bodyParser.json();

app.post('/classes/messages', jsonParser, function(req, res) {
  data.add(req.body.username, req.body.text);
  res.end();
});

app.listen(3000);
