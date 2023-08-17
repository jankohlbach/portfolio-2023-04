<script setup lang="ts">
const props = defineProps({
  blok: {
    type: Object,
    default: null
  }
})

const story = await useAsyncStoryblok(
  props.blok.link_story.cached_url,
  { version: <'draft'|'published'>useRuntimeConfig().public.contentVersion }
)
</script>

<template>
  <section class="module-project-next">
    <nuxt-link :to="`/${blok.link_story.cached_url}`">
      <div class="wrap">
        <span>Next project</span>
        <h2>
          {{ story.content.blocks_01_project_header[0].text_title }}
        </h2>
      </div>
      <img :src="story.content.blocks_01_project_header[0].asset_image.filename" :alt="story.content.blocks_01_project_header[0].asset_image.alt">
    </nuxt-link>
  </section>
</template>

<style lang="scss" scoped>
section {
  margin-top: to-rem(320);
}

.wrap {
  margin-inline: var(--s-s);
  margin-bottom: var(--s-m);
  display: flex;
  align-items: flex-start;
}

span {
  flex-basis: 40%;
}

h2 {
  font-size: var(--fs-m);
  font-weight: 100;
  flex-basis: 60%;
}

img {
  width: 100%;
}
</style>
