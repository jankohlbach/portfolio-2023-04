<script setup lang="ts">
const { path } = useRoute()

if (path === '/home') {
  throw404()
}

let story: any

try {
  story = await useAsyncStoryblok(
    path,
    { version: <'draft'|'published'>useRuntimeConfig().public.contentVersion, content_type: 'page' }
  )

  if (!story.value) {
    throw404()
  }
} catch {
  throw404()
}
</script>

<template>
  <div class="page slug">
    <ScrollPercentage />
    <PageTitle>{{ story?.name }}</PageTitle>
    <StoryblokComponent v-for="block_module in story.content.blocks_modules" :key="(block_module._uid)" :blok="block_module" />
  </div>
</template>
