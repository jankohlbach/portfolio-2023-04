<script setup lang="ts">
defineProps({
  blok: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <section class="module-video-w-bg">
    <img :src="blok.asset_image.filename" :alt="blok.asset_image.alt">
    <video :src="blok.asset_video.filename" muted autoplay loop playsinline />
  </section>
</template>

<style lang="scss" scoped>
section {
  margin-top: rem(320);
  display: grid;
}

img,
video {
  width: 100%;
  grid-area: 1 / 1;
}

video {
  width: 75%;
  margin: auto;
}
</style>
