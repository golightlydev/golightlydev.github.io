const alignElement = (elementNum, direction) => {
    if(element[elementNum].classList.contains("alignLeft")) {
        if(direction === "left")
            return;
        element[elementNum].classList.remove("alignLeft");
        element[elementNum].classList.add("alignRight");
    }
    else {
        if(direction === "right")
            return;
        element[elementNum].classList.remove("alignRight");
        element[elementNum].classList.add("alignLeft");
    }
};

const left = () => {
    if(currentElement === 0)
        return;
    element[currentElement].classList.remove("revealed");
    element[currentElement - 1].classList.remove("hidden");
    alignElement(currentElement, "right");
    element[currentElement].classList.add("hidden");
    alignElement(currentElement - 1, "left");
    element[currentElement - 1].classList.add("revealed");
    --currentElement;
};

const right = () => {
    if(currentElement === 2)
        return;
    element[currentElement].classList.remove("revealed");
    element[currentElement + 1].classList.remove("hidden");
    alignElement(currentElement, "left");
    element[currentElement].classList.add("hidden");
    alignElement(currentElement + 1, "right");
    element[currentElement + 1].classList.add("revealed");
    ++currentElement;
};

var currentElement = 0;
var element = [];
element.push(document.getElementById("one"));
element.push(document.getElementById("two"));
element.push(document.getElementById("three"));
const buttonLeft = document.getElementById("left");
buttonLeft.addEventListener("click", left);
const buttonRight = document.getElementById("right");
buttonRight.addEventListener("click", right);