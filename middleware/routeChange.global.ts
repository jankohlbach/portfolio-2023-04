export default defineNuxtRouteMiddleware(() => {
  clearError()

  const menu = useMenu()
  menu.value.isOpen = false
})
