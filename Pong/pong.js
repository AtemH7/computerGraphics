document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('pongCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const gl = canvas.getContext('webgl');
    const scoreDisplay = document.getElementById('score');

    if (!gl) {
        alert('WebGL not supported in this browser.');
        return;
    }

    let playerScore = 0;
    let computerScore = 0;
    let paddleHeight = 0.2; // Proportionate to the canvas height
    let paddleWidth = 0.02; // Proportionate to the canvas width
    let ballSize = 0.015; // Proportionate to the canvas width
    let playerPosition = 0;
    let computerPosition = 0;
    let ballX = 0;
    let ballY = 0;
    let ballXSpeed = 0.005 * (canvas.width / canvas.height); // Adjusted for canvas aspect ratio
    let ballYSpeed = 0.005; // Fixed vertical speed

    // Vertex shader source code
    const vsSource = `
        attribute vec4 aVertexPosition;
        void main() {
            gl_Position = aVertexPosition;
        }
    `;

    // Fragment shader source code
    const fsSource = `
        precision mediump float;
        uniform vec4 uColor;
        void main() {
            gl_FragColor = uColor;
        }
    `;

    // Initialize shader program
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        },
        uniformLocations: {
            uColor: gl.getUniformLocation(shaderProgram, 'uColor'),
        },
    };

    // Initialize buffers
    const buffers = initBuffers(gl);

    document.addEventListener('keydown', function(event) {
        const step = paddleHeight / 2; // Make movement speed relative to paddle size
        if (event.key === 'ArrowUp') {
            playerPosition = Math.max(playerPosition - step, -1 + paddleHeight);
        } else if (event.key === 'ArrowDown') {
            playerPosition = Math.min(playerPosition + step, 1 - paddleHeight);
        }
    });

    function render() {
        updateComputerPaddle();
        updateBallPosition();

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        drawScene(gl, programInfo, buffers, playerPosition, computerPosition, ballX, ballY);

        scoreDisplay.textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    function updateBallPosition() {
        ballX += ballXSpeed;
        ballY += ballYSpeed;
        if (ballY > 1 - ballSize || ballY < -1 + ballSize) {
            ballYSpeed *= -1;
        }
        if ((ballX < -1 + paddleWidth && ballY > playerPosition - paddleHeight && ballY < playerPosition) ||
            (ballX > 1 - paddleWidth && ballY > computerPosition - paddleHeight && ballY < computerPosition)) {
            ballXSpeed *= -1;
        }
        if (ballX < -1 || ballX > 1) {
            ballX < -1 ? computerScore++ : playerScore++;
            resetBall();
        }
    }

    function updateComputerPaddle() {
        const step = paddleHeight / 4; // Slower than player movement
        if (computerPosition < ballY) {
            computerPosition = Math.min(computerPosition + step, 1 - paddleHeight);
        } else if (computerPosition > ballY) {
            computerPosition = Math.max(computerPosition - step, -1 + paddleHeight);
        }
    }

    function resetBall() {
        ballX = 0;
        ballY = 0;
        ballXSpeed = 0.005 * (canvas.width / canvas.height); // Adjusted for canvas aspect ratio
        ballYSpeed = (Math.random() > 0.5 ? 1 : -1) * 0.005; // Randomized vertical direction
    }

    function initBuffers(gl) {
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positions = [
            1.0, 1.0,
            -1.0, 1.0,
            1.0, -1.0,
            -1.0, -1.0,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
        return {
            position: positionBuffer,
        };
    }

    function drawScene(gl, programInfo, buffers, playerPosition, computerPosition, ballX, ballY) {
        drawRectangle(gl, programInfo, buffers.position, -1 + paddleWidth, playerPosition - paddleHeight, paddleWidth, paddleHeight);
        drawRectangle(gl, programInfo, buffers.position, 1 - paddleWidth, computerPosition - paddleHeight, paddleWidth, paddleHeight);
        drawRectangle(gl, programInfo, buffers.position, ballX - ballSize, ballY - ballSize, 2 * ballSize, 2 * ballSize);
    }

    function drawRectangle(gl, programInfo, buffer, x, y, width, height) {
        const vertices = [
            x + width, y + height,
            x, y + height,
            x + width, y,
            x, y,
        ];
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
        gl.useProgram(programInfo.program);
        gl.uniform4f(programInfo.uniformLocations.uColor, 1.0, 1.0, 1.0, 1.0);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    function initShaderProgram(gl, vsSource, fsSource) {
        const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
            return null;
        }
        return shaderProgram;
    }

    function loadShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }
});
