var debugFirstRun = true;

var program = null;

class Camera {
    constructor(width, height, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.originX = this.x + (this.width / 2);
        this.originY = this.y + (this.height / 2);
        this.heightChanged = false;
    }

    resetSize(width, height) { //in case of display change
        this.width = width;
        this.height = height;
        this.originX = this.x + (this.width / 2);
        this.originY = this.y + (this.height / 2);
        /*if(height > width) {
            let canvasTemp = document.getElementById("canvas");
            let paddingTop = Math.floor((height - width) / 2);
            let paddingBottom = paddingTop;
            if((paddingTop + paddingBottom + width) > height)
                --paddingBottom;
            else if((paddingTop + paddingBottom + width) < height)
                ++paddingTop;
            canvasTemp.style.paddingTop = paddingTop + "px";
            canvasTemp.style.paddingBottom = paddingBottom + "px";
            canvasTemp.style.height = width + "px";
            this.heightChanged = true;
        }
        else if(this.heightChanged == true) {
            let canvasTemp = document.getElementById('canvas');
            canvasTemp.style.paddingTop = "0px";
            canvasTemp.style.paddingBottom = "0px";
            canvasTemp.style.height = "100%";
            this.heightChanged = false;
        }*/
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
    constructor(verticesNum, width, height, x, y, textureIndex) {
        this.positions = new Array(verticesNum * 2);
        /*this.colours = new ShapeColour(verticesNum);
        this.colours.setVertexColour(0, 1.0, 1.0, 1.0, 1.0);
        this.colours.setVertexColour(1, 1.0, 0.0, 0.0, 1.0);
        this.colours.setVertexColour(2, 0.0, 1.0, 0.0, 1.0);
        this.colours.setVertexColour(3, 0.0, 0.0, 1.0, 1.0);*/
        this.positionBuffer = null;
        //this.colourBuffer = null;
        this.textureBuffer = null;
        this.projectionMatrix = null;
        this.modelViewMatrix = null;
        this.rotation = 0.0;
        this.verticesNum = verticesNum;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.textureIndex = textureIndex; //temp, eventually an array or even more complex
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
    constructor(actorNum, textureNum) {
        let canvas = document.getElementById("canvas");
        this.gl = canvas.getContext("webgl");
        this.setupCheck = true;
        if(this.gl === null) {
            this.setupCheck = false;
            return;
        }
        this.gl.canvas.width = 1366;
        this.gl.canvas.height = 768;
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.shaderProgram = null;
        this.vertexAttribPositionLocation = null;
        //this.vertexAttribColourLocation = null;
        this.vertexAttribTextureLocation = null;
        this.projectionMatrixUniformLocation = null;
        this.modelViewMatrixUniformLocation = null;
        this.uSamplerUniformLocation = null;
        this.actorNum = actorNum;
        this.actor = new Array(this.actorNum);
        this.internalResolutionX = 1366;
        this.internalResolutionY = 768;
        this.camera = new Camera(this.internalResolutionX, this.internalResolutionY, 0, 0);
        this.texture = new Array(textureNum);
    }

    resetSize(width, height) {
        this.camera.resetSize(width, height);
        //this.gl.viewport(0, 0, width, height);
        //this.render(deltaTime);
    }

    setupActors() {
        let verticesNum = null;
        let width = null;
        let height = null;
        let x = null;
        let y = null;
        let textureIndex = null;
        for(let a = 0; a < this.actorNum; ++a) {
            if(a == 0) {
                verticesNum = 4;
                /*width = 200;
                height = 200;
                x = 100;
                y = (this.gl.canvas.clientHeight / 2) - 100;*/
                width = (256 / this.internalResolutionX) * this.internalResolutionX;
                height = (256 / this.internalResolutionY) * this.internalResolutionY;
                x = (100 / this.internalResolutionX) * this.internalResolutionX;
                y = (this.internalResolutionY / 2) - (height / 2);
                textureIndex = 0;
            }
            else if(a == 1) {
                verticesNum = 4;
                /*width = 300;
                height = 300;
                x = this.gl.canvas.clientWidth - 100 - width;
                y = (this.gl.canvas.clientHeight / 2) - (height / 2);*/
                width = (256 / this.internalResolutionX) * this.internalResolutionX;
                height = (256 / this.internalResolutionY) * this.internalResolutionY;
                x = this.internalResolutionX - ((100 / this.internalResolutionX) * this.internalResolutionX) - width;
                y = (this.internalResolutionY / 2) - (height / 2);
                textureIndex = 0;
            }
            this.actor[a] = new Actor(verticesNum, width, height, x, y, textureIndex);
            //this.camera.debugGetPositions();
            this.actor[a].setCameraPosition(0, -(this.camera.originX - this.actor[a].x), this.camera.originY - this.actor[a].y);
            this.actor[a].setCameraPosition(1, -(this.camera.originX - (this.actor[a].x + this.actor[a].width)), this.camera.originY - this.actor[a].y);
            this.actor[a].setCameraPosition(2, -(this.camera.originX - this.actor[a].x), (this.camera.originY - (this.actor[a].y + this.actor[a].height)));
            this.actor[a].setCameraPosition(3, -(this.camera.originX - (this.actor[a].x + this.actor[a].width)), (this.camera.originY - (this.actor[a].y + this.actor[a].height)));
        }
        //this.actor[0].debugGetPositions();
        //this.actor[1].debugGetPositions();
    }

    setupTextures() {
        this.loadTexture("dungeonCrawlerAssets/cubetexture.png", 0);
    }

    loadTexture(url, index) {
        this.texture[index] = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture[index]);
        let level = 0;
        let internalFormat = this.gl.RGBA;
        let width = 1;
        let height = 1;
        let border = 0;
        let srcFormat = this.gl.RGBA;
        let srcType = this.gl.UNSIGNED_BYTE;
        let pixel = new Uint8Array([0, 0, 255, 255]);
        this.gl.texImage2D(this.gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);
        let image = new Image();
        image.onload = (function(index) {
            return function() {
                program.gl.bindTexture(program.gl.TEXTURE_2D, program.texture[index]);
                program.gl.texImage2D(program.gl.TEXTURE_2D, 0, program.gl.RGBA, program.gl.RGBA, program.gl.UNSIGNED_BYTE, image);
                if(isPowerOf2(image.width) && isPowerOf2(image.height))
                    program.gl.generateMipmap(program.gl.TEXTURE_2D);
                else {
                    program.gl.texParameteri(program.gl.TEXTURE_2D, program.gl.TEXTURE_WRAP_S, program.gl.CLAMP_TO_EDGE);
                    program.gl.texParmateri(program.gl.TEXTURE_2D, program.gl.TEXTURE_WRAP_T, program.gl.CLAMP_TO_EDGE);
                    program.gl.texParmateri(program.gl.TEXTURE_2D, program.gl.TEXTURE_MIN_FILTER, program.gl.LINEAR);
                }
            };
        })(index);
        image.src = url;
    }

    setupShaderProgram() {
        /*let vertexShaderSource = `
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
        `;
        */
        let vertexShaderSource = `
            attribute vec4 aVertexPosition;
            attribute vec2 aTextureCoord;
            uniform mat4 uModelViewMatrix;
            uniform mat4 uProjectionMatrix;

            varying highp vec2 vTextureCoord;

            void main(void) {
                gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
                vTextureCoord = aTextureCoord;
            }
        `;

        let fragmentShaderSource = `
            varying highp vec2 vTextureCoord;

            uniform sampler2D uSampler;

            void main(void) {
                gl_FragColor = texture2D(uSampler, vTextureCoord);
            }
        `;
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
        //this.vertexAttribColourLocation = this.gl.getAttribLocation(this.shaderProgram, 'aVertexColour');
        this.vertexAttribTextureLocation = this.gl.getAttribLocation(this.shaderProgram, 'aTextureCoord');
        this.projectionMatrixUniformLocation = this.gl.getUniformLocation(this.shaderProgram, 'uProjectionMatrix');
        this.modelViewMatrixUniformLocation = this.gl.getUniformLocation(this.shaderProgram, 'uModelViewMatrix');
        this.uSamplerUniformLocation = this.gl.getUniformLocation(this.shaderProgram, 'uSampler');
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

    setupTextureBuffer(actorIndex) {
        this.actor[actorIndex].textureBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.actor[actorIndex].textureBuffer);
        let textureCoordinates = [
            0.0, 0.0,
            1.0, 0.0,
            0.0, 1.0,
            1.0, 1.0
        ];
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), this.gl.STATIC_DRAW);
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
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
        /*for(let a = 0; a < this.actorNum; ++a) {
            this.setupVertexAttribPosition(a);
            this.setupVertexAttribColour(a);
        }*/
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

