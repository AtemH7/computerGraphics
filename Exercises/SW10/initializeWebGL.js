let colorLocation;

function initializeWebGL()
{
    let canvas = document.getElementById ("myCanvas")
    gl = canvas.getContext ("webgl")

    let vertexShaderSource =
    `
        attribute vec2 aVertexPosition;

        void main ()
        {
            gl_Position = vec4 (aVertexPosition, 0.0, 1.0);
            gl_PointSize = 10.0;
        }
    `

    let vertexShader = gl.createShader (gl.VERTEX_SHADER)
    gl.shaderSource (vertexShader, vertexShaderSource)
    gl.compileShader (vertexShader)

    let fragmentShaderSource =
    `
        precision mediump float;
        uniform vec4 uColor; // Define the uniform here

        void main ()
        {
            gl_FragColor = uColor;
        }
    `

    let fragmentShader = gl.createShader (gl.FRAGMENT_SHADER)
    gl.shaderSource (fragmentShader, fragmentShaderSource)
    gl.compileShader (fragmentShader)

    let shaderProgram = gl.createProgram()
    gl.attachShader (shaderProgram, vertexShader)
    gl.attachShader (shaderProgram, fragmentShader)
    gl.linkProgram (shaderProgram)
    gl.useProgram (shaderProgram)

    colorLocation = gl.getUniformLocation(shaderProgram, "uColor");
    let vertices =
    [
        -0.5, -0.5,
         0.5, -0.5,
         0.5,  0.5,
        -0.5,  0.5
    ]

    let vertexBuffer = gl.createBuffer()
    gl.bindBuffer (gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (vertices), gl.STATIC_DRAW )

    let aVertexPositionId = gl.getAttribLocation (shaderProgram , "aVertexPosition")
    gl.vertexAttribPointer (aVertexPositionId, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray (aVertexPositionId)

    // Set the uniform color to red before drawing
    gl.uniform4f(colorLocation, 1.0, 0.0, 0.0, 1.0);  // Red color

    clear()
}