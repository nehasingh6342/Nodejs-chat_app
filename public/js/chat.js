let socket =  io();

function scrollToBottom(){
    let messages = document.querySelector('#messages').lastElementChild;
    messages.scrollIntoView();
}

socket.on('connect', function() {
    console.log('connected to server');
})

socket.on('disconnect', function(){
    console.log('disconnected to server');
})

socket.on('newmessage', function (message) {
    const formatedTime = moment(message.createdAt).format('LT')
    const template = document.querySelector('#message-template').innerHTML;
    const html = Mustache.render(template,{
        from: message.from,
        text: message.text,
        createdAt: formatedTime
    });
    const div = document.createElement('div');
    div.innerHTML = html

    document.querySelector('#messages').appendChild(div);
    scrollToBottom();

})

socket.on('newLocationmessage', function (message) {
    const formatedTime = moment(message.createdAt).format('LT')
    console.log('newLocationmessage==>',message);
    const template = document.querySelector('#location-message-template').innerHTML;
    const html = Mustache.render(template, {
      from: message.from,
      url: message.url,
      createdAt: formatedTime
    });
    const div = document.createElement('div');
    div.innerHTML = html
    document.querySelector('#messages').appendChild(div);
    scrollToBottom();
});


document.querySelector('#submitbtn').addEventListener('click', function(e){
    e.preventDefault();
    socket.emit('createmessage',{
        from:'User',
        text: document.querySelector('input[name="message"]').value
    }, function (){
        document.querySelector('input[name="message"]').value = '';
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