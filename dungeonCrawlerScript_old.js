function setupShaders() {
    let vertexShaderSource = `
        attribute vec4 aVertexPosition;
        attribute vec4 aVertexColour;

        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;

        varying lowp vec4 vColour;

        void main() {
            gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
            vColour = aVertexColour;
        }
    `
    let fragmentShaderSource = `
        varying lowp vec4 vColour;
        void main() {
            gl_FragColor = vColour;
        }
    `
    let vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    vertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
    vertexColour = gl.getAttribLocation(shaderProgram, 'aVertexColour');
    projectionMatrix = gl.getUniformLocation(shaderProgram, 'uProjectionMatrix');
    modelViewMatrix = gl.getUniformLocation(shaderProgram, 'uModelViewMatrix');
}

function setupBuffers() {
    positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    let positions = [
        -1.0, 1.0,
        1.0, 1.0,
        -1.0, -1.0,
        1.0, -1.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    let colours = [
        1.0, 1.0, 1.0, 1.0, //white
        1.0, 0.0, 0.0, 1.0, //red
        0.0, 1.0, 0.0, 1.0, //green
        0.0, 0.0, 1.0, 1.0 //blue
    ];
    colourBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colourBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colours), gl.STATIC_DRAW);
}

function render(deltaTime) {
    gl.clearDepth(1.0);
    if(firstRender) {
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
    }
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    let fieldOfView = 45 * Math.PI / 180;
    let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    let zNear = 0.1;
    let zFar = 100.0;
    let currentProjectionMatrix = glMatrix.mat4.create();
    glMatrix.mat4.perspective(currentProjectionMatrix, fieldOfView, aspect, zNear, zFar);
    let currentModelViewMatrix = glMatrix.mat4.create();
    glMatrix.mat4.translate(currentModelViewMatrix, currentModelViewMatrix, [-0.0, 0.0, -6.0]);

    glMatrix.mat4.rotate(currentModelViewMatrix,
        currentModelViewMatrix,
        squareRotation,
        [0, 0, 1]
    );
    let offset = 0;
    if(firstRender) {
        let numComponents = 2;
        let type = gl.FLOAT;
        let normalise = false;
        let stride = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(
            vertexPosition,
            numComponents,
            type,
            normalise,
            stride,
            offset
        );
        gl.enableVertexAttribArray(vertexPosition);
        numComponents = 4;
        gl.bindBuffer(gl.ARRAY_BUFFER, colourBuffer);
        gl.vertexAttribPointer(
            vertexColour,
            numComponents,
            type,
            normalise,
            stride,
            offset
        );
        gl.enableVertexAttribArray(vertexColour);
        gl.useProgram(shaderProgram);
        firstRender = false;
    }
    gl.uniformMatrix4fv(
        projectionMatrix,
        false,
        currentProjectionMatrix
    );
    gl.uniformMatrix4fv(
        modelViewMatrix,
        false,
        currentModelViewMatrix
    );
    let vertexCount = 4;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
    squareRotation += deltaTime;
}

function main() {
    canvas = document.getElementById("canvas");
    gl = canvas.getContext("webgl");
    if(gl === null) {
        console.log("webgl not initialised");
        return;
    }
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    setupShaders();
    setupBuffers();
    //render();
    var then = 0;

    function renderFunction(now) {
        now *= 0.001;
        let deltaTime = now - then;
        then = now;
        render(deltaTime);
        requestAnimationFrame(renderFunction);
    }
    requestAnimationFrame(renderFunction);
}

var canvas = null;
var gl = null;
var shaderProgram = null;
var vertexPosition = null;
var vertexColour = null;
var projectionMatrix = null;
var modelViewMatrix = null;
var positionBuffer = null;
var colourBuffer = null;
var squareRotation = 0.0;
window.onload = main;
var firstRender = true;
