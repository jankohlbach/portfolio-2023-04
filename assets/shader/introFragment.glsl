precision mediump float;

uniform float uTime;
uniform vec2 uResolution; // in pixel
uniform vec2 uMouse; // 0 (left) 0 (bottom) - 1 (top) 1 (right)
uniform sampler2D uImage;
uniform float uIntensity;
uniform float uFadeOutIntensity;

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

  texCoord.x += (sin(texCoord.y * 2.0 + circle + uTime) / 100.0) * noise * uFadeOutIntensity * (3250.0 / uResolution.x);
  texCoord.y += (sin(texCoord.x * 2.0 + circle + uTime) / 100.0) * noise * uFadeOutIntensity * (3250.0 / uResolution.x);

  vec3 tex = vec3(texture(uImage, texCoord));


  //
  // bg noise
  //
  float density = 0.2;

  // less dense
  vec3 noiseBase = vec3(snoise(gl_FragCoord.xy * density));

  // adjust -1 <-> 1 range to 0 <-> 1 range
  noiseBase = noiseBase * 0.5 + 0.5;

  // range color between 0.1 and 0.9
  vec3 noiseBg = vec3(noiseBase * 0.8 - 0.1);


  //
  // result
  //
  outColor = vec4(noiseBg * tex, pow(0.1, tex.x - 0.1) * uIntensity);
}
