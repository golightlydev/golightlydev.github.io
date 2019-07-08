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

data.length = 1;
data.array.push(new Data("nick", 10));

app.post('/autoCrawlerHighScores', (request, response) => {
    console.log(response.body.test);
    response.json({body: 'post succeeded'});
});

app.get('/autoCrawlerHighScores', (request, response) => {
    response.json({data});
});

app.listen(3000);