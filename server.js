const express = require('express');
const http = require('http');
const socketio = require('socket.io')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = 5000 || process.env.PORT;

io.on('connection', socket => {
    console.log('New WS Connection')

    socket.emit('message','Welcome To Typing Game')
})

server.listen(PORT, () => console.log(`Server running on Port ${PORT}`))