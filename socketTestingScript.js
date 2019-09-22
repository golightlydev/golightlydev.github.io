console.log("hello world");

const socket = io('https://damp-brook-48872.herokuapp.com', {path: '/socketTest'});

socket.on('connect', (sock) => {
    console.log("socket connected");

    sock.on('disconnect', () => {
        console.log("disconnected");
        socket = null;
    });
});

var connectButton = document.getElementById("connectButton");
var disconnectButton = document.getElementById("disconnectButton");
disconnectButton.addEventListener('click', () => {
    if(socket) {
        console.log("firing disconnect message");
        socket.emit('disconnectMessage', {msg1: 'hello message', msg2: 'good bye message'});
    }
});

connectButton.addEventListener('click', () => {
    if(!socket) {
        console.log("firing connection messsage");
        socket = io('https://damp-brook-48872.herokuapp.com', {path: '/socketTest'});
    }
});

