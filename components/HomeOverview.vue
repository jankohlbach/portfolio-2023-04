<!-- TODO: build -->
<script setup lang="ts">
defineProps({
  projects: {
    type: Object,
    default: null
  },
  changeIndex: {
    type: Function,
    default: null
  }
})
</script>

<template>
  <div class="container-overview__inner">
    <div class="container-overview__inner__text">
      <h1>{{ projects[0].link.story.name }}</h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
