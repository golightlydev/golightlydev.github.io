function isPowerOf2(value) {
    return (value & (value - 1)) == 0;
  }

class Camera {
    constructor(width, height, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.originX = this.x + (this.width / 2);
        this.originY = this.y + (this.height / 2);
    }

    resetSize(width, height) { //in case of display change
        this.width = width;
        this.height = height;
        this.originX = this.x + (this.width / 2);
        this.originY = this.y + (this.height / 2);
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.originX = this.x + (this.width / 2);
        this.originY = this.y + (this.height / 2);
    }

    debugGetPositions() {
        console.log("camera originX: " + this.originX);
        console.log("camera originY: " + this.originY);
        console.log("camera width: " + this.width);
        console.log("camera height: " + this.height);
    }
};

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
    constructor(verticesNum, width, height, x, y, spriteNum, textureIndex) {
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
        this.verticesNum = verticesNum;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.spriteNum = spriteNum;
        this.textureIndex = new Array(spriteNum);
        for(let a = 0; a < spriteNum; ++a) {
            this.textureIndex[a] = textureIndex[a];
        }
    }

    setCameraPosition(vertexIndex, cameraX, cameraY) {
        this.positions[vertexIndex * 2] = cameraX;
        this.positions[(vertexIndex * 2) + 1] = cameraY;
    }

    setWorldPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    setVertexColour(vertexIndex, r, g, b, a) {
        this.colours.setVertexColour(vertexIndex, r, g, b, a);
    }

    debugGetPositions() {
        console.log("x: " + this.x);
        console.log("y: " + this.y);
        for(let a = 0; a < (this.verticesNum * 2); a+=2) {
            console.log("vertex #" + a + ": x: " + this.positions[a]);
            console.log("vertex #" + a + ": y: " + this.positions[a+1]);
        }
    }
};

class Program {
    constructor(actorNum, maxTextureNum) {
        this.canvas = document.getElementById("canvas");
        this.glContainer = {
            gl: canvas.getContext("webgl")
        }
        this.setupCheck = true;
        if(this.glContainer.gl === null) {
            this.setupCheck = false;
            return;
        }
        this.glContainer.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.shaderProgram = null;
        this.vertexAttribPositionLocation = null;
        this.vertexAttribColourLocation = null;
        this.projectionMatrixUniformLocation = null;
        this.modelViewMatrixUniformLocation = null;
        this.actorNum = actorNum;
        this.actor = new Array(this.actorNum);
        this.camera = new Camera(this.glContainer.gl.canvas.clientWidth, this.glContainer.gl.canvas.clientHeight, 0, 0);
        this.maxTextureNum = maxTextureNum;
        this.textureIsLoaded = new Array(maxTextureNum);
        //0 = not in use, 1 = loading, 2 = loaded
        this.texture = new Array(maxTextureNum);
        for(let a = 0; a < maxTextureNum; ++a) {
            textureIsLoading[a] = 0;
            texture[a] = null;
        }
    }

    setupActors() {
        let verticesNum = null;
        let width = null;
        let height = null;
        let x = null;
        let y = null;
        for(let a = 0; a < this.actorNum; ++a) {
            if(a == 0) {
                verticesNum = 4;
                width = 200;
                height = 200;
                x = 100;
                y = (this.glContainer.gl.canvas.clientHeight / 2) - 100;
            }
            else if(a == 1) {
                verticesNum = 4;
                width = 300;
                height = 300;
                x = this.glContainer.gl.canvas.clientWidth - 100 - width;
                y = (this.glContainer.gl.canvas.clientHeight / 2) - (height / 2);
            }
            this.actor[a] = new Actor(verticesNum, width, height, x, y);
            //this.camera.debugGetPositions();
            this.actor[a].setCameraPosition(0, -(this.camera.originX - this.actor[a].x), this.camera.originY - this.actor[a].y);
            this.actor[a].setCameraPosition(1, -(this.camera.originX - (this.actor[a].x + this.actor[a].width)), this.camera.originY - this.actor[a].y);
            this.actor[a].setCameraPosition(2, -(this.camera.originX - this.actor[a].x), (this.camera.originY - (this.actor[a].y + this.actor[a].height)));
            this.actor[a].setCameraPosition(3, -(this.camera.originX - (this.actor[a].x + this.actor[a].width)), (this.camera.originY - (this.actor[a].y + this.actor[a].height)));
        }
        //this.actor[0].debugGetPositions();
        //setup stuff related to textures here
    }

