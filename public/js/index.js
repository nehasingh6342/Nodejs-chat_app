let socket =  io();

socket.on('connect', function() {
    console.log('connected to server');
})

socket.on('disconnect', function(){
    console.log('disconnected to server');
})

socket.on('newmessage', function (message) {
    console.log('newmessage==>',message);
    let li = document.createElement('li');
    li.innerText = `${message.from}:${message.text}`

    document.querySelector('body').appendChild(li);
})
// socket.emit('createmessage',{
//     from:'Neha',
//     text:'heyy'
// }, function(message){
//     console.log(message, 'server got it...');
// }); 

socket.on('newLocationmessage', function (message) {
    console.log('newLocationmessage==>',message);
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.setAttribute('target','_blank');
    a.setAttribute('href',message.url);
    a.innerText = 'My current Location'
    li.appendChild(a);

    document.querySelector('body').appendChild(li);
});


document.querySelector('#submitbtn').addEventListener('click', function(e){
    e.preventDefault();
    socket.emit('createmessage',{
        from:'User',
        text: document.querySelector('input[name="message"]').value
    }, function (){
    })
})
document.querySelector('#send_location').addEventListener('click', function(e){
    if(!navigator.geolocation){
        return alert('geolocation is not supported by your browser.')
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        socket.emit('createLocationMsg',{
            lat:position.coords.latitude,
            lng:position.coords.longitude
        })
    },function(){
        alert('Unable to fetch location')
    })
});