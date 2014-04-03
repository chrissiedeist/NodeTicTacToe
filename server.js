var static = require('node-static');
var socketIOListen = require('./lib/socket-server.js').socketIOListen;

var http = require('http');

var file = new static.Server('./public');

var server = http.createServer();
  
server.on('request', function(req, res){
  req.addListener('end', function(){
    console.log(req.url); 
    file.serve(req, res);
  }).resume();
});
server.listen(8080);

socketIOListen(server);

