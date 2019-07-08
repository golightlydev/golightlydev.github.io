var test = "test for swears: fuck you asshole!";

fetch('http://localhost:3000/autoCrawlerHighScores').then(response => response.json())
    .then(data => {
        console.log(data);
    });
    
fetch('http://localhost:3000/', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({test}),
}).then(response => response.json())
    .then(data => {console.log(data);});