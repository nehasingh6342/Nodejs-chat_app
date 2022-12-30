const path = require ('path')
const http = require('http')
const express= require('express')
const socketIo = require('socket.io')

const publicPath = path.join(__dirname, '/../public')
const port = process.env.PORT || 4000

var app = express();

let server = http.createServer(app);
let io = socketIo(server);


app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('A new user just connected');

    socket.emit('newmessage',{
        from:'Admin',
        text:'welcome to the Chat app!!!!',
        createdAt:new Date().getTime()
    });

    socket.broadcast.emit('newmessage',{
        from:'Admin',
        text:'New user joined',
        createdAt:new Date().getTime()
    });

    socket.on('createmessage',(message)=>{
        console.log('createmessage==>>', message);
        io.emit('newmessage', {
            from: message.from,
            text:message.text,
            createdAt:new Date().getTime()
        })
        // socket.broadcast.emit('newmessage', {
                // from: message.from,
                // text:message.text,
                // createdAt:new Date().getTime()
        // })
    })

    socket.on('disconnect', () => {
        console.log('user just disconnected');
    });
});

server.listen(4000,()=>{
    console.log(`server is running on ${port}`);
})
