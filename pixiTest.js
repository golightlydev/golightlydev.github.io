let type = "WebGL";
if(!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
    console.log("testing");
}
else {
    console.log("is not supported?");
}
PIXI.utils.sayHello(type);