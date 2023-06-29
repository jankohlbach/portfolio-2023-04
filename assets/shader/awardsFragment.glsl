precision mediump float;

uniform float uTime;
uniform vec2 uResolution; // in pixel
uniform vec2 uMouse; // 0 (left) 0 (bottom) - 1 (top) 1 (right)
uniform sampler2D uImage;

varying vec2 vUv;

#include './resources/utils';
#include './resources/noise';

out vec4 outColor;


void main() {
  vec2 texCoord = vUv;

  // object-fit cover
  texCoord = cover(uResolution, uImage, texCoord);

  // distortion effect
  float ratio = uResolution.y / uResolution.x;
  float circle = 1.0 - distance(vec2(uMouse.x, uMouse.y * ratio), vec2(vUv.x, vUv.y * ratio)) * 5.0;

  float noise = snoise(gl_FragCoord.xy);

  texCoord.x += (sin(texCoord.y * 2.0 + circle + uTime) / 100.0) * noise * 2.0;
  texCoord.y += (sin(texCoord.x * 2.0 + circle + uTime) / 100.0) * noise * 2.0;

  vec3 tex = vec3(texture(uImage, texCoord));

  // add bg noise
  vec3 noiseBg = vec3(snoise(gl_FragCoord.xy * 0.1)) * 0.5 + 0.5;

  vec3 color = noiseBg.r > 0.94 ? tex + noiseBg * 0.3 : tex;

  outColor = vec4(color, 1.0);
}
