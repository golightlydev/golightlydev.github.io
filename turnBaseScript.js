loadFile = () => {
    let loadTxtHandle = document.getElementById("loadTxt");
    let text = loadTxtHandle.contentWindow.document.body.childNodes[0].innerHTML;
    console.log(text);
    let index = 0;
    let testString1 = [];
    let testString2 = [];
    for(let a = 0; index < text.length && text[index] != '\n'; ++index) {
        testString1[a] = text[index];
        ++a;
    }
    ++index;
    for(let a = 0; index < text.length && text[index] != '\n'; ++index) {
        testString2[a] = text[index];
        ++a;
    }
    console.log(testString1);
    console.log(testString2);
}
