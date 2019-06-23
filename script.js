function formSubmit(event) {
    name = content.children[0].children[0].children[1].value;
    for(let a = 0; a < 3; ++a) {
        if(content.children[0].children[0].children[5].children[a].children[0].checked)
            portrait = a;
    }
    if(name !== null && portrait !== null) {
        content.children[0].children[0].children[8].removeEventListener("click", formSubmit);
        content.removeChild(content.children[0]);
        console.log("test");
    }
}

const content = document.getElementById("content");
content.children[0].children[0].children[8].addEventListener("click", formSubmit);
var name = null;
var portrait = null;
