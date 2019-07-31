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

var fileGate = false; //gates access to file to one user at a time to prevent data loss
var postErrorCheck = false;
var getErrorCheck = false;

if(!fs.existsSync("data.txt")) {
    fs.writeFile("data.txt", "0\n1\n2", error => {
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

var dataMemberIterator = 'name';
var dataNameTemp = null;

var executionNum = 0;

function mainGet() {

}

function mainPost() {
    console.log("fileGate: " + fileGate);
    console.log("executionNum: " + executionNum);
    executionNum = 0;
    fileGate = true;
    data.length = null;
    data.array = [];
    postErrorCheck = false;
    fs.readFile('data.txt', (error, readData) => {
        if(error) {
            console.log(error);
            postErrorCheck = true;
        }
        else {
            let fileContent = readData.toString().split('\n');
            console.log(fileContent);
        }
    });
    if(postErrorCheck) {
        response.json("0");
        return 0;
    }
}

function gate(executionType) {
    if(!fileGate) {
        if(executionType === "post")
            mainPost();
        else if(executionType === "get")
            mainGet();
    }
    else if(fileGate) {
        ++executionNum;
        if(executionNum === 200)
            fileGate = false;
        setTimeout(gate, 10, executionType);
    }
}

app.post('/autoCrawlerHighScores', (request, response) => {
    gate("post");
});

app.get('/autoCrawlerHighScores', (request, response) => {
    //get data from file
    response.json({data});
});

app.listen(3000);