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

class HighScoreBoard {
    constructor() {
        this.data = {
            array: [new Data(document.getElementById("oneName"), document.getElementById("oneScore")), 
                new Data(document.getElementById("twoName"), document.getElementById("twoScore")), 
                new Data(document.getElementById("threeName"), document.getElementById("threeScore")), 
                new Data(document.getElementById("fourName"), document.getElementById("fourScore")), 
                new Data(document.getElementById("fiveName"), document.getElementById("fiveScore")), 
                new Data(document.getElementById("sixName"), document.getElementById("sixScore")), 
                new Data(document.getElementById("sevenName"), document.getElementById("sevenScore")), 
                new Data(document.getElementById("eightName"), document.getElementById("eightScore")), 
                new Data(document.getElementById("nineName"), document.getElementById("nineScore")), 
                new Data(document.getElementById("tenName"), document.getElementById("tenScore")), ],
            length: 10,
        };
    }
    populateElement(name, number, index) {
        this.data.array[index].name.innerText = name;
        this.data.array[index].number.innerText = number;
    }
};

var highScoreBoard = null;

fetch('https://damp-brook-48872.herokuapp.com/autoCrawlerHighScores').then(response => response.json())
    .then(data => {
        /*highScoreBoard = new HighScoreBoard();
        for(let a = 0; a < data.data.length; ++a) {
            highScoreBoard.populateElement(data.data.array[a].name, data.data.array[a].number, a);
        }*/
        console.log(data[0].name);
    });