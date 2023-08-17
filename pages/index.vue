<script setup lang="ts">
let story: any

try {
  story = await useAsyncStoryblok(
    'home',
    { version: <'draft'|'published'>useRuntimeConfig().public.contentVersion, content_type: 'page', resolve_links: 'url' }
  )
} catch {
  throw404()
}

const home = useHome()

const changeIndex = (index: number) => {
  if (index >= 0 && index < story.value.content.blocks_modules[0].blocks_projects.length) {
    home.value.currentIndex = index
  }
}
</script>

<template>
  <div class="page home">
    <HomeOverview v-if="home.view === 'overview'" :projects="story.content.blocks_modules[0].blocks_projects" :change-index="changeIndex" />
    <HomeIndex v-else :projects="story.content.blocks_modules[0].blocks_projects" :change-index="changeIndex" />
    <div class="pagination">
      <span class="indicator" :style="`--index: ${home.currentIndex}`" />
      <span v-for="project, i in story.content.blocks_modules[0].blocks_projects" :key="project._uid" class="item" @click="changeIndex(i)" />
    </div>
    <!-- TODO: add again -->
    <!-- <button class="view-button" type="button" @click="home.view = home.view === 'overview' ? 'index' : 'overview'">
      {{ home.view === 'overview' ? 'Index' : 'Overview' }}
    </button> -->
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  --gap: 8px;
  --width: 35px;
  --height: 20px;
  --scale: 10px;

  position: absolute;
  top: 50%;
  right: var(--s-s);
  transform: translateY(-50%);
  display: none;
  flex-direction: column;
  gap: var(--gap);

  @include has-hover {
    display: flex;
  }

  .item {
    width: var(--width);
    height: var(--height);
    border: 2px solid var(--c-dark);
    cursor: pointer;
  }

  .indicator {
    position: absolute;
    top: calc((var(--height) - var(--scale)) / 2);
    left: calc(var(--scale) / -2);
    width: calc(var(--width) + var(--scale));
    height: calc(var(--height) - var(--scale));
    border: 2px solid var(--c-dark);
    transform: translateY(calc(var(--index) * (var(--height) + var(--gap))));
    transition: transform .5s;
  }
}

.view-button {
  position: fixed;
  right: var(--s-s);
  bottom: to-rem(5);
  z-index: 1;
}
</style>
