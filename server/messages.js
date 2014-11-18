// our database  WooHOoooo

var data = {};
data.results = [];
var message = {
  username : "avi",
  text: "hello",
  roomname: "lobby",
  createdAt: "The Dawn Of Time",
  objectId: 0
};
data.results.push(message);
var counter = 1;

function Message(username, text){
  counter++;
  this.username = username;
  this.text = text;
  this.roomname = "HELL";
  this.createdAr = Date();
  this.objectId = counter;
}

var moreAvis = function() {
  data.results.unshift(new Message('Avi', 'Rage'));
};

data.add = function(username, text){
  var newMessage = new Message(username, text);
  data.results.unshift(newMessage);
};

setInterval(moreAvis, 4000);

exports.data = data;
