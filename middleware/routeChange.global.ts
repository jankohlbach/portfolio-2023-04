export default defineNuxtRouteMiddleware(() => {
  clearError()

  if (typeof window !== 'undefined') {
    setTimeout(() => {
      const menu = useMenu()
      menu.value.isOpen = false
    }, 600)
  }
})
