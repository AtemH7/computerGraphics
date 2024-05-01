"use strict"



function main (gl, sp)
{
    const vertices =
    [
        -0.5, -0.5,
         0.5, -0.5,
         0.5,  0.5,
        -0.5,  0.5
    ]

    const vertexBuffer = gl.createBuffer()
    gl.bindBuffer (gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (vertices), gl.STATIC_DRAW )

    const aVertexLoc = gl.getAttribLocation (sp , "aVertex")
    gl.vertexAttribPointer (aVertexLoc, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray (aVertexLoc)

    gl.clearColor (0.7, 0.7, 0.7, 1.0)
    gl.clear (gl.COLOR_BUFFER_BIT)

    gl.drawArrays (gl.TRIANGLE_FAN, 0, vertices.length / 2)
}
