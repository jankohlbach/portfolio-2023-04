<script setup lang="ts">
import type { ISbStoryData } from '@storyblok/js/dist/types'

const { path } = useRoute()

if (path === '/projects') {
  throw404()
}

let story: ISbStoryData

try {
  story = await useAsyncStoryblok(
    path,
    { version: <'draft'|'published'>useRuntimeConfig().public.contentVersion, content_type: 'page-project' }
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
  <div class="page project">
    <ScrollPercentage />
    <PageTitle>{{ story?.name }}</PageTitle>
    <div class="modules">
      <StoryblokComponent v-for="block_module in ([...Object.entries(story.content).filter(([key]) => key.startsWith('blocks_'))].map(([, value]) => value[0]).reverse())" :key="(block_module._uid)" :blok="block_module" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modules {
  padding-top: 90svh;
}
</style>
