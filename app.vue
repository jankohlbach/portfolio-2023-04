<script setup lang="ts">
onMounted(() => {
  // eslint-disable-next-line no-console
  console.log('%c ', `
    background: #1A1A18 url("data:image/svg+xml,%3Csvg viewBox='0 0 365 266' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M45.01 226.68C40.64 226.33 36.97 225.8 34 225.11L35.05 202.83C37.67 203.35 41.08 203.84 45.27 204.27C49.46 204.71 52.87 204.93 55.49 204.93C65.8 204.93 73.22 201.39 77.77 194.32C82.31 187.24 84.58 176.72 84.58 162.74L84.05 38H107.63L108.15 171.39C108.32 188.34 103.87 201.88 94.78 212.01C85.69 222.14 73.2 227.21 57.31 227.21C53.47 227.21 49.36 227.03 44.99 226.69L45.01 226.68ZM134.37 147.54H220.59V168.5H134.37V147.54ZM181.01 38H208.79L330.65 223.01H303.13L181.01 38Z' fill='%23fffefd'/%3E%3C/svg%3E%0A");
    padding-left: 100px;
    padding-top: 60px;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
  `)
  // eslint-disable-next-line no-console
  console.log('%cmade by https://jankohlbach.com', `
    color: #FFFEFD;
    background: #1A1A18;
    padding: 5px 10px;
  `)

  const { cursorPos, setCursorPosCurrent, setCursorPosTarget } = useCursor()

  let raf: number | null

  window.addEventListener('mousemove', (event) => {
    setCursorPosTarget(event.clientX, event.clientY)

    if (!raf) {
      raf = requestAnimationFrame(calcLerp)
    }
  })

  const calcLerp = () => {
    const x = lerp(cursorPos.value.current.x, cursorPos.value.target.x, 0.02)
    const y = lerp(cursorPos.value.current.y, cursorPos.value.target.y, 0.02)

    setCursorPosCurrent(x, y)

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
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
