<script setup lang="ts">
let story: any

try {
  story = await useAsyncStoryblok(
    'home',
    { version: <'draft'|'published'>useRuntimeConfig().public.contentVersion, content_type: 'page' }
  )
} catch {
  throw404()
}
</script>

<template>
  <div class="page home">
    <!-- <StoryblokComponent v-if="story" :blok="story.content" /> -->
    <h1>{{ story?.name }}</h1>
    <nuxt-link to="/projects/project-1">
      project-1
    </nuxt-link>
    <section>
      <h1>section 1</h1>
    </section>
    <section>
      <h1>section 2</h1>
    </section>
    <section>
      <h1>section 3</h1>
    </section>
  </div>
</template>

<style lang="scss" scoped>
section {
  height: 100vh;
}
</style>
