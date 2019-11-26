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
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);