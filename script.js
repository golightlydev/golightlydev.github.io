const home = () => {
    container.style.transform = "translateX(0%)";
}

const updates = () => {
    container.style.transform = "translateX(-25%)";
}

const portfolio = () => {
    container.style.transform = "translateX(-50%)";
}

const about = () => {
    container.style.transform = "translateX(-75%)";
}

var currentElement = 0;
const container = document.getElementById("pageContainer");
container.style.transition = "transform 1s";
const homeButton = document.getElementById("homeButton");
homeButton.addEventListener("click", home);
const updatesButton = document.getElementById("updatesButton");
updatesButton.addEventListener("click", updates);
const portfolioButton = document.getElementById("portfolioButton");
portfolioButton.addEventListener("click", portfolio);
const aboutButton = document.getElementById("aboutButton");
aboutButton.addEventListener("click", about);