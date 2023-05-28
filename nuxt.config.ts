import glsl from 'vite-plugin-glsl'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: process.env.NUXT_ENV_DEPLOY_ENV === 'production',
  runtimeConfig: {
    public: {
      contentVersion: process.env.NUXT_ENV_DEPLOY_ENV === 'production' ? 'published' : 'draft'
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Jan Kohlbach | Creative Developer & Visual Designer',
      link: [
        // { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        // { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        // { rel: 'manifest', href: '/manifest.webmanifest' }
        { rel: 'preload', href: '/fonts/utf-alte-grotest-vf/UTFAlteGroteskVF.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' }
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
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: [
    ['@storyblok/nuxt', { accessToken: process.env.STORYBLOK_ACCESS_TOKEN }]
  ],
  typescript: {
    typeCheck: true
  },
  css: [
    '@/assets/styles/global.scss'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/functions" as *; @use "~/assets/styles/mixins" as *;'
        }
      }
    },
    optimizeDeps: {
      exclude: ['fsevents']
    },
    plugins: [glsl()]
  }
})
