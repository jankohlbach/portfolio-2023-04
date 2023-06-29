export const useCursor = () => {
  const cursorPos = useState('cursorPos', () => ({
    current: { x: 0, y: 0 },
    target: { x: 0, y: 0 }
  }))

  onMounted(() => {
    window.addEventListener('mousemove', (event) => {
      const mouseX = event.clientX
      const mouseY = event.clientY
      cursorPos.value.target.x = (mouseX / window.innerWidth)
      cursorPos.value.target.y = 1 - (mouseY / window.innerHeight)

      if (!raf) {
        raf = requestAnimationFrame(calcLerp)
      }
    })

    let raf: number | null

    const calcLerp = () => {
      cursorPos.value.current.x = lerp(cursorPos.value.current.x, cursorPos.value.target.x, 0.02)
      cursorPos.value.current.y = lerp(cursorPos.value.current.y, cursorPos.value.target.y, 0.02)

      const delta = Math.sqrt(
        ((cursorPos.value.target.x - cursorPos.value.current.x) ** 2) +
        ((cursorPos.value.target.y - cursorPos.value.current.y) ** 2)
      )

      if (delta < 0.001 && raf) {
        cancelAnimationFrame(raf)
        raf = null
        return
      }

      raf = requestAnimationFrame(calcLerp)
    }
  })

  return {
    cursorPos
  }
}
