console.log("hello world");

const socket = io('https://damp-brook-48872.herokuapp.com', {path: '/socketTest'});

socket.on('connect', (sock) => {
    console.log("socket connected");
});