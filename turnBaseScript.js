loadFile = () => {
    var loadTxtHandle = document.getElementById("loadTxt");
    var text = loadTxtHandle.contentWindow.document.body.childNodes[0].innerHTML;
    console.log(text);
}