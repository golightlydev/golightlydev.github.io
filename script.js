const left = () => {
    if(currentElement === 0)
        return;
    if(currentElement === 1)
        container.style.transform = "translateX(0px)";
    else if(currentElement === 2)
        container.style.transform = "translateX(-1000px)";
    --currentElement;
}

const right = () => {
    if(currentElement === 2)
        return;
    if(currentElement === 0)
        container.style.transform = "translateX(-1000px)";
    else if(currentElement === 1)
        container.style.transform = "translateX(-2000px)";
    ++currentElement;
}

var currentElement = 0;
const container = document.getElementById("container");
container.style.transition = "transform 1s";
const buttonLeft = document.getElementById("left");
buttonLeft.addEventListener("click", left);
const buttonRight = document.getElementById("right");
buttonRight.addEventListener("click", right);