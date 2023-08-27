precision mediump float;

uniform float uTime;
uniform vec2 uResolution; // in pixel
uniform vec2 uMouse; // 0 (left) 0 (bottom) - 1 (top) 1 (right)
uniform sampler2D uImage;

in vec2 vUv;

#include './resources/utils';
#include './resources/noise';

out vec4 outColor;


void main() {
  //
  // distorted texture
  //
  vec2 texCoord = vUv;

  // object-fit cover
  texCoord = cover(uResolution, uImage, texCoord);

  // effect
  float ratio = uResolution.y / uResolution.x;
  float circle = 1.0 - distance(vec2(uMouse.x, uMouse.y * ratio), vec2(vUv.x, vUv.y * ratio)) * 10.0;

  float noise = snoise(gl_FragCoord.xy);

  texCoord.x += (sin(texCoord.y * 2.0 + circle + uTime) / 100.0) * noise * (3250.0 / uResolution.x);
  texCoord.y += (sin(texCoord.x * 2.0 + circle + uTime) / 100.0) * noise * (3250.0 / uResolution.x);

  vec3 tex = vec3(texture(uImage, texCoord));

  // make white pixel transparent so background noise is visible
  if (tex.r == 1.0) {
    discard;
  }

  outColor = vec4(tex, 1.0);
}
