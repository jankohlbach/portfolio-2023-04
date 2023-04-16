<script setup lang="ts">
const { slug } = useRoute().params

if (slug === '/' || slug === 'home' || slug.includes('home')) {
  throw404()
}

let story: any

try {
  story = await useAsyncStoryblok(
    slug && Array.isArray(slug) ? slug.join('/') : 'home',
    { version: <'draft'|'published'>useRuntimeConfig().public.contentVersion, content_type: 'page' }
  )
} catch {
  throw404()
}
</script>

<template>
  <div class="page slug">
    <!-- <StoryblokComponent v-if="story" :blok="story.content" /> -->
    <h1>{{ story?.name }}</h1>
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
