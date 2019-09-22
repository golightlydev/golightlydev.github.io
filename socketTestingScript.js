console.log("hello world");

const socket = io('https://damp-brook-48872.herokuapp.com', {path: '/socketTest'});

sock.on('connect', () => {
    console.log('socket connected');
});

socket.on('connection', (sock) => {
    //try changing this to disconnectReply
    sock.on('disconnect', () => {
        console.log("disconnected");
        sock.disconnect();
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

