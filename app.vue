<script setup lang="ts">
import Lenis from '@studio-freight/lenis'

const menu = useMenu()

onMounted(() => {
  const lenis = new Lenis({ lerp: 0.075 })

  const raf = (time: number) => {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  watch(menu.value, () => {
    if (menu.value.isOpen) {
      document.body.style.overflowY = 'hidden'
      lenis.stop()
    } else {
      document.body.style.overflowY = ''
      lenis.start()
    }
  })
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
