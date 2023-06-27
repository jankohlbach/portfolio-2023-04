float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

// float circle(vec2 st, float radius) {
//   vec2 dist = st - vec2(0.5);
// 	return 1.0 - smoothstep(radius - (radius * 0.01),
//                           radius + (radius * 0.01),
//                           dot(dist, dist) * 4.0);
// }

// float circle(vec2 uv, vec2 resolution, vec2 disc_center, float disc_radius, float border_size) {
//   uv -= disc_center;
//   uv *= resolution;
//   float dist = sqrt(dot(uv, uv));
//   return smoothstep(disc_radius + border_size, disc_radius - border_size, dist);
// }
