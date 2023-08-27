import { PerspectiveCamera, OrthographicCamera, WebGLRenderer } from 'three'

export const resizeThreeCanvas = (camera: PerspectiveCamera | OrthographicCamera, renderer: WebGLRenderer, fixedRatio: number | null = null) => {
  if (camera instanceof PerspectiveCamera) {
    camera.aspect = window.innerWidth / window.innerHeight
  }

  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(fixedRatio || Math.min(window.devicePixelRatio, 2))
}
