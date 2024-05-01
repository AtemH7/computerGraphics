attribute vec2 aVertex;
uniform mat3 uMatrix;

void main ()
{
    vec3 v = vec3 (aVertex, 1.0);
    gl_Position = vec4 (uMatrix * v, 1.0);
}
