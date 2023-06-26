export const useHome = () => {
  return useState('home', () => ({
    // TODO: change to overview
    view: 'index',
    currentIndex: 1,
    projectsCount: 0
  }))
}
