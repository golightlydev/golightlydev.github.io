getLine = (text, array, index) => {
    for(let a = 0; index < text.length && text[index] != '\n'; ++index) {
        array[a] = text[index];
        ++a;
    }
    return ++index;
}

loadFile = () => {
    let loadTxtHandle = document.getElementById("loadTxt");
    let text = loadTxtHandle.contentWindow.document.body.childNodes[0].innerHTML;
    console.log(text);
    let index = 0;
    let testString1 = [];
    let testString2 = [];
    index = getLine(text, testString1, index);
    index = getLine(text, testString2, index);
    console.log(testString1);
    console.log(testString2);
}
