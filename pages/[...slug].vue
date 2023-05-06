<script setup lang="ts">
import type { ISbStoryData } from '@storyblok/js/dist/types'

const { path } = useRoute()

if (path === '/home') {
  throw404()
}

let story: ISbStoryData

try {
  story = await useAsyncStoryblok(
    path,
    { version: <'draft'|'published'>useRuntimeConfig().public.contentVersion, content_type: 'page' }
  )

  // @ts-expect-error
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
