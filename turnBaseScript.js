getString = (text, array, index, endChar) => {
    for(let a = 0; index < text.length && text[index] != endChar; ++index) {
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
    index = getString(text, testString1, index, '\n');
    index = getString(text, testString2, index, '\n');
    console.log(testString1);
    console.log(testString2);
}
