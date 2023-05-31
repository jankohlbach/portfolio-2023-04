#version 300 es

precision highp float;

#include ./simplex2d;

out vec4 out_color;


void main() {
  vec3 color = vec3(0.0);

  color = vec3((snoise(gl_FragCoord.xy / 6.0) * 0.5 + 0.5) * 0.8 - 0.1);

  out_color = vec4(color, 0.1);
}
