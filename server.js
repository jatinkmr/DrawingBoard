const express = require('express');
const app = express();
const socketio = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketio(server);

app.use(
	express.static(__dirname + '/public')
);

io.on('connection', (socket) => {
	socket.on('draw', (data) => {
		socket.broadcast.emit('draw', data);
	});
});

const port = 3291 || process.env.PORT;
server.listen(port, () => { 
	console.log('Server Started at ' + port);
	console.log('http://localhost:3291/');
});