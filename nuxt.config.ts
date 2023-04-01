import glsl from 'vite-plugin-glsl'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Jan Kohlbach | Creative Developer & Visual Designer',
      link: [
        // { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }
        // { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        // { rel: 'manifest', href: '/manifest.webmanifest' }
      ],
      script: [
        { async: true, defer: true, 'data-website-id': '<ID>', src: 'https://tracking.jnkl.dev/umami.js' }
      ],
      meta: [
        { name: 'robots', content: 'noindex,nofollow' },
        { name: 'theme-color', content: '#000000' },
        { name: 'description', content: 'base' },
        { name: 'og:title', content: 'Jan Kohlbach | Creative Developer & Visual Designer' },
        { name: 'og:description', content: 'base' },
        // { name: 'og:image', content: '/og-image.jpg' },
        { name: 'og:type', content: 'website' },
        { name: 'og:locale', content: 'en' }
      ]
    }
  },
  typescript: {
    typeCheck: true
  },
  css: [
    '@/assets/styles/global.scss'
  ],
  vite: {
    plugins: [glsl()]
  }
})
