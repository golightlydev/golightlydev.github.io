const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
const fs = require('fs');
const Filter = require('bad-words');
var filter = new Filter();

var fileGate = [];
fileGate.push(false); //gates access to file to one user at a time to prevent data loss

if(!fs.existsSync("data.txt")) {
    fs.writeFile("data.txt", "0", error => {
        console.log(error);
    });
}

class Data {
    constructor(name, number) {
        this.name = name;
        this.number = number;
    }
    getName() { return this.name; }
    setName(name) { this.name = name; }
    getNumber() { return this.number; }
    setNumber(number) { this.number = number; }
};

var data = {
    array: [],
    length: 0,
};

var dataNumberTemp = 0;
var dataNameTemp = null;

function mainGet() {

}

function processPost(fileContent, request) {
    data.length = fileContent[0];
    dataNameTemp = null;
    //populate data with data from file
    for(let a = 1; a < (data.length * 2); a+=2) {
        dataNameTemp = fileContent[a];
        data.array.push(new Data(dataNameTemp, fileContent[a+1]));
    }
    //adds new blank Data object to data.array if length is less than 10
    if(data.length < 10) {
        ++data.length;
        data.array.push(new Data(null, 0));
    }
    for(let a = 0; a < data.length; ++a) {
        if(request.body.data.number > data.array[a].number) {
            //moves Data towards the end in data.array starting from the end moving forward
            //last element is overwritten, either blank or unneeded now
            for(let b = (data.length - 1); b > a; --b) {
                data.array[b].name = data.array[b - 1].name;
                data.array[b].number = data.array[b - 1].number;
            }
            //place data in request into data.array, filter name for offensive language
            data.array[a].name = filter.clean(request.body.data.name);
            data.array[a].number = request.body.data.number;
        }
    }
}

function writePost(fileContent, response, fileGate) {
    fileContent = data.length.toString();
    for(let a = 0; a < data.length; ++a) {
        fileContent += '\n';
        fileContent += data.array[a].name;
        fileContent += '\n';
        fileContent += data.array[a].number;
    }
    fs.writeFile("data.txt", fileContent, (error, response, fileGate) => {
        if(error) {
            console.log(error);
            arguments[0].json("0: error writing to file");
            arguments[1][0] = false;
        }
        else {
            arguments[0].json("1: successful post");
            arguments[1][0] = false;
        }
    });
}

function mainPost(request, response) {
    if(Number.isNaN(request.body.data.number)) {
        response.json("0: not a valid number");
        return;
    }
    fileGate[0] = true;
    data.length = null;
    data.array = [];
    fs.readFile('data.txt', (error, readData, request, response, fileGate) => {
        if(error) {
            console.log(error);
            arguments[1].json("0: error reading file");
            arguments[2][0] = false;
        }
        else {
            let fileContent = readData.toString().split('\n');
            processPost(fileContent, arguments[0]); //turns fileContent into data, and uses request
            writePost(fileContent, arguments[1], arguments[2]); //also sends response
        }
    });
}

function gate(executionType, request, response) {
    if(!fileGate[0]) {
        if(executionType === "post")
            mainPost(request, response);
        else if(executionType === "get")
            mainGet();
    }
    else if(fileGate[0]) {
        setTimeout(gate, 10, executionType);
    }
}

app.post('/autoCrawlerHighScores', (request, response) => {
    gate("post", request, response);
});

app.get('/autoCrawlerHighScores', (request, response) => {
    //get data from file
    response.json({data});
});

app.listen(3000);