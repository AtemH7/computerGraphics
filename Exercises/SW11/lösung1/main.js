"use strict"



let gl
let sp
let uColorLoc
let uMatrixLoc
let colorBuffer

function main (agl, asp)
{
    gl = agl
    sp = asp

    const vertices =
    [
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0
    ]

    const vertexBuffer = gl.createBuffer()
    gl.bindBuffer (gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (vertices), gl.STATIC_DRAW )

    const aVertexLoc = gl.getAttribLocation (sp , "aVertex")
    gl.vertexAttribPointer (aVertexLoc, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray (aVertexLoc)

    colorBuffer = gl.createBuffer();
    const colorLoc = gl.getAttribLocation(sp, "aColor");
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(12), gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);

    uMatrixLoc = gl.getUniformLocation(sp, "uMatrix");

    gl.clearColor(0.5, 0.5, 0.5, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    drawRect   (-0.8, -0.9,  0.5, 0.3,  1.0, 0.7, 0.7,  1.0, 1.0, 0.7,  0.7, 1.0, 0.7,  0.7, 1.0, 1.0)
    drawRect   (-0.7,  0.5,  0.6, 0.3,  1.0, 1.0, 0.7,  0.7, 1.0, 0.7,  0.7, 1.0, 1.0,  0.7, 0.7, 1.0)
    drawRect   (-0.1, -0.1,  0.5, 0.4,  0.7, 1.0, 0.7,  0.7, 1.0, 1.0,  0.7, 0.7, 1.0,  1.0, 0.7, 1.0)
    drawRect   (-0.9, -0.3,  0.5, 0.7,  0.7, 1.0, 1.0,  0.7, 0.7, 1.0,  1.0, 0.7, 1.0,  1.0, 0.7, 0.7)
    drawRect   ( 0.6,  0.5,  0.3, 0.4,  0.7, 0.7, 1.0,  1.0, 0.7, 1.0,  1.0, 0.7, 0.7,  1.0, 1.0, 0.7)
    drawRect   ( 0.5, -0.6,  0.4, 0.5,  1.0, 0.7, 1.0,  1.0, 0.7, 0.7,  1.0, 1.0, 0.7,  0.7, 1.0, 0.7)
}



function drawRect (x0, y0, dx, dy, r1, g1, b1, r2 ,g2, b2, r3, g3, b3, r4, g4, b4)
{
    const matrix =
    [
        dx,  0, 0,
         0, dy, 0,
        x0, y0, 1
    ]

    const colors = [
        r1, g1, b1,
        r2, g2, b2,
        r3, g3, b3,
        r4, g4, b4
    ];
    
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.DYNAMIC_DRAW);

    gl.uniformMatrix3fv(uMatrixLoc, false, matrix);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}