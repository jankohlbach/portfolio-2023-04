<script setup lang="ts">
import { gsap } from 'gsap'
import SplitType from 'split-type'
import * as THREE from 'three'

import vsSource from '~/assets/shader/introVertex.glsl'
import fsSource from '~/assets/shader/introFragment.glsl'

const intro = ref()
const canvas = ref()
const content = ref()
const headline = ref()

const { cursorPos } = useCursor()

let geometry: THREE.PlaneGeometry
let material: THREE.ShaderMaterial
let raf: number

onMounted(() => {
  // shader
  const scene = new THREE.Scene()

  const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -1, 1)

  geometry = new THREE.PlaneGeometry(1, 1, 1, 1)
  material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uMouse: { value: new THREE.Vector2(cursorPos.value.current.x, cursorPos.value.current.y) },
      uImage: { value: new THREE.TextureLoader().load('/textures/logo-texture.svg') },
      uIntensity: { value: 0 },
      uFadeOutIntensity: { value: 1 }
    },
    vertexShader: vsSource,
    fragmentShader: fsSource,
    glslVersion: THREE.GLSL3
  })

  const mesh = new THREE.Mesh(geometry, material)

  scene.add(mesh)

  const renderer = new THREE.WebGLRenderer({ canvas: canvas.value, alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(2)

  const render = (time = 0) => {
    time /= 1000

    material.uniforms.uTime.value = time
    material.uniforms.uMouse.value.x = cursorPos.value.current.x
    material.uniforms.uMouse.value.y = cursorPos.value.current.y

    renderer.render(scene, camera)

    raf = requestAnimationFrame(render)
  }

  raf = requestAnimationFrame(render)

  window.addEventListener('resize', debounce(() => {
    resizeThreeCanvas(camera, renderer)

    material.uniforms.uResolution.value.x = window.innerWidth
    material.uniforms.uResolution.value.y = window.innerHeight
  }))

  // animation
  const headlineSplit = new SplitType(headline.value)

  gsap.set(headlineSplit.chars, { autoAlpha: 0 })
  gsap.set(content.value, { opacity: 1 })

  const tl = gsap.timeline()

  tl
    .to(
      material.uniforms.uIntensity,
      {
        value: 1,
        duration: 1.5,
        ease: 'power2.in',
        delay: 0.5
      }
    )
    .fromTo(
      headlineSplit.chars,
      {
        autoAlpha: 0,
        transform: 'skewX(10deg) translateY(0.5em) scale(0.8)'
      },
      {
        autoAlpha: 1,
        transform: 'skewX(0deg) translateY(0) scale(1)',
        stagger: 0.01
      },
      '<0.35'
    )
    .to(
      material.uniforms.uFadeOutIntensity,
      {
        value: 20,
        duration: 1.5,
        ease: 'power2.in',
        delay: 0.3
      }
    )
    .to(
      headlineSplit.chars,
      {
        autoAlpha: 0,
        transform: 'skewX(-5deg) translateY(-0.4em) scale(0.8)',
        stagger: 0.01
      },
      '<0.3'
    )
    .to(
      intro.value,
      {
        autoAlpha: 0,
        duration: 0.8
      }
    )
    .call(() => cancelAnimationFrame(raf))
})
</script>

<template>
  <div ref="intro" class="intro">
    <canvas ref="canvas" />
    <div ref="content" class="content">
      <h1 ref="headline">
        Jan Kohlbach<br>Creative Developer<br>& Digital Designer
      </h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.intro {
  position: fixed;
  inset: 0;
  z-index: var(--zi-page-transition);
  background-color: var(--c-light);
}

canvas {
  position: fixed;
  inset: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.content {
  padding: var(--s-s);
  opacity: 0;
  mix-blend-mode: difference;
}

h1 {
  font-weight: var(--fw-regular);
  font-size: var(--fs-l);
  color: var(--c-light);
  text-align: right;
}
</style>
