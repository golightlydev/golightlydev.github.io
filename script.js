const onScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        console.log("it worked");
        console.log((window.innerHeight + window.scrollY));
    }
    console.log("height of content: " + (document.getElementById("menuSpace").clientHeight + container.clientHeight));
    console.log("height of window: " + window.innerHeight);
    console.log("scroll: " + window.scrollY + window.innerHeight);
    console.log("measured against: " + document.body.scrollHeight);
    console.log("height of screen: " + screen.height);
}

const revertColor = (exclude) => {
    switch(exclude) {
        case "home":
            updatesButton.style.color = "white";
            portfolioButton.style.color = "white";
            aboutButton.style.color = "white";
            break;
        case "updates":
            portfolioButton.style.color = "white";
            aboutButton.style.color = "white";
            break;
        case "portfolio":
            updatesButton.style.color = "white";
            aboutButton.style.color = "white";
            break;
        case "about":
            updatesButton.style.color = "white";
            portfolioButton.style.color = "white";
            break;
    }
}

const home = () => {
    container.style.transform = "translateX(0%)";
    currentPage = 0;
    revertColor("home");
}

const updates = () => {
    container.style.transform = "translateX(-25%)";
    currentPage = 1;
    revertColor("updates");
}

const updatesMouseover = () => {
    updatesButton.style.color = "#8b99af";
}

const updatesMouseout = () => {
    if(currentPage != 1)
        updatesButton.style.color = "white";
}

const portfolio = () => {
    container.style.transform = "translateX(-50%)";
    currentPage = 2;
    revertColor("portfolio");
}

const portfolioMouseover = () => {
    portfolioButton.style.color = "#8b99af";
}

const portfolioMouseout = () => {
    if(currentPage != 2)
        portfolioButton.style.color = "white";
}

const about = () => {
    container.style.transform = "translateX(-75%)";
    currentPage = 3;
    revertColor("about");
}

const aboutMouseover = () => {
    aboutButton.style.color = "#8b99af";
}

const aboutMouseout = () => {
    if(currentPage != 3)
        aboutButton.style.color = "white";
}

const detectPointerdown = (event) => {
    ++pointerNum;
    console.log("pointerdown runs: " + pointerNum);
}

const detectPointerup = (event) => {
    if(pointerNum == 2) {
        aboutButton.innerHTML = `${window.innerWidth}`;
        updatesButton.innerHTML = `${document.documentElement.clientWidth}`;
        portfolioButton.innerHTML = "detectPointerup";
    }
    //aboutButton.innerHTML = `${pointerNum}`;
    --pointerNum;
    console.log("this runs: " + pointerNum);
}

const detectPointercancel = (event) => {
    if(pointerNum == 2) {
        aboutButton.innerHTML = `${window.innerWidth}`;
        updatesButton.innerHTML = `${document.documentElement.clientWidth}`;
        portfolioButton.innerHTML = "detectPointercancel";
    }
    //aboutButton.innerHTML = `${pointerNum}`;
    --pointerNum;
    console.log("pointer cancel fired");
}

const onResize = (event) => {
    menuArea.style.position = "absolute";
    menuArea.style.top = viewport.offsetTop + "px";
    menuArea.style.left = viewport.offsetLeft + "px";
    console.log("viewport left: " + viewport.offsetLeft);
    console.log("viewport width: " + viewport.width);
    console.log("viewport height: " + viewport.height);
    console.log("viewport top offset: " + viewport.offsetTop);
    menuArea.style.width = viewport.width + "px";
    menuArea.style.height = viewport.height / 10 + "px";
    menuSpace.style.width = viewport.width + "px";
    menuSpace.style.height = viewport.height / 10 + "px";
    let fontSize = window.getComputedStyle(menuArea, null).getPropertyValue("font-size");
    console.log(fontSize);
    fontSize = fontSize.substring(0, fontSize.length - 2);
    fontSize = (100 / viewport.width) * fontSize;
    fontSize = (viewport.width / 50);
    menuArea.style.fontSize = fontSize + "px";
}

var currentPage = 0;
var debugMode = 2;
var pointerNum = 0;

const viewport = window.visualViewport;
const menuArea = document.getElementById("menuArea");
const menuSpace = document.getElementById("menuSpace");

const container = document.getElementById("pageContainer");
const homeButton = document.getElementById("logo");
homeButton.addEventListener("click", home);
const updatesButton = document.getElementById("updatesButton");
updatesButton.addEventListener("click", updates);
updatesButton.addEventListener("mouseover", updatesMouseover);
updatesButton.addEventListener("mouseout", updatesMouseout);
const portfolioButton = document.getElementById("portfolioButton");
portfolioButton.addEventListener("click", portfolio);
portfolioButton.addEventListener("mouseover", portfolioMouseover);
portfolioButton.addEventListener("mouseout", portfolioMouseout);
const aboutButton = document.getElementById("aboutButton");
aboutButton.addEventListener("click", about);
aboutButton.addEventListener("mouseover", aboutMouseover);
aboutButton.addEventListener("mouseout", aboutMouseout);

if(debugMode === 1) {
    const detectShiftDown = (event) => {
        if(shift === 0) {
            if(event.code === "ShiftLeft") {
                shift = 1;
                shiftKey = "left";
                console.log("shift key left currently down");
            }
            else if(event.code === "ShiftRight") {
                shift = 1;
                shiftKey  = "right";
                console.log("shift key right currently down");
            }
        }
    };

    const detectShiftUp = (event) => {
        if(event.code === "ShiftLeft" && shiftKey === "left") {
            shift = 0;
            shiftKey = "none";
            console.log("shift key left ended");
        }
        else if(event.code === "ShiftRight" && shiftKey === "right") {
            shift = 0;
            shiftKey = "none";
            console.log("shift key right ended");
        }
    };

    const detectTouchendDebug = () => {
        if(shift === 1) {
            console.log("pinch zoom just ended");
            aboutButton.innerHTML = `${window.innerWidth}`;
            updatesButton.innerHTML = `${document.documentElement.clientWidth}`;
            portfolioButton.innerHTML = "detectPointercancel";
        }
    };
    var shift = 0;
    var shiftKey = "none";
    window.addEventListener("keydown", detectShiftDown);
    window.addEventListener("keyup", detectShiftUp);
    window.addEventListener("touchend", detectTouchendDebug);
}
else if(debugMode === 0) {
    window.addEventListener("pointerdown", detectPointerdown);
    window.addEventListener("pointerup", detectPointerup);
    window.addEventListener("pointercancel", detectPointercancel);
}
else if(debugMode === 2) {
    console.log("debugmode=2");
    viewport.addEventListener("resize", onResize);
}

//window.removeEventListener("touchend", test);
