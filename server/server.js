const path = require ('path')
const http = require('http')
const express= require('express')
const socketIo = require('socket.io')

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '/../public')
const port = process.env.PORT || 4000

var app = express();

let server = http.createServer(app);
let io = socketIo(server);


app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('A new user just connected');

    // socket.emit('newmessage',{
    //     from:'Admin',
    //     text:'welcome to the Chat app!!!!',
    //     createdAt:new Date().getTime()
    // });

    socket.emit('newmessage',generateMessage('Admin', 'welcome to the Chat app!!!!'));

    // socket.broadcast.emit('newmessage',{
    //     from:'Admin',
    //     text:'New user joined',
    //     createdAt:new Date().getTime()
    // });

    socket.broadcast.emit('newmessage',generateMessage('Admin', 'New user joined!'));

    socket.on('createmessage',(message, callback)=>{
        console.log('createmessage==>>', message);
        io.emit('newmessage',generateMessage(message.from, message.text))
        callback('this is the server:');

        // socket.broadcast.emit('newmessage', {
                // from: message.from,
                // text:message.text,
                // createdAt:new Date().getTime()
        // })
    })

    socket.on('createLocationMsg',(coords)=>{
        io.emit('newLocationmessage',
        generateLocationMessage('Admin ', coords.lat, coords.lng))
    })

    socket.on('disconnect', () => {
        console.log('user just disconnected');
    });
});

server.listen(4000,()=>{
    console.log(`server is running on ${port}`);
})
