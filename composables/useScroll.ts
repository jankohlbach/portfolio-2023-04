export const useScroll = () => {
  return useState('scroll', () => ({
    percentage: 0
  }))
}
