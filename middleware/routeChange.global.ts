export default defineNuxtRouteMiddleware(() => {
  clearError()

  setTimeout(() => {
    const menu = useMenu()
    menu.value.isOpen = false
  }, 500)
})
