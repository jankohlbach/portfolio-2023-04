import Lenis from '@studio-freight/lenis'

export default defineNuxtPlugin(() => {
  const scroll = useScroll()
  const menu = useMenu()

  const lenis = new Lenis()

  const raf = (time: number) => {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  window.addEventListener('scroll:stop', () => {
    document.body.style.overflowY = 'hidden'
    lenis.stop()
  })

  window.addEventListener('scroll:start', () => {
    document.body.style.overflowY = ''
    lenis.start()
  })

  lenis.on('scroll', (e: any) => {
    scroll.value.percentage = window.scrollY / (e.dimensions.scrollHeight - e.dimensions.height) * 100
  })

  watch(menu.value, () => {
    if (menu.value.isOpen) {
      document.body.style.overflowY = 'hidden'
      lenis.stop()
    } else {
      document.body.style.overflowY = ''
      lenis.start()
    }
  })

  return {
    provide: {
      lenis
    }
  }
})
