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

var data = new Data("nick7", "120");

fetch('http://localhost:3000/autoCrawlerHighScores').then(response => response.json())
    .then(data => {
        console.log("get: ");
        console.log(data);
    });