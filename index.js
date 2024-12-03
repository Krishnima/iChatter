//node server which will handle socketio coonection
const io= require('socket.io')(8000)     //port=8000

const users={};
 
io.on('connection', socket=>{           // saare req sunega
    socket.on('new-user-joined', name =>{ // particular coonection k sath kya hoga decide krega 
       users[socket.id]= name;
       socket.broadcast.emit('user-joined',name);
    });

    //if someone sends a message , broadcast it to other people
    socket.on('send',message =>{
        socket.broadcast.emit('receive',{measage:message, name: user[socket.id]})
    });


    // if someome leaves the chat , let others know 
    socket.on('disconnect',message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });

})