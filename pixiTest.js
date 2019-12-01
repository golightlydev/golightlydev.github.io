document.getElementById("body").style.margin = "0px";
document.getElementById("body").style.padding = "0px";

let app = new PIXI.Application({
    width: 256,
    height: 256,
    antialias: true,
    transparent: false,
    resolution: 1,
});

app.renderer.backgroundColor = 0x061639;

/*
If you want to make the canvas fill the entire window, you can apply this CSS styling and resize the renderer to the size of the browser window.

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

But, if you do that, make sure you also set the default padding and margins to 0 on all your HTML elements with this bit of CSS code:

<style>* {padding: 0; margin: 0}</style>
*/

document.body.appendChild(app.view);

/*app.renderer.view.style.border = '1px dashed black';

app.renderer.autoResize = true;

app.renderer.resize(512, 512);*/

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoDensity = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

window.addEventListener('resize', function(event) {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});

PIXI.Loader.shared.add('pixiAssets/img/tileset.png').load(setup);

function setup() {
  let texture = new Array(
    PIXI.utils.TextureCache["pixiAssets/img/tileset.png"],
    PIXI.utils.TextureCache["pixiAssets/img/tileset.png"],
    PIXI.utils.TextureCache["pixiAssets/img/tileset.png"]
  );
  let sprite = new Array(null, null, null);
  let rectangle = new Array(null, null, null);
  rectangle[0] = new PIXI.Rectangle(0, 0, 200, 150);
  texture[0].frame = rectangle[0];
  sprite[0] = new PIXI.Sprite(texture[0]);
  //sprite[0] = new PIXI.Sprite(PIXI.Loader.shared.resources["pixiAssets/img/Untitled.png"].texture);
  sprite[0].x = 96;
  sprite[0].y = 96;
  //sprite.width = 80;
  //sprite.height = 120;
  /*
  sprite.scale.x = 0.5;
  sprite.scale.y = 0.5;
  */
  sprite[0].anchor.x = 0.5;
  sprite[0].anchor.y = 0.5;
  sprite[0].rotation = 0.5;
  app.stage.addChild(sprite[0]);
  rectangle[1] = new PIXI.Rectangle(200, 0, 150, 200);
  texture[1].frame = rectangle[1];
  sprite[1] = new PIXI.Sprite(texture[1]);
  sprite[1].x = 500;
  sprite[1].y = 0;
  app.stage.addChild(sprite[1]);
  rectangle[2] = new PIXI.Rectangle(200, 200, 200, 250);
  texture[2].frame = rectangle[2];
  sprite[2] = new PIXI.Sprite(texture[2]);
  sprite[2].x = 0;
  sprite[2].y = 500;
  app.stage.addChild(sprite[2]);
  app.renderer.render(app.stage);
}

/*Better yet, just list all the files you want to load in an array inside a single add method, like this:

PIXI.loader
  .add([
    "images/imageOne.png",
    "images/imageTwo.png",
    "images/imageThree.png"
  ])
  .load(setup);

  */

/*
let texture = PIXI.utils.TextureCache["pixiAsset/img/Untitled.png"];
let sprite = new PIXI.Sprite(texture);
*/

/*
If you ever need to remove a sprite from the stage, use the removeChild method:

app.stage.removeChild(anySprite)
But usually setting a sprite’s visible property to false will be a simpler and more efficient way of making sprites disappear.

anySprite.visible = false;

*/

/*Monitoring load progress
Pixi's loader has a special progress event that will call a customizable function that will run each time a file loads. progress events are called by the loader's on method, like this:

PIXI.loader.on("progress", loadProgressHandler);
Here's how to include the on method in the loading chain, and call a user-definable function called loadProgressHandler each time a file loads.

PIXI.loader
  .add([
    "images/one.png",
    "images/two.png",
    "images/three.png"
  ])
  .on("progress", loadProgressHandler)
  .load(setup);

function loadProgressHandler() {
  console.log("loading"); 
}

function setup() {
  console.log("setup");
}
Each time one of the files loads, the progress event calls loadProgressHandler to display "loading" in the console. When all three files have loaded, the setup function will run. 

That's neat, but it gets better. You can also find out exactly which file has loaded and what percentage of overall files are have currently loaded. You can do this by adding optional loader and resource parameters to the loadProgressHandler, like this:

function loadProgressHandler(loader, resource) { name here }
You can then use resource.url to find the file that's currently loaded. (Use resource.name if you want to find the optional name that you might have assigned to the file, as the first argument in the add method.) And you can use loader.progress to find what percentage of total resources have currently loaded. Here's some code that does just that.

PIXI.loader
  .add([
    "images/one.png",
    "images/two.png",
    "images/three.png"
  ])
  .on("progress", loadProgressHandler)
  .load(setup);

function loadProgressHandler(loader, resource) {

  //Display the file `url` currently being loaded
  console.log("loading: " + resource.url); 

  //Display the percentage of files currently loaded
  console.log("progress: " + loader.progress + "%"); 

  //If you gave your files names as the first argument 
  //of the `add` method, you can access them like this
  //console.log("loading: " + resource.name);
}

function setup() {
  console.log("All files loaded");
}
*/

