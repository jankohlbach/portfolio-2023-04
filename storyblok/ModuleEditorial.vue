<script setup lang="ts">
defineProps({
  blok: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <section class="module-editorial">
    <img v-for="block in blok.blocks_images" :key="block._uid" :src="block.image.filename" :alt="block.image.alt">
  </section>
</template>

<style lang="scss" scoped>
section {
  margin-inline: var(--s-s);
  margin-top: to-rem(320);
}

img {
  object-fit: cover;

  + img {
    margin-top: to-rem(100);
  }

  &:nth-child(odd) {
    width: 690px;
    aspect-ratio: 690 / 690;
  }

  &:nth-child(even) {
    margin-left: auto;
    margin-right: to-rem(100);
    width: 690px;
    aspect-ratio: 690 / 920;
  }
}
</style>
