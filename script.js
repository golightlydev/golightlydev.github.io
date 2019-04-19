const left = () => {
    if(currentElement === 0)
        return;
    if(currentElement === 1)
        container.style.transform = "translateX(0%)";
    else if(currentElement === 2)
        container.style.transform = "translateX(-25%)";
    else if(currentElement === 3)
        container.style.transform = "translateX(-50%)";
    --currentElement;
}

const right = () => {
    if(currentElement === 3)
        return;
    if(currentElement === 0)
        container.style.transform = "translateX(-25%)";
    else if(currentElement === 1)
        container.style.transform = "translateX(-50%)";
    else if(currentElement === 2)
        container.style.transform = "translateX(-75%)";
    ++currentElement;
}

var currentElement = 0;
const container = document.getElementById("pageContainer");
container.style.transition = "transform 1s";
const buttonLeft = document.getElementById("left");
buttonLeft.addEventListener("click", left);
const buttonRight = document.getElementById("right");
buttonRight.addEventListener("click", right);