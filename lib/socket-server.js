var socketio = require('socket.io');
var guestNumber = 1;
var players = {};

var enterPlayer = function(socket, io){
  var playerName = "Player" + guestNumber;
  console.log(guestNumber + " @@@@@@@@@@@@@@@@@@@@guest number just joined the game");
  players[socket.id] = playerName; 
  guestNumber += 1;
  
  var message;
  var ready;
  if(guestNumber === 2) { 
    ready = false, message = "Player 1's connection has been established! Please wait for player 2's connection (or open another browser to establish second connection)." }

  else if(guestNumber === 3){ ready = true, message = "Player 2's connection has been established. Begin play at any time!" }
  else { ready = false, message = "Uh-oh, looks like this game is open in more than two browsers! Please close all browsers displaying this game and then come back and try again."
  }
    io.sockets.emit('entrance', { message: message, ready: ready });
}

var alertMove = function(socket, io){
  socket.on('move', function(data){
    console.log('I am socket: ' + socket.id);
    io.sockets.emit('move', { pos: data.pos, sender: socket.id } )
  })
}

var handleDisconnect = function(socket, io){
  socket.on('disconnect', function(){
    guestNumber -= 1; 
    console.log("disconnecting, now only " + guestNumber + " players");
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
    handleDisconnect(socket,io);

  })

}

exports.socketIOListen = socketIOListen;
