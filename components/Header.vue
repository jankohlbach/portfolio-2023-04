<script setup lang="ts">
const sb = useStoryblokApi()
const { data: { story: { content } } } = await sb.get(
  'cdn/stories/globals',
  { version: <'draft'|'published'>useRuntimeConfig().public.contentVersion, resolve_links: 'url' }
)

const menu = useMenu()
</script>

<template>
  <header class="header" :class="{'menu-open': menu.isOpen}">
    <div class="left">
      <nuxt-link to="/" class="logo">
        <svg viewBox="0 0 297 190" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.01 188.68C6.64 188.33 2.97 187.8 0 187.11L1.05 164.83C3.67 165.35 7.08 165.84 11.27 166.27C15.46 166.71 18.87 166.93 21.49 166.93C31.8 166.93 39.22 163.39 43.77 156.32C48.31 149.24 50.58 138.72 50.58 124.74L50.05 0H73.63L74.15 133.39C74.32 150.34 69.87 163.88 60.78 174.01C51.69 184.14 39.2 189.21 23.31 189.21C19.47 189.21 15.36 189.03 10.99 188.69L11.01 188.68ZM100.37 109.54H186.59V130.5H100.37V109.54ZM147.01 0H174.79L296.65 185.01H269.13L147.01 0Z" fill="#1A1A18" />
        </svg>
      </nuxt-link>

      <span v-if="menu.isOpen" class="title">{{ content.text_title }}</span>
    </div>

    <button class="button" @click="menu.isOpen = !menu.isOpen">
      {{ menu.isOpen ? 'CLOSE' : 'MENU' }}
    </button>
  </header>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/functions' as *;

.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: var(--s-s);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  &.menu-open {
    pointer-events: none;

    .button {
      pointer-events: all;
    }
  }
}

.left {
  display: flex;
  flex-grow: 1;
}

.logo {
  flex-grow: 1;
  max-width: min(rem(300), 50vw);
}

.title,
.button {
  font-size: var(--fz-base);
}

.button {
  font-weight: 200;
}
</style>
