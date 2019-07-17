const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
const fs = require('fs');
const readline = require('readline');
const Filter = require('bad-words');
var filter = new Filter();


//naive implementation

/*var write = null;
var writing = false;

function testFunction(num) {
    write.write(num);
}

write = fs.createWriteStream("data.txt", {flags:'a'});
writing
for(let a = 0; a < 3; ++a) {
    testFunction(a.toString());
}
write.end();
write = null;
write = fs.createWriteStream("data.txt", {flags:'a'});
for(let a = 0; a < 5; ++a) {
    testFunction(a.toString());
}
write.end();
write = null;*/

var fileGate = false; //gates access to file to one user at a time to prevent data loss

if(!fs.existsSync("data.txt"))
    fs.writeFile("data.txt", "0", error => {
        console.log(error);
    });

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

app.post('/autoCrawlerHighScores', (request, response) => {
    if(fileGate)
        window.setTimeout(fileGate, 10);
    fileGate = true;
    /*let readInterface = readline.createInterface( {
        input: fs.createReadStream('data.txt'),
        output: process.stdout,
        console: false,
    });
    data.length = 0;
    data.array = [];
    readInterface.on('line', function(line) {
        data.length = Number(line);
    });
    for(let a = 0; a < data.length; ++a) {
        let name = null;
        let number = 0;
        readInterface.on('line', function(line) {
            name = line;
        });
        readInterface.on('line', function(line) {
            number = Number(line);
        });
        data.array.push(new Data(name, number));
    }
    readInterface.close();*/
    if(data.length === 0) {
        ++data.length;
        data.array.push(new Data(request.body.data.name, request.body.data.number));
    }
    else {
        for(let a = 0; a < data.length; ++a) {
            if(Number(request.body.data.number) > data.array[a].number) {
                let temp = new Data(data.array[a].name, data.array[a].number);
                data.array[a].name = filter.clean(request.body.data.name);
                if(!isNaN(request.body.data.number))
                    data.array[a].number = request.body.data.number;
                ++data.length;
                data.array.push(new Data(null, null));
                for(let b = a + 1; b < data.length; b+=2) {
                    let temp2 = new Data(data.array[b].name, data.array[b].number);
                    data.array[b].name = temp.name;
                    data.array[b].number = temp.number;
                    if(b+1 < data.length) {
                        temp.name = data.array[b+1].getName();
                        temp.number = data.array[b+1].number;
                        data.array[b+1].name = temp2.name;
                        data.array[b+1].number = temp2.number;
                    }
                }
                if(data.length > 10) {
                    data.array.pop();
                    --data.length;
                }
                break;
            }
            if(a+1 === data.length) {
                ++data.length;
                data.array.push(new Data(request.body.data.name, request.body.data.number));
                break;
            }
        }
    }
    console.log(data);
    fileGate = false;
    response.json({body: 'post succeeded'});
});

app.get('/autoCrawlerHighScores', (request, response) => {
    response.json({data});
});

app.listen(3000);