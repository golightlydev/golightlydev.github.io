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
    constructor(verticesNum) {
        this.positions = new Array(verticesNum * 2);
        this.colours = new ShapeColour(verticesNum);
        this.colours.setVertexColour(0, 1.0, 1.0, 1.0, 1.0);
        this.colours.setVertexColour(1, 1.0, 0.0, 0.0, 1.0);
        this.colours.setVertexColour(2, 0.0, 1.0, 0.0, 1.0);
        this.colours.setVertexColour(3, 0.0, 0.0, 1.0, 1.0);
        this.positionBuffer = null;
        this.colourBuffer = null;
        this.projectionMatrix = null;
        this.modelViewMatrix = null;
        this.rotation = 0.0;
        this.vertexCount = verticesNum;
    }

    setPosition(vertexIndex, x, y) {
        this.positions[vertexIndex * 2] = x;
        this.positions[(vertexIndex * 2) + 1] = y;
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
        let verticesNum = 4;
        for(let a = 0; a < this.actorNum; ++a) {
            if(a == 0) {
                //set verticesNum to something new here if necessary
                this.actor[a] = new Actor(verticesNum);
                this.actor[a].setPosition(0, -(this.gl.canvas.clientWidth / 2) + 100, 100);
                this.actor[a].setPosition(1, -(this.gl.canvas.clientWidth / 2) + 300, 100);
                this.actor[a].setPosition(2, -(this.gl.canvas.clientWidth / 2) + 100, -100);
                this.actor[a].setPosition(3, -(this.gl.canvas.clientWidth / 2) + 300, -100);
            }
            else if(a == 1) {
                //set verticesNum to something new here if necessary
                this.actor[a] = new Actor(verticesNum);
                this.actor[a].setPosition(0, (this.gl.canvas.clientWidth / 2) - 300, 100);
                this.actor[a].setPosition(1, (this.gl.canvas.clientWidth / 2) - 100, 100);
                this.actor[a].setPosition(2, (this.gl.canvas.clientWidth / 2) - 300, -100);
                this.actor[a].setPosition(3, (this.gl.canvas.clientWidth / 2) - 100, -100);
            }
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

    setPosition(actorIndex, vertexIndex, x, y) {
        this.actor[actorIndex].setPosition(vertexIndex, x, y);
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
        this.gl.vertexAttribPointer(this.vertexAttribPositionLocation, 2, this.gl.FLOAT, true, 0, 0);
        this.gl.enableVertexAttribArray(this.vertexAttribPositionLocation);
    }

    setupVertexAttribColour(actorIndex) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.actor[actorIndex].colourBuffer);
        this.gl.vertexAttribPointer(this.vertexAttribColourLocation, 4, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.vertexAttribColourLocation);
    }

    setProjectionMatrix(actorIndex) {
        this.actor[actorIndex].projectionMatrix = glMatrix.mat4.create();
        glMatrix.mat4.ortho(this.actor[actorIndex].projectionMatrix, -(this.gl.canvas.clientWidth / 2), this.gl.canvas.clientWidth / 2, -(this.gl.canvas.clientHeight / 2), this.gl.canvas.clientHeight / 2, 0.0, 100.0);
    }

    setModelViewMatrix(actorIndex) {
        this.actor[actorIndex].modelViewMatrix = glMatrix.mat4.create();
        glMatrix.mat4.translate(this.actor[actorIndex].modelViewMatrix, this.actor[actorIndex].modelViewMatrix, [-(this.gl.canvas.clientWidth / 2) + 100 + 100, 0, 0.0]);
        if(this.actor[actorIndex].rotation != 0.0) {
            glMatrix.mat4.rotateZ(this.actor[actorIndex].modelViewMatrix, this.actor[actorIndex].modelViewMatrix, this.actor[actorIndex].rotation);
            //glMatrix.mat4.rotate(this.actor[actorIndex].modelViewMatrix, this.actor[actorIndex].modelViewMatrix, this.actor[actorIndex].rotation, [0, 0, 1]);
        }
        glMatrix.mat4.translate(this.actor[actorIndex].modelViewMatrix, this.actor[actorIndex].modelViewMatrix, [(this.gl. canvas.clientWidth / 2) - (100 + 100), 0, 0.0]);
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
            console.log(this.actor[a].rotation);
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
