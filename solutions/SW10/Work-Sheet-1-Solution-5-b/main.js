"use strict"



let VtxBuf = []
let IdxBuf = []
let Idx = 0



function main (gl, sp)
{
    Rect   (-0.8, -0.9,   0.5, 0.3,   1.0, 0.7, 0.7)
    Rect   (-0.7,  0.5,   0.6, 0.3,   1.0, 1.0, 0.7)
    Rect   (-0.1, -0.1,   0.5, 0.4,   0.7, 1.0, 0.7)
    Rect   (-0.9, -0.3,   0.5, 0.7,   0.7, 1.0, 1.0)
    Rect   ( 0.6,  0.5,   0.3, 0.4,   0.7, 0.7, 1.0)
    Rect   ( 0.5, -0.6,   0.4, 0.5,   1.0, 0.7, 1.0)

    const vbuf = gl.createBuffer()
    gl.bindBuffer (gl.ARRAY_BUFFER, vbuf)
    gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (VtxBuf), gl.STATIC_DRAW )

    const vloc = gl.getAttribLocation (sp , "aVertex")
    gl.vertexAttribPointer (vloc, 2, gl.FLOAT, false, 20, 0)
    gl.enableVertexAttribArray (vloc)

    const cloc = gl.getAttribLocation (sp , "aColor")
    gl.vertexAttribPointer (cloc, 3, gl.FLOAT, false, 20, 8)
    gl.enableVertexAttribArray (cloc)

    const iloc = gl.createBuffer()
    gl.bindBuffer (gl.ELEMENT_ARRAY_BUFFER, iloc)
    gl.bufferData (gl.ELEMENT_ARRAY_BUFFER, new Uint8Array (IdxBuf), gl.STATIC_DRAW )

    gl.clearColor (0.5, 0.5, 0.5, 1.0)
    gl.clear (gl.COLOR_BUFFER_BIT)
    gl.drawElements (gl.TRIANGLES, IdxBuf.length, gl.UNSIGNED_BYTE, 0)
}



function Rect (x0, y0, dx, dy, r, g, b)
{
    const x1 = x0 + dx
    const y1 = y0 + dy

    VtxBuf.push (x0, y0); VtxBuf.push (r, g, b);
    VtxBuf.push (x1, y0); VtxBuf.push (r, g, b);
    VtxBuf.push (x1, y1); VtxBuf.push (r, g, b);
    VtxBuf.push (x0, y1); VtxBuf.push (r, g, b);

    IdxBuf.push (Idx, Idx + 1, Idx + 2)
    IdxBuf.push (Idx, Idx + 2, Idx + 3)

    Idx += 4
}
