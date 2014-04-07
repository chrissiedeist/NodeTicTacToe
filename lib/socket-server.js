var socketio = require('socket.io');
var guestNumber = 1;
var players = {};

var enterPlayer = function(socket, io){
  var playerName = "Player" + guestNumber;
  console.log(guestNumber + " @@@@@@@@@@@@@@@@@@@@guest number just joined the game");
  players[socket.id] = playerName; 
  guestNumber += 1;
  
  var message;
  if(guestNumber === 2) { 
    message = " Please wait for another player to join the game before making your first move." }
  else { message = "Ok, both players are here! Begin game at any time." }
  io.sockets.emit('entrance', { message: message });
}

var alertMove = function(socket, io){
  socket.on('move', function(data){
    console.log('I am socket: ' + socket.id);
    io.sockets.emit('move', { pos: data.pos, sender: socket.id } )
  })
}

var handleMessages = function(socket, io){
  socket.on('message', function(data) {
    io.sockets.emit('message', { player: players[socket.id], text: data.text })
  })
}

var socketIOListen = function(server) {
  var io = socketio.listen(server);

  io.sockets.on('connection', function(socket){
    console.log('recieved connection from: ', socket.id);

    alertMove(socket, io);
    enterPlayer(socket, io);

  })
  io.sockets.once('connection', function(socket){
    io.sockets.emit('connected'); 
  })

}

exports.socketIOListen = socketIOListen;