    setupTexture(textureIndex, url) {
        this.textureIsLoaded[textureIndex] = 1;
        let tempImage = new Image();
        tempImage.onload = (function(glContainer, texture, textureIndex, textureIsLoaded) {
            return function() {
                texture[textureIndex] = glContainer.gl.createTexture();
                glContainer.gl.bindTexture(glContainer.gl.TEXTURE_2D, texture[textureIndex]);
                glContainer.gl.texImage2D(glContainer.gl.TEXTURE_2D, 0, glContainer.gl.RGBA, glContainer.gl.RGBA, glContainer.gl.UNSIGNED_BYTE, this);
                if(isPowerOf2(this.width) && isPowerOf2(this.height)) {
                    glContainer.gl.generateMipmap(glContainer.gl.TEXTURE_2D);
                }
                else {
                    glContainer.gl.texParameteri(glContainer.gl.TEXTURE_2D, glContainer.gl.TEXTURE_WRAP_S, glContainer.gl.CLAMP_TO_EDGE);
                    glContainer.gl.texParameteri(glContainer.gl.TEXTURE_2D, glContainer.gl.TEXTURE_WRAP_T, glContainer.gl.CLAMP_TO_EDGE);
                    glContainer.gl.texParameteri(glContainer.gl.TEXTURE_2D, glContainer.gl.TEXTURE_MIN_FILTER, glContainer.gl.LINEAR);
                }
                textureIsLoaded[textureIndex] = 2;
            };
        })(this.glContainer, this.texture, textureIndex, this.textureIsLoaded);
        tempImage.src = url;
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
        let vertexShader = this.glContainer.gl.createShader(this.glContainer.gl.VERTEX_SHADER);
        this.glContainer.gl.shaderSource(vertexShader, vertexShaderSource);
        this.glContainer.gl.compileShader(vertexShader);
        let fragmentShader = this.glContainer.gl.createShader(this.glContainer.gl.FRAGMENT_SHADER);
        this.glContainer.gl.shaderSource(fragmentShader, fragmentShaderSource);
        this.glContainer.gl.compileShader(fragmentShader);
        this.shaderProgram = this.glContainer.gl.createProgram();
        this.glContainer.gl.attachShader(this.shaderProgram, vertexShader);
        this.glContainer.gl.attachShader(this.shaderProgram, fragmentShader);
        this.glContainer.gl.linkProgram(this.shaderProgram);
        this.vertexAttribPositionLocation = this.glContainer.gl.getAttribLocation(this.shaderProgram, 'aVertexPosition');
        this.vertexAttribColourLocation = this.glContainer.gl.getAttribLocation(this.shaderProgram, 'aVertexColour');
        this.projectionMatrixUniformLocation = this.glContainer.gl.getUniformLocation(this.shaderProgram, 'uProjectionMatrix');
        this.modelViewMatrixUniformLocation = this.glContainer.gl.getUniformLocation(this.shaderProgram, 'uModelViewMatrix');
    }

    setupPositionBuffer(actorIndex) {
        this.actor[actorIndex].positionBuffer = this.glContainer.gl.createBuffer();
        this.glContainer.gl.bindBuffer(this.glContainer.gl.ARRAY_BUFFER, this.actor[actorIndex].positionBuffer);
        this.glContainer.gl.bufferData(this.glContainer.gl.ARRAY_BUFFER, new Float32Array(this.actor[actorIndex].positions), this.glContainer.gl.STATIC_DRAW);
    }

    setupColourBuffer(actorIndex) {
        this.actor[actorIndex].colourBuffer = this.glContainer.gl.createBuffer();
        this.glContainer.gl.bindBuffer(this.glContainer.gl.ARRAY_BUFFER, this.actor[actorIndex].colourBuffer);
        this.glContainer.gl.bufferData(this.glContainer.gl.ARRAY_BUFFER, new Float32Array(this.actor[actorIndex].colours.colour), this.glContainer.gl.STATIC_DRAW);
    }

    setPosition(actorIndex, x, y) {
        this.actor[actorIndex].setWorldPosition(x, y);
        this.actor[a].setCameraPosition(0, -(this.camera.originX - this.actor[a].x), this.camera.originY - this.actor[a].y);
        this.actor[a].setCameraPosition(1, -(this.camera.originX - (this.actor[a].x + this.actor[a].width)), this.camera.originY - this.actor[a].y);
        this.actor[a].setCameraPosition(2, -(this.camera.originX - this.actor[a].x), (this.camera.originY - (this.actor[a].y + this.actor[a].height)));
        this.actor[a].setCameraPosition(3, -(this.camera.originX - (this.actor[a].x + this.actor[a].width)), (this.camera.originY - (this.actor[a].y + this.actor[a].height)));
    }

    setVertexColour(actorIndex, vertexIndex, r, g, b, a) {
        this.actor[actorIndex].setVertexColour(vertexIndex, r, g, b, a);
    }

