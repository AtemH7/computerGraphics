"use strict"



function WebGLlog (funcName, args)
{
    console.log ("gl." + funcName + "("
        + WebGLDebugUtils.glFunctionArgsToString (funcName, args)
        + ")")
}


function WebGLerr (err, funcName, args)
{
    throw WebGLDebugUtils.glEnumToString (err)
        + " was caused by call to: "
        + funcName
}



window.onload = function ()
{
    let canvas = document.getElementById ("myCanvas")
    let gl = canvas.getContext ("webgl")
    gl = WebGLDebugUtils.makeDebugContext (gl, WebGLerr, WebGLlog);

    MakeShader (gl, "./vertex-shader.glsl", "./fragment-shader.glsl")
        .then (sp => main (gl, sp))
}
