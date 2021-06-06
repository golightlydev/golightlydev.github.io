const revertColor = (exclude) => {
    switch(exclude) {
        case "home":
            updatesButton.style.color = "white";
            softwareButton.style.color = "white";
            documentationButton.style.color = "white";
            aboutButton.style.color = "white";
            break;
        case "updates":
            softwareButton.style.color = "white";
            documentationButton.style.color = "white";
            aboutButton.style.color = "white";
            break;
        case "software":
            updatesButton.style.color = "white";
            documentationButton.style.color = "white";
            aboutButton.style.color = "white";
            break;
        case "documentation":
            updatesButton.style.color = "white";
            softwareButton.style.color = "white";
            aboutButton.style.color = "white";
            break;
        case "about":
            updatesButton.style.color = "white";
            softwareButton.style.color = "white";
            documentationButton.style.color = "white";
            break;
    }
}

const home = () => {
    container.style.transform = "translateX(0%)";
    currentPage = 0;
    revertColor("home");
}

const updates = () => {
    container.style.transform = "translateX(-20%)";
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

const software = () => {
    container.style.transform = "translateX(-40%)";
    currentPage = 2;
    revertColor("software");
}

const softwareMouseover = () => {
    softwareButton.style.color = "#8b99af";
}

const softwareMouseout = () => {
    if(currentPage != 2)
        softwareButton.style.color = "white";
}

const documentation = () => {
    container.style.transform = "translateX(-60%)";
    currentPage = 3;
    revertColor("documentation");
}

const documentationMouseover = () => {
    documentationButton.style.color = "#8b99af";
}

const documentationMouseout = () => {
    if(currentPage != 3)
        documentationButton.style.color = "white";
}

const about = () => {
    container.style.transform = "translateX(-80%)";
    currentPage = 4;
    revertColor("about");
}

const aboutMouseover = () => {
    aboutButton.style.color = "#8b99af";
}

const aboutMouseout = () => {
    if(currentPage != 4)
        aboutButton.style.color = "white";
}

const hamburgerMenu = () => {
    if(hamburgerMenuIsOpen) {
        document.getElementById("mobileMenu").style.visibility = "hidden";
        document.getElementById("hamburgerMenuImage").src = "img/hamburgerToOpen.png";
        hamburgerMenuIsOpen = false;
    }
    else {
        document.getElementById("mobileMenu").style.visibility = "visible";
        document.getElementById("hamburgerMenuImage").src = "img/hamburgerToClose.png";
        hamburgerMenuIsOpen = true;
    }
}

const mobileUpdates = () => {
    updates();
    hamburgerMenu();
}

const mobileSoftware = () => {
    software();
    hamburgerMenu();
}

const mobileDocumentation = () => {
    documentation();
    hamburgerMenu();
}

const mobileAbout = () => {
    about();
    hamburgerMenu();
}

const displayMenu = () => {
    if(menuIsDisplayed) {
        displayMenuButton.setAttribute("src", "./img/displayMenu.svg");
        menuArea.style.display = "none";
        container.style.height = "100vh";
        updatesPage.style.marginTop = "0vh";
        menuIsDisplayed = false;
    }
    else {
        displayMenuButton.setAttribute("src", "./img/hideMenu.svg");
        menuArea.style.display = "flex";
        container.style.height = "92vh";
        updatesPage.style.marginTop = "10vh";
        menuIsDisplayed = true;
    }
}

var currentPage = 0;

var hamburgerMenuIsOpen = false;

var mobileLogoIsShown = false;

var menuIsDisplayed = true;

const container = document.getElementById("pageContainer");
const updatesPage = document.getElementById("updates");
const menuArea = document.getElementById("menuArea");
const displayMenuButton = document.getElementById("displayMenuToggleImage");
displayMenuButton.addEventListener("click", displayMenu);
const homeButton = document.getElementById("logo");
homeButton.addEventListener("click", home);
const updatesButton = document.getElementById("updatesButton");
updatesButton.addEventListener("click", updates);
updatesButton.addEventListener("mouseover", updatesMouseover);
updatesButton.addEventListener("mouseout", updatesMouseout);
const softwareButton = document.getElementById("softwareButton");
softwareButton.addEventListener("click", software);
softwareButton.addEventListener("mouseover", softwareMouseover);
softwareButton.addEventListener("mouseout", softwareMouseout);
const documentationButton = document.getElementById("documentationButton");
documentationButton.addEventListener("click", documentation);
documentationButton.addEventListener("mouseover", documentationMouseover);
documentationButton.addEventListener("mouseout", documentationMouseout);
const aboutButton = document.getElementById("aboutButton");
aboutButton.addEventListener("click", about);
aboutButton.addEventListener("mouseover", aboutMouseover);
aboutButton.addEventListener("mouseout", aboutMouseout);
const hamburgerMenuButton = document.getElementById("hamburgerMenuButton");
hamburgerMenuButton.addEventListener("click", hamburgerMenu);
const mobileMenuUpdatesButton = document.getElementById("mobileMenuUpdatesButton");
mobileMenuUpdatesButton.addEventListener("click", mobileUpdates);
const mobileMenuSoftwareButton = document.getElementById("mobileMenuSoftwareButton");
mobileMenuSoftwareButton.addEventListener("click", mobileSoftware);
const mobileMenuDocumentationButton = document.getElementById("mobileMenuDocumentationButton");
mobileMenuDocumentationButton.addEventListener("click", mobileDocumentation);
const mobileMenuAboutButton = document.getElementById("mobileMenuAboutButton");
mobileMenuAboutButton.addEventListener("click", mobileAbout);

if (window.innerWidth <= 850 && mobileLogoIsShown == false) {
    homeButton.setAttribute("src", "./img/logoMobile.svg");
    mobileLogoIsShown = true;
} 

document.getElementById('software').style.marginBottom =
    String((document.getElementById('home').offsetHeight /10)) + "px";
document.getElementById('web').style.marginBottom =
    String((document.getElementById('home').offsetHeight /10)) + "px";

document.getElementById('homeWrapper').style.marginTop = 
    String((document.getElementById('home').offsetHeight / 2) - (document.getElementById('homeWrapper').offsetHeight / 2)) + "px";

document.getElementById('aboutWrapper').style.marginTop = 
    String((document.getElementById('about').offsetHeight / 2) - (document.getElementById('aboutWrapper').offsetHeight / 2)) + "px";


/*if(document.getElementById("updatesWrapper").offsetHeight < document.getElementById('home').offsetHeight) {
    document.getElementById("updatesWrapper").style.touchAction = "pinch-zoom";
    document.getElementById("updates").style.touchAction = "pinch-zoom";
}*/

window.addEventListener('resize', function(event) {
    document.getElementById('software').style.marginBottom =
    String((document.getElementById('home').offsetHeight /10)) + "px";
    document.getElementById('web').style.marginBottom =
    String((document.getElementById('home').offsetHeight /10)) + "px";
    document.getElementById('homeWrapper').style.marginTop = 
    String((document.getElementById('home').offsetHeight / 2) - (document.getElementById('homeWrapper').offsetHeight / 2)) + "px";
    document.getElementById('aboutWrapper').style.marginTop = 
    String((document.getElementById('about').offsetHeight / 2) - (document.getElementById('aboutWrapper').offsetHeight / 2)) + "px";
    if(!(window.matchMedia("(max-width: 850px)").matches)) {
        if(hamburgerMenuIsOpen) {
            hamburgerMenu();
        }
    }
    if (window.innerWidth <= 850 && mobileLogoIsShown == false) {
            console.log("logo replace function fires");
            homeButton.setAttribute("src", "./img/logoMobile.svg");
            mobileLogoIsShown = true;
    }
    else if(window.innerWidth > 850 && mobileLogoIsShown == true) {
        document.getElementById("logo").setAttribute("src", "./img/logo.svg");
        mobileLogoIsShown = false;
    }
});



//hammer testing
/*var updatesZoom = new Hammer(document.getElementById("updates"));
updatesZoom.get('pinch').set({enable: true});
updatesZoom.on("pinch", function(ev) {
    console.log("test worked?");
});

var updatesWZoom = new Hammer(document.getElementById("updatesWrapper"));
updatesWZoom.get('pinch').set({enable: true});
updatesWZoom.on("pinch", function(ev) {
    console.log("test worked?");
});*/