    setupVertexAttribTexture(actorIndex) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.actor[actorIndex].textureBuffer);
        this.gl.vertexAttribPointer(this.vertexAttribTextureLocation, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.vertexAttribTextureLocation);
    }

    setProjectionMatrix(actorIndex) {
        this.actor[actorIndex].projectionMatrix = glMatrix.mat4.create();
        glMatrix.mat4.ortho(this.actor[actorIndex].projectionMatrix, -(this.camera.width / 2), this.camera.width / 2, -(this.camera.height / 2), this.camera.height / 2, 0.0, 100.0);
    }

    setModelViewMatrix(actorIndex) {
        this.actor[actorIndex].modelViewMatrix = glMatrix.mat4.create();
        //glMatrix.mat4.translate(this.actor[actorIndex].modelViewMatrix, this.actor[actorIndex].modelViewMatrix, [this.actor[actorIndex].positions[0] + (this.actor[actorIndex].width / 2), this.actor[actorIndex].positions[1] - this.actor[actorIndex].height / 2, 0.0]);
        /*if(debugFirstRun) {
            console.log(this.actor[actorIndex].width);
            console.log("rotation translation x: " + (this.actor[actorIndex].positions[0] + (this.actor[actorIndex].width / 2)));
            console.log("rotation translate y: " + (this.actor[actorIndex].positions[1] - this.actor[actorIndex].height / 2));
            debugFirstRun = false;
        }*/
        /*if(this.actor[actorIndex].rotation != 0.0) {
            glMatrix.mat4.rotateZ(this.actor[actorIndex].modelViewMatrix, this.actor[actorIndex].modelViewMatrix, this.actor[actorIndex].rotation);
            //glMatrix.mat4.rotate(this.actor[actorIndex].modelViewMatrix, this.actor[actorIndex].modelViewMatrix, this.actor[actorIndex].rotation, [0, 0, 1]);
        }
        glMatrix.mat4.translate(this.actor[actorIndex].modelViewMatrix, this.actor[actorIndex].modelViewMatrix, [-(this.actor[actorIndex].positions[0] + this.actor[actorIndex].width / 2), -(this.actor[actorIndex].positions[1] - this.actor[actorIndex].height / 2), 0.0]);
        */
    }

    render(deltaTime) {
        this.gl.clearDepth(1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        for(let a = 0; a < this.actorNum; ++a) {
            this.setupVertexAttribPosition(a);
            //this.setupVertexAttribColour(a);
            this.setupVertexAttribTexture(a);
            this.setProjectionMatrix(a);
            this.setModelViewMatrix(a);
            this.gl.activeTexture(this.gl.TEXTURE0);
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture[0]);
            this.gl.uniform1i(this.uSamplerUniformLocation, 0);
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
            this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, this.actor[a].verticesNum);
            //console.log(this.actor[a].rotation);
            if(a == 0)
                this.actor[a].rotation += deltaTime;
            else if(a == 1)
                this.actor[a].rotation -= deltaTime;
        }
        //this.camera.debugGetPositions();
    }
};

function main() {
    let deltaTime = null;
    program = new Program(2, 1);
    program.setupTextures(); //temporary function
    program.setupActors();
    program.setupShaderProgram();
    for(let a = 0; a < program.actorNum; ++a) {
        program.setupPositionBuffer(a);
        //program.setupColourBuffer(a);
        program.setupTextureBuffer(a);
    }
    program.setupRender();
    var then = 0;
    /*window.addEventListener("resize", (function(programWrapper) {
        return function() {
            programWrapper.program.resetSize(programWrapper.program.gl.canvas.clientWidth, programWrapper.program.gl.canvas.clientHeight)
        };
    })(programWrapper));*/
    console.log("canvas clientWidth: " + program.gl.canvas.clientWidth);
    console.log("canvas clientHeight: " + program.gl.canvas.clientHeight);
    console.log("canvas width: " + program.gl.canvas.width);
    console.log("canvas height: " + program.gl.canvas.height);
    function renderFunction(now) {
        now *= 0.001;
        deltaTime = now - then;
        then = now;
        program.render(deltaTime);
        requestAnimationFrame(renderFunction);
    }
    requestAnimationFrame(renderFunction);
}

function isPowerOf2(value) {
    return (value & (value - 1)) == 0;
}

window.onload = main;
