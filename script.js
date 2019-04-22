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

var currentPage = 0;
/*window.addEventListener("scroll", onScroll);*/
window.onscroll = function(ev) {
    aboutButton.innerHTML="test";
}; //fix this next, for mobile.  and get rid of menu altogether on mobile
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