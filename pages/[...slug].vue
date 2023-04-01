<script setup lang="ts">
const { slug } = useRoute().params

if (slug === 'home' || slug.includes('home')) {
  throw createError({
    statusCode: 404,
    message: 'Page not found.',
    fatal: true
  })
}

let story: any

try {
  story = await useAsyncStoryblok(
    slug && Array.isArray(slug) ? slug.join('/') : 'home',
    { version: 'draft' }
  )
} catch {
  throw createError({
    statusCode: 404,
    message: 'Page not found.',
    fatal: true
  })
}
</script>

<template>
  <div class="test page">
    <!-- <StoryblokComponent v-if="story" :blok="story.content" /> -->
    <h1>{{ story.name }}</h1>
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
