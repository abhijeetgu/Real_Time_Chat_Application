//Node Server which will handle socket io connections
const io = require('socket.io')(8000) //making of socket.io server with 8000 port

const users = {};

io.on('connection', Socket =>{
    //If any new user joins, let other users connected to the server
    Socket.on('new-user-joined', name =>{
        // console.log("New user", name)
        users[Socket.id] = name; //key
        Socket.broadcast.emit('user-joined', name); //inform to other user 
    });
   // If someone sends a message, broadcast it to other people
    Socket.on('send', message =>{
        Socket.broadcast.emit('receive', {message: message, name: users[Socket.id]})
    })
    // if someone leaves the chat, let other people know
    Socket.on('disconnect', message =>{
        Socket.broadcast.emit('left',  users[Socket.id]);
        delete users[Socket.id];
    })
});