    setupRender() {
        this.glContainer.gl.enable(this.glContainer.gl.DEPTH_TEST);
        this.glContainer.gl.depthFunc(this.glContainer.gl.LEQUAL);
        /*for(let a = 0; a < this.actorNum; ++a) {
            this.setupVertexAttribPosition(a);
            this.setupVertexAttribColour(a);
        }*/
        this.glContainer.gl.useProgram(this.shaderProgram);
    }

    setupVertexAttribPosition(actorIndex) {
        this.glContainer.gl.bindBuffer(this.glContainer.gl.ARRAY_BUFFER, this.actor[actorIndex].positionBuffer);
        this.glContainer.gl.vertexAttribPointer(this.vertexAttribPositionLocation, 2, this.glContainer.gl.FLOAT, true, 0, 0);
        this.glContainer.gl.enableVertexAttribArray(this.vertexAttribPositionLocation);
    }

    setupVertexAttribColour(actorIndex) {
        this.glContainer.gl.bindBuffer(this.glContainer.gl.ARRAY_BUFFER, this.actor[actorIndex].colourBuffer);
        this.glContainer.gl.vertexAttribPointer(this.vertexAttribColourLocation, 4, this.glContainer.gl.FLOAT, false, 0, 0);
        this.glContainer.gl.enableVertexAttribArray(this.vertexAttribColourLocation);
    }

    setProjectionMatrix(actorIndex) {
        this.actor[actorIndex].projectionMatrix = glMatrix.mat4.create();
        glMatrix.mat4.ortho(this.actor[actorIndex].projectionMatrix, -(this.camera.width / 2), this.camera.width / 2, -(this.camera.height / 2), this.camera.height / 2, 0.0, 100.0);
    }

    setModelViewMatrix(actorIndex) {
        this.actor[actorIndex].modelViewMatrix = glMatrix.mat4.create();
        glMatrix.mat4.translate(this.actor[actorIndex].modelViewMatrix, this.actor[actorIndex].modelViewMatrix, [this.actor[actorIndex].positions[0] + (this.actor[actorIndex].width / 2), this.actor[actorIndex].positions[1] - this.actor[actorIndex].height / 2, 0.0]);
        /*if(debugFirstRun) {
            console.log(this.actor[actorIndex].width);
            console.log("rotation translation x: " + (this.actor[actorIndex].positions[0] + (this.actor[actorIndex].width / 2)));
            console.log("rotation translate y: " + (this.actor[actorIndex].positions[1] - this.actor[actorIndex].height / 2));
            debugFirstRun = false;
        }*/
        if(this.actor[actorIndex].rotation != 0.0) {
            glMatrix.mat4.rotateZ(this.actor[actorIndex].modelViewMatrix, this.actor[actorIndex].modelViewMatrix, this.actor[actorIndex].rotation);
            //glMatrix.mat4.rotate(this.actor[actorIndex].modelViewMatrix, this.actor[actorIndex].modelViewMatrix, this.actor[actorIndex].rotation, [0, 0, 1]);
        }
        glMatrix.mat4.translate(this.actor[actorIndex].modelViewMatrix, this.actor[actorIndex].modelViewMatrix, [-(this.actor[actorIndex].positions[0] + this.actor[actorIndex].width / 2), -(this.actor[actorIndex].positions[1] - this.actor[actorIndex].height / 2), 0.0]);
    }

    render(deltaTime) {
        this.glContainer.gl.clearDepth(1.0);
        this.glContainer.gl.clear(this.glContainer.gl.COLOR_BUFFER_BIT | this.glContainer.gl.DEPTH_BUFFER_BIT);
        for(let a = 0; a < this.actorNum; ++a) {
            this.setupVertexAttribPosition(a);
            this.setupVertexAttribColour(a);
            this.setProjectionMatrix(a);
            this.setModelViewMatrix(a);
            this.glContainer.gl.uniformMatrix4fv(
                this.projectionMatrixUniformLocation,
                false,
                this.actor[a].projectionMatrix
            );
            this.glContainer.gl.uniformMatrix4fv(
                this.modelViewMatrixUniformLocation,
                false,
                this.actor[a].modelViewMatrix
            );
            this.glContainer.gl.drawArrays(this.glContainer.gl.TRIANGLE_STRIP, 0, this.actor[a].verticesNum);
            //console.log(this.actor[a].rotation);
            if(a == 0)
                this.actor[a].rotation += deltaTime;
            else if(a == 1)
                this.actor[a].rotation -= deltaTime;
        }
    }
};

function main() {
    var program = new Program(2, 1);
    program.setupTexture(0, "https://i.imgur.com/FOg8r0h.jpeg");
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
        program.render(deltaTime, texture);
        requestAnimationFrame(renderFunction);
    }
    requestAnimationFrame(renderFunction);
}
var texture = null;
window.onload = main;
