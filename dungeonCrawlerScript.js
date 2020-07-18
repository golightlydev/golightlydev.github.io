class ShapeColour {
    constructor(numVertices) {
        this.numVertices = numVertices;
        this.colour = new Array(numVertices * 4);
        for(let a = 0; a < numVertices * 4; ++a) {
            this.colour[a] = 1.0;
        }
    }
    setVertexColour(vertexIndex, r, g, b, a) {
        let start = vertexIndex * 4;
        this.colour[start] = r;
        this.colour[start + 1] = g;
        this.colour[start + 2] = b;
        this.colour[start + 3] = a;
    }
};

class Actor {
    constructor() {
        this.positions = [
            -1.0, 1.0,
            1.0, 1.0,
            -1.0, -1.0,
            1.0, -1.0
        ];
        this.colours = [
            1.0, 1.0, 1.0, 1.0, //white
            1.0, 0.0, 0.0, 1.0, //red
            0.0, 1.0, 0.0, 1.0, //green
            0.0, 0.0, 1.0, 1.0 //blue
        ];
        this.colours = new ShapeColour(4);
        this.colours.setVertexColour(0, 1.0, 1.0, 1.0, 1.0);
        this.colours.setVertexColour(1, 1.0, 0.0, 0.0, 1.0);
        this.colours.setVertexColour(2, 0.0, 1.0, 0.0, 1.0);
        this.colours.setVertexColour(3, 0.0, 0.0, 1.0, 1.0);
        this.positionBuffer = null;
        this.colourBuffer = null;
        this.projectionMatrix = null;
        this.modelViewMatrix = null;
        this.rotation = 0.0;
        this.vertexCount = 4;
    }
    setVertexColour(vertexIndex, r, g, b, a) {
        this.colours.setVertexColour(vertexIndex, r, g, b, a);
    } 
};

class Program {
    constructor(actorNum) {
        this.canvas = document.getElementById("canvas");
        this.gl = canvas.getContext("webgl");
        this.setupCheck = true;
        if(this.gl === null) {
            this.setupCheck = false;
            return;
        }
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.shaderProgram = null;
        this.vertexAttribPositionLocation = null;
        this.vertexAttribColourLocation = null;
        this.projectionMatrixUniformLocation = null;
        this.modelViewMatrixUniformLocation = null;
        this.actorNum = actorNum;
        this.actor = new Array(this.actorNum);
    }
    setupActors() {
        for(let a = 0; a < this.actorNum; ++a) {
            this.actor[a] = new Actor;
        }
    }
    setupShaderProgram() {
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
        let vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertexShader, vertexShaderSource);
        this.gl.compileShader(vertexShader);
        let fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragmentShader, fragmentShaderSource);
        this.gl.compileShader(fragmentShader);
        this.shaderProgram = this.gl.createProgram();
        this.gl.attachShader(this.shaderProgram, vertexShader);
        this.gl.attachShader(this.shaderProgram, fragmentShader);
        this.gl.linkProgram(this.shaderProgram);
        this.vertexAttribPositionLocation = this.gl.getAttribLocation(this.shaderProgram, 'aVertexPosition');
        this.vertexAttribColourLocation = this.gl.getAttribLocation(this.shaderProgram, 'aVertexColour');
        this.projectionMatrixUniformLocation = this.gl.getUniformLocation(this.shaderProgram, 'uProjectionMatrix');
        this.modelViewMatrixUniformLocation = this.gl.getUniformLocation(this.shaderProgram, 'uModelViewMatrix');
    }

    setupPositionBuffer(actorIndex) {
        this.actor[actorIndex].positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.actor[actorIndex].positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.actor[actorIndex].positions), this.gl.STATIC_DRAW);
    }

    setupColourBuffer(actorIndex) {
        this.actor[actorIndex].colourBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.actor[actorIndex].colourBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.actor[actorIndex].colours.colour), this.gl.STATIC_DRAW);
    }

    setVertexColour(actorIndex, vertexIndex, r, g, b, a) {
        this.actor[actorIndex].setVertexColour(vertexIndex, r, g, b, a);
    }

    setupRender() {
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
        for(let a = 0; a < this.actorNum; ++a) {
            this.setupVertexAttribPosition(a);
            this.setupVertexAttribColour(a);
        }
        this.gl.useProgram(this.shaderProgram);
    }

    setupVertexAttribPosition(actorIndex) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.actor[actorIndex].positionBuffer);
        this.gl.vertexAttribPointer(this.vertexAttribPositionLocation, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.vertexAttribPositionLocation);
    }

    setupVertexAttribColour(actorIndex) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.actor[actorIndex].colourBuffer);
        this.gl.vertexAttribPointer(this.vertexAttribColourLocation, 4, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.vertexAttribColourLocation);
    }

    setProjectionMatrix(actorIndex) {
        this.actor[actorIndex].projectionMatrix = glMatrix.mat4.create();
        glMatrix.mat4.perspective(this.actor[actorIndex].projectionMatrix, (45 * Math.PI / 180), (this.gl.canvas.clientWidth / this.gl.canvas.clientHeight), 0.1, 100.0);
    }

    setModelViewMatrix(actorIndex) {
        this.actor[actorIndex].modelViewMatrix = glMatrix.mat4.create();
        glMatrix.mat4.translate(this.actor[actorIndex].modelViewMatrix, this.actor[actorIndex].modelViewMatrix, [-0.0, 0.0, -6.0]);
        if(this.actor[actorIndex].rotation != 0.0) {
            glMatrix.mat4.rotate(this.actor[actorIndex].modelViewMatrix, this.actor[actorIndex].modelViewMatrix, this.actor[actorIndex].rotation, [0, 0, 1]);
        }
    }

    render(deltaTime) {
        this.gl.clearDepth(1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        for(let a = 0; a < this.actorNum; ++a) {
            this.setProjectionMatrix(a);
            this.setModelViewMatrix(a);
            this.gl.uniformMatrix4fv(
                this.projectionMatrixUniformLocation,
                false,
                this.actor[a].projectionMatrix
            );
            this.gl.uniformMatrix4fv(
                this.modelViewMatrixUniformLocation,
                false,
                this.actor[a].modelViewMatrix
            );
            this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, this.actor[a].vertexCount);
            this.actor[a].rotation += deltaTime;
        }
    }
};

function main() {
    var program = new Program(1);
    program.setupActors();
    program.setupShaderProgram();
    for(let a = 0; a < program.actorNum; ++a) {
        program.setupPositionBuffer(a);
        program.setupColourBuffer(a);
    }
    program.setupRender();
    var then = 0;
    function renderFunction(now) {
        now *= 0.001;
        let deltaTime = now - then;
        then = now;
        program.render(deltaTime);
        requestAnimationFrame(renderFunction);
    }
    requestAnimationFrame(renderFunction);
}

window.onload = main;
