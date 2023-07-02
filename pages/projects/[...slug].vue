<script setup lang="ts">
const { path } = useRoute()

if (path === '/projects') {
  throw404()
}

let story: any
let sortedBlocks: any

try {
  story = await useAsyncStoryblok(
    path,
    { version: <'draft'|'published'>useRuntimeConfig().public.contentVersion, content_type: 'page-project' }
  )

  if (!story.value) {
    throw404()
  }

  sortedBlocks = [
    ...Object.entries(story.value.content)
      .filter(([key]) => key.startsWith('blocks_'))
      .sort((a, b) => a[0] > b[0] ? 1 : -1)
      .map(([, value]: any) => value[0])
  ]
} catch {
  throw404()
}
</script>

<template>
  <div class="page project">
    <ScrollPercentage />
    <PageTitle>{{ story?.name }}</PageTitle>
    <div class="modules">
      <StoryblokComponent v-for="block_module in sortedBlocks" :key="(block_module._uid)" :blok="block_module" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.project {
  overflow-x: hidden;
}

.modules {
  padding-top: 90svh;
}
</style>
