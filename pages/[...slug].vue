<script setup lang="ts">
import type { ISbStoryData, SbBlokData } from '@storyblok/js/dist/types'

const { slug } = useRoute().params

if (slug === '/' || slug === 'home' || slug.includes('home')) {
  throw404()
}

let story: ISbStoryData

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
    <ScrollPercentage />
    <PageTitle>{{ story?.name }}</PageTitle>
    <StoryblokComponent v-for="block_module in (story.content.blocks_modules as SbBlokData[])" :key="(block_module._uid)" :blok="block_module" />
  </div>
</template>
