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
    <PageTitle>{{ story?.name }}</PageTitle>

    <!-- <StoryblokComponent v-if="story" :blok="story.content" /> -->
    <section>
      <h2>section 1</h2>
    </section>
    <section>
      <h2>section 2</h2>
    </section>
    <section>
      <h2>section 3</h2>
    </section>
  </div>
</template>

<style lang="scss" scoped>
section {
  height: 100vh;
}
</style>
