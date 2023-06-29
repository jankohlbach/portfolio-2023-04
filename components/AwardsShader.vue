<script setup lang="ts">
import * as THREE from 'three'

import vsSource from '~/assets/shader/awardsVertex.glsl'
import fsSource from '~/assets/shader/awardsFragment.glsl'

const canvas = ref()

const { cursorPos } = useCursor()

let geometry: THREE.PlaneGeometry
let material: THREE.ShaderMaterial
let raf: number

onMounted(() => {
  const scene = new THREE.Scene()

  const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, -10, 10)

  geometry = new THREE.PlaneGeometry(10, 10, 10, 10)
  material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uMouse: { value: new THREE.Vector2(cursorPos.value.current.x, cursorPos.value.current.y) },
      uImage: { value: new THREE.TextureLoader().load('/textures/awwwards-texture.svg') }
    },
    vertexShader: vsSource,
    fragmentShader: fsSource,
    glslVersion: THREE.GLSL3
  })

  const mesh = new THREE.Mesh(geometry, material)

  scene.add(mesh)

  const renderer = new THREE.WebGLRenderer({ canvas: canvas.value, alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const render = (time = 0) => {
    time /= 1000

    material.uniforms.uTime.value = time
    material.uniforms.uMouse.value.x = cursorPos.value.current.x
    material.uniforms.uMouse.value.y = cursorPos.value.current.y

    renderer.render(scene, camera)

    raf = requestAnimationFrame(render)
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          raf = requestAnimationFrame(render)
        } else {
          cancelAnimationFrame(raf)
        }
      })
    }, {
      rootMargin: '100px 0px 100px 0px'
    }
  )

  observer.observe(canvas.value)

  const resize = () => {
    resizeThreeCanvas(camera, renderer)

    material.uniforms.uResolution.value.x = window.innerWidth
    material.uniforms.uResolution.value.y = window.innerHeight
  }

  window.addEventListener('resize', () => debounce(resize()))
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
})
</script>

<template>
  <canvas ref="canvas" />
</template>

<style lang="scss" scoped>
canvas {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
