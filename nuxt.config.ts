import glsl from 'vite-plugin-glsl'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
      title: 'Jan Kohlbach | Creative Developer & Digital Designer',
      link: [
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/manifest.webmanifest' },
        { rel: 'preload', href: '/fonts/utf-alte-grotest-vf/UTFAlteGroteskVF.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' }
      ],
      // script: [
      //   { async: true, defer: true, 'data-website-id': '<ID>', src: 'https://tracking.jnkl.dev/umami.js' }
      // ],
      meta: [
        { name: 'robots', content: 'noindex,nofollow' },
        { name: 'theme-color', content: '#000000' },
        { name: 'description', content: 'Creative Developer & Digital Designer | Crafting Immersive Experiences with Purpose and Playfulness | Let\'s collaborate and create award-winning projects together.' },
        { property: 'og:title', content: 'Jan Kohlbach | Creative Developer & Digital Designer' },
        { property: 'og:description', content: 'Creative Developer & Digital Designer | Crafting Immersive Experiences with Purpose and Playfulness | Let\'s collaborate and create award-winning projects together.' },
        // { property: 'og:image', content: '/og-image.jpg' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en' }
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
