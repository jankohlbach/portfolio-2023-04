<script setup lang="ts">
defineProps({
  blok: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <section class="module-image-fullscreen">
    <img :src="blok.asset_image.filename" :alt="blok.asset_image.alt">
  </section>
</template>

<style lang="scss" scoped>
section {
  margin-inline: var(--s-s);
  margin-top: rem(320);
}

img {
  width: 100%;
}
</style>
