#version 300 es

precision highp float;

#include ./resources/noise;

out vec4 out_color;


void main() {
  vec3 color = vec3(0.0);

  float density = 0.2;

  // less dense
  vec3 noise = vec3(snoise(gl_FragCoord.xy * density));

  // adjust -1 <-> 1 range to 0 <-> 1 range
  noise = noise * 0.5 + 0.5;

  // range color between 0.1 and 0.9
  color = vec3(noise * 0.8 - 0.1);

  out_color = vec4(color, 0.1);
}
