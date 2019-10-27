console.log("hello world");

var socket = null;
var disconnected = true;
var init = false;

var connectButton = document.getElementById("connectButton");
var disconnectButton = document.getElementById("disconnectButton");
var roomNameInput = document.getElementById('roomNameInput');
var roomName = null;

disconnectButton.addEventListener('click', () => {
    if(socket) {
        console.log("firing disconnect message");
        socket.emit('disconnectMessage', {msg1: 'hello message', msg2: 'good bye message'});
        socket.close();
        console.log("disconnected");
    }
});

connectButton.addEventListener('click', () => {
    if(!init) {
        console.log("firing connection messsage");
        socket = io('https://damp-brook-48872.herokuapp.com', {path: '/socketTest'});
        
        socket.on('connect', () => {
            console.log('socket connected');
            disconnected = false;
            if(!init)
                init = true;
            console.log("GETS HERE");
            roomName = roomNameInput.value;
            console.log("roomName: " + roomName);
            socket.emit('join', {msg:roomName});
        });
        
        socket.on('disconnect', () => {
            console.log("disconnect event fired");
            disconnected = true;
        });

        socket.on('serverResponse', (message) => {
            console.log("message: " + message.msg);
        });

        socket.on('broadcast', (message) => {
            console.log("message: " + message.msg);
        });
        init = true;
    }
    else if(init && disconnected) {
        console.log("firing reconnection message");
        socket.open();
    }
});

