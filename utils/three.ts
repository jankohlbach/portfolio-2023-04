import { PerspectiveCamera, WebGLRenderer } from 'three'

export const resizeCanvas = (camera: PerspectiveCamera, renderer: WebGLRenderer) => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}
