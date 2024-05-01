attribute vec2 aVertex;
attribute vec3 aColor;
uniform mat3 uMatrix;
varying vec3 vColor;

void main() {
    vec3 v = vec3(aVertex, 1.0);
    gl_Position = vec4(uMatrix * v, 1.0);
    vColor = aColor;
}
