let type = "WebGL";
if(!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
    console.log("testing");
}
PIXI.utils.sayHello(type);