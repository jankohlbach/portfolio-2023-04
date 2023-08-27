<script setup lang="ts">
import vsSource from '~/assets/shader/noiseVertex.glsl'
import fsSource from '~/assets/shader/noiseFragment.glsl'

const canvas = ref()

const drawNoise = (gl: WebGL2RenderingContext) => {
  resizeShaderCanvas(canvas.value, gl, 2)

  gl.clearColor(0, 0, 0, 0)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}

onMounted(() => {
  const gl: WebGL2RenderingContext = canvas.value.getContext('webgl2')

  const shaderProgram = createShaderProgram(gl, vsSource, fsSource)

  const positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'a_position')

  const positionBuffer = gl.createBuffer()

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      -1, -1,
      -1, 1,
      1, -1,
      1, 1
    ]),
    gl.STATIC_DRAW
  )

  gl.useProgram(shaderProgram)

  gl.enableVertexAttribArray(positionAttributeLocation)
  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)

  drawNoise(gl)

  window.addEventListener('resize', () => debounce(drawNoise(gl)))
})
</script>

<template>
  <canvas ref="canvas" />
</template>

<style lang="scss">
canvas {
  position: fixed;
  inset: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
