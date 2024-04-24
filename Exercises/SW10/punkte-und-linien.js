"use strict"

let gl
let currentDrawMode = "points";  // Set default to points for initial drawing

window.onload = function() {
    initializeWebGL();
    updateColor();
}

function setDrawMode(mode) {
    currentDrawMode = mode;
    drawScene(); // Redraw the scene with the new mode
}

function hexToRgb(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;
    return [r, g, b, 1.0]; // Assume full opacity
}

function updateColor() {
    let colorValue = document.getElementById('colorPicker').value;
    let [r, g, b, a] = hexToRgb(colorValue);
    gl.uniform4f(colorLocation, r, g, b, a);
    drawScene(); // Redraw the scene with the new color
}

function drawScene() {
    clear(); // Always clear the canvas first
    switch (currentDrawMode) {
        case "points":
            DrawPoints();
            break;
        case "lines":
            DrawLines();
            break;
        case "lineStrip":
            DrawLineStrip();
            break;
        case "lineLoop":
            DrawLineLoop();
            break;
        case "triangles":
            DrawTriangles();
            break;
        case "triangleStrip":
            DrawTrianglesStrip();
            break;
        case "triangleFan":
            DrawTrianglesFan();
            break;
    }
}

function clear() {
    gl.clearColor(1.0, 1.0, 1.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
}

function DrawPoints() {
    clear()
    gl.drawArrays(gl.POINTS, 0, 4)
}

function DrawLines() {
    clear()
    gl.drawArrays(gl.LINES, 0, 4)
}

function DrawLineStrip() {
    clear()
    gl.drawArrays(gl.LINE_STRIP, 0, 4)
}

function DrawLineLoop() {
    clear()
    gl.drawArrays(gl.LINE_LOOP, 0, 4)
}

function DrawTriangles() {
    clear()
    gl.drawArrays(gl.TRIANGLES, 0, 4)
}

function DrawTrianglesStrip() {
    clear()
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}

function DrawTrianglesFan() {
    clear()
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4)
}
