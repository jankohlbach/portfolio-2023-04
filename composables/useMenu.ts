export const useMenu = () => {
  return useState('menu', () => ({
    isOpen: false
  }))
}
