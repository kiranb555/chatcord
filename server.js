const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
// set static folder 
app.use(express.static(path.join(__dirname,'public')))


// Run when client connects
io.on('connection', socket => { 

    // welcome current user (single client) 
    socket.emit('message', "Welcome to ChatCord!")

    // Brodcast when a user connects (all of the client except connected )
    socket.broadcast.emit('message', "A user has joined the chat ")

    // this runs when client disconnect
    socket.on('disconnect', () => {
        io.emit('message', "A User has left the chat")
    })

    // listen for chat message
    socket.on('chatMessage', msg => {


        io.emit('message',msg);
    })
});


const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`server running on port ${PORT}`))