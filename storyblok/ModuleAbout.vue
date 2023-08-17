<script setup lang="ts">
defineProps({
  blok: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <section class="module-about">
    <img :src="blok.asset_image.filename" :alt="blok.asset_image.alt">
    <div class="richtext" v-html="renderRichText(blok.richtext_text)" />
  </section>
</template>

<style lang="scss" scoped>
section {
  margin-inline: var(--s-s);
  margin-top: to-rem(180);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: to-rem(80);
}

img {
  max-width: min(to-rem(520), 100%);
  max-height: to-rem(800);
  object-fit: cover;

  @media (min-width: 960px) {
    margin-top: to-rem(200);
  }
}

.richtext {
  width: 100%;
  max-width: max(to-rem(380), 70vw);

  @media (min-width: 960px) {
    width: 40%;
    max-width: to-rem(450);
  }
}
</style>
