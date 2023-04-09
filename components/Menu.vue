<script setup lang="ts">
const sb = useStoryblokApi()
const { data: { story: { content } } } = await sb.get(
  'cdn/stories/globals',
  { version: <'draft'|'published'>useRuntimeConfig().public.contentVersion, resolve_links: 'url' }
)

const menu = useMenu()
</script>

<template>
  <aside class="menu" :class="{'open': menu.isOpen}">
    <svg class="logo" viewBox="0 0 297 190" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.01 188.68C6.64 188.33 2.97 187.8 0 187.11L1.05 164.83C3.67 165.35 7.08 165.84 11.27 166.27C15.46 166.71 18.87 166.93 21.49 166.93C31.8 166.93 39.22 163.39 43.77 156.32C48.31 149.24 50.58 138.72 50.58 124.74L50.05 0H73.63L74.15 133.39C74.32 150.34 69.87 163.88 60.78 174.01C51.69 184.14 39.2 189.21 23.31 189.21C19.47 189.21 15.36 189.03 10.99 188.69L11.01 188.68ZM100.37 109.54H186.59V130.5H100.37V109.54ZM147.01 0H174.79L296.65 185.01H269.13L147.01 0Z" fill="#1A1A18" />
    </svg>
    <ul class="links-internal">
      <li v-for="item in content.blocks_links_internal" :key="item._uid">
        <nuxt-link v-if="item.link.linktype === 'url'" :to="item.link.url">
          {{ item.link.title }}
        </nuxt-link>
        <nuxt-link v-else :to="item.link.story.url">
          {{ item.link.story.name }}
        </nuxt-link>
      </li>
    </ul>
    <ul class="links-external">
      <li v-for="item in content.blocks_links_external" :key="item._uid">
        <nuxt-link :to="item.link.url" target="_blank">
          {{ item.link.title }}
        </nuxt-link>
      </li>
    </ul>
    <div class="footer">
      <ul class="links-meta">
        <li v-for="item in content.blocks_links_meta" :key="item._uid">
          <nuxt-link :to="item.link.story.url">
            {{ item.link.story.name }}
          </nuxt-link>
        </li>
      </ul>
      <div class="copyright">
        <span>©2023</span>
        <span>Dev: <nuxt-link to="/">Jan Kohlbach</nuxt-link></span>
        <span>Design: <nuxt-link to="https://undesigned.studio" target="_blank">undesigned.studio</nuxt-link></span>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/functions' as *;

.menu {
  position: fixed;
  inset: 0;
  display: none;
  background: var(--c-light);

  &.open {
    display: block;
  }
}

.logo {
  position: absolute;
  inset: 0;
  margin: auto;
  max-width: 80vmin;
  opacity: 0.2;
}

ul {
  list-style-type: none;
}

.links-internal {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  li {
    &:nth-child(1) {
      transform: translateX(-10%);
    }

    &:nth-child(2) {
      transform: translateX(90%);
    }

    &:nth-child(3) {
      transform: translateX(-180%);
    }

    &:nth-child(4) {
      transform: translateX(20%);
    }
  }

  a {
    font-size: var(--fs-xl);
    text-transform: uppercase;
    mix-blend-mode: difference;
  }
}

.links-external {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  gap: rem(50);
  justify-content: space-around;

  a {
    text-transform: uppercase;
  }
}

.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: var(--s-s);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  line-height: 1.1;
}

.links-meta {
  display: flex;

  li:last-child {
    a::after {
      content: '';
    }
  }

  a {
    text-transform: uppercase;

    &::after {
      content: '·';
      padding-inline: rem(10);
    }
  }
}

.copyright {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  a {
    display: inline-block;
  }
}
</style>
