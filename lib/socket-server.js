var socketio = require('socket.io');

var socketIOListen = function(server) {
  var io = socketio.listen(server);

  io.sockets.on('connection', function(socket){
    console.log('recieved connection from: ', socket.id);

    socket.on('move', function(data){
      console.log('recieved this data: ' + data);

      io.sockets.emit('move', { pos: data.pos, sender: socket.id } )
    })

  })
}

exports.socketIOListen = socketIOListen;
