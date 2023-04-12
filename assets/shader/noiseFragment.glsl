#version 300 es

precision highp float;

#include ./simplex2d;

uniform vec2 u_resolution;

out vec4 out_color;


void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;

  st.x *= u_resolution.x / u_resolution.y;

  st *= 400.0;

  vec3 color = vec3(0.0);

  color = vec3((snoise(st) * 0.5 + 0.5) * 0.8 - 0.1);

  out_color = vec4(color, 0.1);
}
