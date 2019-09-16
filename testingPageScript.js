/*

"use strict";

const hostsForm = document.getElementById("hostsForm");
const nameInput = document.getElementById("nameInput");
const submitRole = document.getElementById("submitRole");
const hostRadio = document.getElementById("hostRadio");
const clientRadio = document.getElementById("clientRadio");
const passwordInput = document.getElementById("passwordInput");
const lobbyMaxInput = document.getElementById("lobbyMaxInput");
const leaveLobby = document.getElementById("leaveLobby");

/*WEBRTC CODE START*/

var iceConfiguration = {
    'iceServers': [{
        'url': 'stun:stun.l.google.com:19302',
    }],
};

var peerConnection = null;

var dataChannelOptions = {
    ordered: true,
    maxRetransmitTime: 1000,
};

var dataChannel = null;

/*WEBRTC CODE END*/

var name = null;
var password = null;
var isHost = null;
var hostNames = [];

var hostInfo = {
    name: null,
    password: null,
    clientNum: null,
    sdp: [],
};

//get host names and populate hostsForm, first emptying the previous form except for none option
fetch('https://damp-brook-48872.herokuapp.com/testingPage').then(response => response.json())
    .then(data => {
        hostNames = [];
        let hostsFormChild = hostsForm.lastElementChild;
        while(hostsFormChild) {
            if(hostsFormChild.id == "hostNoneLabel")
                break;
            hostsForm.removeChild(hostsFormChild);
            hostsFormChild = hostsForm.lastElementChild;
        }
        for(let a = 0; a < data.hostNames.length; ++a) {
            hostNames.push(data.hostNames[a]);
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.setAttribute('id', hostNames[a]);
            input.setAttribute('type', 'radio');
            input.setAttribute('name', 'host');
            input.innerText = hostNames[a];
            label.appendChild(input);
            hostsForm.appendChild(label);
        }
    });

submitRole.addEventListener("click", function(event) {
    name = nameInput.value;
    password = passwordInput.value;
    console.log("name: " + name);
    console.log("password: " + password);
    if(name == null || password == null) {
        console.log("error: enter a name and password");
        return;
    }
    if(name.length > 20 || password.length > 20) {
        console.log("error: name or password is too long (max 20 char)")
        return;
    }
    if(hostRadio.checked) {
        isHost = true;
        hostInfo.name = name;
        hostInfo.password = password;
        hostInfo.clientNum = parseInt(lobbyMaxInput.value);
        if(isNaN(hostInfo.clientNum)) {
            console.log("error: enter valid max client num");
            return;
        }
        if(hostInfo.clientNum > 100 || hostInfo.clientNum < 1) {
            console.log("error: invalid max client number");
            return;
        }
        for(let a = 0; a < hostInfo.clientNum; ++a) {

        }
        console.log("host radio is checked");
        fetch('https://damp-brook-48872.herokuapp.com/testingPage', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: 
        });
    }
    else if(clientRadio.checked) {
        isHost = false;
        console.log("client radio is checked");
        //check if a host is selected
    }
});

leaveLobby.addEventListener("click", function(event) {

});

*/