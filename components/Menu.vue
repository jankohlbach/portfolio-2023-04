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
    <ul>
      <li v-for="item in content.blocks_links" :key="item._uid">
        <nuxt-link v-if="item.link.linktype === 'url'" :to="item.link.url">
          {{ item.link.title }}
        </nuxt-link>
        <nuxt-link v-else :to="item.link.story.url">
          {{ item.link.story.name }}
        </nuxt-link>
      </li>
    </ul>
  </aside>
</template>

<style lang="scss" scoped>
.menu {
  position: fixed;
  inset: 0;
  display: none;
  justify-content: center;
  align-items: center;
  background: papayawhip;

  &.open {
    display: flex;
  }
}
</style>
