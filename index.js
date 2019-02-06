var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('\nmade socket connection :', socket.id);
    console.info('made socket connection hanshake url :', socket.handshake.url);
    console.log('made socket connection  clientsCount :',  socket.conn.server.clientsCount);

    // Handle chat event
    socket.on('chat', function(data){
        console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
	
	 socket.on('error', function (err_msg) {
		console.log('Connection Error: ',  err_msg);
	});

	socket.on('disconnect', function(msg){
		console.log('user disconnected :',  msg);
	});

});
