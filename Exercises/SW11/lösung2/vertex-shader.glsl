attribute vec2 aVertex;
attribute vec3 aColor;
varying vec3 vColor;

void main ()
{
    gl_Position = vec4 (aVertex, 0.0, 1.0);
    vColor = aColor;
}
