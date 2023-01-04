let socket =  io();

socket.on('connect', function() {
    console.log('connected to server');
})

socket.on('disconnect', function(){
    console.log('disconnected to server');
})

socket.on('newmessage', function (message) {
    console.log('newmessage==>',message);
})
socket.emit('createmessage',{
    from:'Neha',
    text:'heyy'
}, function(message){
    console.log(message, 'server got it...');
});